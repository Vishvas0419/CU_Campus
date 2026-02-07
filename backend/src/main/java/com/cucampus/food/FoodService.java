package com.cucampus.food;

import com.cucampus.common.BadRequestException;
import com.cucampus.common.ResourceNotFoundException;
import com.cucampus.food.dto.CreateOrderRequest;
import com.cucampus.food.dto.FoodItemDto;
import com.cucampus.food.dto.FoodOrderDto;
import com.cucampus.food.dto.FoodOutletDto;
import com.cucampus.user.User;
import com.cucampus.user.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class FoodService {

    private final FoodOutletRepository outletRepository;
    private final FoodItemRepository itemRepository;
    private final FoodOrderRepository orderRepository;
    private final UserRepository userRepository;

    public FoodService(FoodOutletRepository outletRepository,
                       FoodItemRepository itemRepository,
                       FoodOrderRepository orderRepository,
                       UserRepository userRepository) {
        this.outletRepository = outletRepository;
        this.itemRepository = itemRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    private User currentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));
    }

    public List<FoodOutletDto> listOutlets() {
        return outletRepository.findAll().stream()
                .map(FoodOutletDto::fromEntity)
                .toList();
    }

    public List<FoodItemDto> listItemsForOutlet(Long outletId) {
        // ensure outlet exists
        outletRepository.findById(outletId)
                .orElseThrow(() -> new ResourceNotFoundException("Outlet not found: " + outletId));
        return itemRepository.findByOutletIdAndActiveTrueOrderByNameAsc(outletId).stream()
                .map(FoodItemDto::fromEntity)
                .toList();
    }

    public FoodOrderDto placeOrder(CreateOrderRequest request) {
        if (request.getItems() == null || request.getItems().isEmpty()) {
            throw new BadRequestException("Order must contain at least 1 item");
        }

        FoodOutlet outlet = outletRepository.findById(request.getOutletId())
                .orElseThrow(() -> new ResourceNotFoundException("Outlet not found: " + request.getOutletId()));

        List<Long> itemIds = request.getItems().stream().map(i -> i.getItemId()).toList();
        Map<Long, FoodItem> itemsById = itemRepository.findAllById(itemIds).stream()
                .collect(Collectors.toMap(FoodItem::getId, Function.identity()));

        // Validate each item exists and belongs to the outlet
        for (var reqItem : request.getItems()) {
            FoodItem item = itemsById.get(reqItem.getItemId());
            if (item == null) {
                throw new ResourceNotFoundException("Food item not found: " + reqItem.getItemId());
            }
            if (!item.isActive()) {
                throw new BadRequestException("Food item is not active: " + item.getName());
            }
            if (!item.getOutlet().getId().equals(outlet.getId())) {
                throw new BadRequestException("Item " + item.getId() + " does not belong to outlet " + outlet.getId());
            }
        }

        FoodOrder order = new FoodOrder();
        order.setUser(currentUser());
        order.setOutlet(outlet);
        order.setStatus(FoodOrder.Status.PLACED);

        BigDecimal total = BigDecimal.ZERO;
        for (var reqItem : request.getItems()) {
            FoodItem item = itemsById.get(reqItem.getItemId());
            OrderItem oi = new OrderItem();
            oi.setOrder(order);
            oi.setItem(item);
            oi.setQuantity(reqItem.getQuantity());
            oi.setPriceEach(item.getPrice());
            order.getItems().add(oi);

            total = total.add(item.getPrice().multiply(BigDecimal.valueOf(reqItem.getQuantity())));
        }
        order.setTotalAmount(total);

        return FoodOrderDto.fromEntity(orderRepository.save(order));
    }

    public List<FoodOrderDto> myOrders() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        return orderRepository.findByUserUsernameOrderByCreatedAtDesc(username).stream()
                .map(FoodOrderDto::fromEntity)
                .toList();
    }
}

