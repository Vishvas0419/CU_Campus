package com.cucampus.food.dto;

import com.cucampus.food.FoodOrder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Data
public class FoodOrderDto {
    private Long id;
    private Long outletId;
    private String outletName;
    private BigDecimal totalAmount;
    private String status;
    private Instant createdAt;
    private List<FoodOrderItemDto> items;

    public static FoodOrderDto fromEntity(FoodOrder order) {
        FoodOrderDto dto = new FoodOrderDto();
        dto.setId(order.getId());
        dto.setOutletId(order.getOutlet().getId());
        dto.setOutletName(order.getOutlet().getName());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setStatus(order.getStatus().name());
        dto.setCreatedAt(order.getCreatedAt());
        dto.setItems(order.getItems().stream().map(FoodOrderItemDto::fromEntity).toList());
        return dto;
    }

    @Data
    public static class FoodOrderItemDto {
        private Long itemId;
        private String name;
        private int quantity;
        private BigDecimal priceEach;

        public static FoodOrderItemDto fromEntity(com.cucampus.food.OrderItem item) {
            FoodOrderItemDto dto = new FoodOrderItemDto();
            dto.setItemId(item.getItem().getId());
            dto.setName(item.getItem().getName());
            dto.setQuantity(item.getQuantity());
            dto.setPriceEach(item.getPriceEach());
            return dto;
        }
    }
}

