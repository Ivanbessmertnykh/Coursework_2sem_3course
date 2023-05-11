package ru.ivan.coursework.service;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.NativeQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import ru.ivan.coursework.config.JWT.JWTUtil;
import ru.ivan.coursework.entity.*;
import ru.ivan.coursework.repository.ItemRepository;
import ru.ivan.coursework.repository.OrderRepository;
import ru.ivan.coursework.repository.RoleRepository;
import ru.ivan.coursework.repository.UserRepository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.math.BigInteger;
import java.util.*;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private JWTUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null){
            throw new UsernameNotFoundException("Пользователь не найден");
        }
        return user;
    }

    @Transactional
    public User findUserByUsername(String username){
        return userRepository.findByUsername(username);
    }

    @Transactional
    public User getUserAuth(Authentication authentication) {
        return (User) loadUserByUsername(authentication.getName());
    }


    @Transactional
    public ResponseEntity<?> saveUser(User user, BindingResult bindingResult){
        User userFromDB = userRepository.findByEmail(user.getEmail());
        if (userFromDB != null){
            bindingResult.addError(new FieldError("user", "email", "Пользователь с такой почтой уже существует"));
        }
        if (bindingResult.hasErrors())
            return new ResponseEntity<>(bindingResult.getFieldErrors(), HttpStatus.CONFLICT);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        Role role = roleRepository.findRoleByName("USER");
        Order order = new Order();
        order.setDone(0);
        order.setUser_id(user);
        user.getRoles().add(role);
        user.getOrders(true).add(order);
        User newUser = userRepository.save(user);
        return ResponseEntity.ok(jwtUtil.generateToken(newUser.getEmail()));
    }

    @Transactional
    public ResponseEntity<?> loginUser(User user) {

        UsernamePasswordAuthenticationToken authInputToken =
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        authenticationManager.authenticate(authInputToken);
        User loginUser = userRepository.findByEmail(user.getEmail());
        userRepository.save(loginUser);
        return new ResponseEntity<>(jwtUtil.generateToken(loginUser.getEmail()), HttpStatus.ACCEPTED);

    }

    @Transactional
    public ResponseEntity<?> showUserInfo(Authentication authentication) {
        User user = getUserAuth(authentication);
        return ResponseEntity.ok(jwtUtil.generateToken(user.getEmail()));
    }

    @Transactional
    public void addItemToCustomer(User user, Long ItemID){
        int count = user.getItemCountByItemId(ItemID);
        Order actual = user.getActualOrder();
        Item item = itemRepository.findItemByItemID(ItemID);
        List<OrderItemEnroll> enrolls = actual.getOrderDishEnrolls();
        if (count == 0){
            OrderItemEnroll newEnroll = new OrderItemEnroll();
            newEnroll.setItem(item);
            newEnroll.setCount(1);
            newEnroll.setOrder(actual);
            enrolls.add(newEnroll);
            userRepository.createEnroll(ItemID, actual.getOrderId());
        } else {
            OrderItemEnroll currentEnroll = actual.findEnrollByDishId(ItemID);
            currentEnroll.setCount(count + 1);
            userRepository.updateEnroll(ItemID, actual.getOrderId(), count + 1);
        }
        actual.setOrderDishEnrolls(enrolls);
        item.setOrderDishEnrolls(enrolls);
        userRepository.save(user);
    }

    @Transactional
    public void removeDishToCustomer(User user, Long dishId){
        int count = user.getItemCountByItemId(dishId);
        Order actual = user.getActualOrder();
        Item dish = itemRepository.findItemByItemID(dishId);
        List<OrderItemEnroll> enrolls = actual.getOrderDishEnrolls();
        if (count == 0){
            return;
        }
        OrderItemEnroll currentEnroll = actual.findEnrollByDishId(dishId);
        if (count == 1){
            enrolls.remove(currentEnroll);
            userRepository.enrollToTrash(actual.getOrderId(), dishId);
        } else {
            currentEnroll.setCount(currentEnroll.getCount() - 1);
            userRepository.updateEnroll(dishId, actual.getOrderId(), count - 1);
        }
        actual.setOrderDishEnrolls(enrolls);
        dish.setOrderDishEnrolls(enrolls);
    }

    @Transactional
    public User rootReSave(User user){
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }


    @Transactional
    public void removeDishes(User user){
        Order deletingOrder = user.getActualOrder();
        deletingOrder.getOrderDishEnrolls().clear();
        userRepository.destroyEnroll(deletingOrder.getOrderId());
    }

    @Transactional
    public void makeOrder(User user, String comment){
        Order makingOrder = user.getActualOrder();
        makingOrder.setDone(1);
        makingOrder.setComment(comment);
        makingOrder.setTime(new Date());
        Order order = new Order();
        order.setDone(0);
        order.setUser_id(user);
        order = orderRepository.save(order);
        user.getOrders(true).add(order);
        userRepository.save(user);
    }

}
