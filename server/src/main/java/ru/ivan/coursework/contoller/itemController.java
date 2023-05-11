package ru.ivan.coursework.contoller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ru.ivan.coursework.entity.Item;
import ru.ivan.coursework.entity.Order;
import ru.ivan.coursework.entity.OrderItemEnroll;
import ru.ivan.coursework.entity.User;
import ru.ivan.coursework.repository.ItemRepository;
import ru.ivan.coursework.service.MailService;
import ru.ivan.coursework.service.UserService;

import java.io.IOException;
import java.util.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/item")
public class itemController {
    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private MailService mailService;

    @PostMapping("/add")
    @Secured("ADMIN")
    public ResponseEntity<?> addItemFromAdmin(@RequestParam MultipartFile image, @RequestParam String name, @RequestParam Integer price) throws IOException {
        byte[] file = Base64.getEncoder().encode(image.getBytes());
        Item item = new Item(name, price, file);
        itemRepository.save(item);
        return ResponseEntity.ok("Предмет создан");
    }

    @GetMapping("/check")
    public ResponseEntity<?> getAllItems(Authentication authentication) {
        List<Item> itemList = itemRepository.findAllBy();
        if (authentication != null) {
            User user = (User) authentication.getPrincipal();
            for (Item item : itemList) {
                item.setName(item.getName() + "//" + user.getItemCountByItemId(item.getItemID()));
            }
            return ResponseEntity.ok(itemList);
        }
        return ResponseEntity.ok(itemList);
    }

    @GetMapping("/cart")
    public ResponseEntity<?> getAddedItems(Authentication authentication) {
        List<Item> itemList = itemRepository.findAllBy();
        List<Item> resultList = new ArrayList<>();
        User user = (User) authentication.getPrincipal();
        for (Item item : itemList) {
            if (user.getItemCountByItemId(item.getItemID()) > 0) {
                item.setName(item.getName() + "//" + user.getItemCountByItemId(item.getItemID()));
                resultList.add(item);
            }
        }
        return ResponseEntity.ok(resultList);
    }

    @GetMapping("/cart/clear")
    public ResponseEntity<?> clearCart(Authentication authentication){
        User user = (User) authentication.getPrincipal();
        userService.removeDishes(user);
        return ResponseEntity.ok("Корзина очищена");
    }

    @GetMapping("/cart/performed")
    public ResponseEntity<?> cartPerformed(Authentication authentication){
        User user = (User) authentication.getPrincipal();
        List<Order> orders = user.getOrders(false);
        for (Order order: orders) {
            for (OrderItemEnroll orderItemEnroll: order.getOrderItemEnrolls()){
                orderItemEnroll.getItem().setName(orderItemEnroll.getItem().getName() + "//" + orderItemEnroll.getCount());
            }
        }
        return ResponseEntity.ok(orders);
    }

    @PostMapping("/cart/billing")
    public ResponseEntity<?> cartBilling(Authentication authentication, @RequestParam String comment){
        User user = (User) authentication.getPrincipal();
        userService.makeOrder(user, comment);
        mailService.sendEmail(user.getEmail(), "ЗАКАЗ ОФОРМЛЕН", "Ваш заказ оформлен, информацию о нем можно посмотреть на вкладке Заказы на сайте");
        return ResponseEntity.ok("Заказ успешно оформлен");
    }

    @PostMapping("/change")
    public ResponseEntity<?> addingItem(Authentication authentication, @RequestParam Long
            number, @RequestParam Integer changeKey) {
        User customer = (User) authentication.getPrincipal();
        switch (changeKey) {
            case 0 -> userService.removeDishToCustomer(customer, number);
            case 1 -> userService.addItemToCustomer(customer, number);
            default -> {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
        }
        return ResponseEntity.ok("Изменения сохранены");
    }



}
