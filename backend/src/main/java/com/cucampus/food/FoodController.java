package com.cucampus.food;

import com.cucampus.food.dto.CreateOrderRequest;
import com.cucampus.food.dto.FoodItemDto;
import com.cucampus.food.dto.FoodOrderDto;
import com.cucampus.food.dto.FoodOutletDto;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/food")
public class FoodController {

    private final FoodService foodService;

    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    @GetMapping("/outlets")
    public List<FoodOutletDto> outlets() {
        return foodService.listOutlets();
    }

    @GetMapping("/outlets/{id}/items")
    public List<FoodItemDto> outletItems(@PathVariable Long id) {
        return foodService.listItemsForOutlet(id);
    }

    @PostMapping("/orders")
    public FoodOrderDto createOrder(@Valid @RequestBody CreateOrderRequest request) {
        return foodService.placeOrder(request);
    }

    @GetMapping("/orders/my")
    public List<FoodOrderDto> myOrders() {
        return foodService.myOrders();
    }
}

