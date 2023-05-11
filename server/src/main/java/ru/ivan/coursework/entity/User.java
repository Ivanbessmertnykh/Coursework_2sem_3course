package ru.ivan.coursework.entity;

import lombok.Data;
import org.hibernate.annotations.Cascade;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.*;

@Entity(name = "user")
@Table(name = "users")
@Data
public class User implements UserDetails {


    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE)
    private int id;

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Role> roles = new HashSet<>();

    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @OneToMany(mappedBy = "user_id", fetch = FetchType.EAGER)
    private List<Order> orders = new ArrayList<>();

    @Size(min=5, message = "Не меньше 5 знаков")
    private String username;
    @Size(min=5, message = "Не меньше 5 знаков")
    private String password;
    private String email;
    private boolean reserved;


    public User() {
    }

    public boolean isReserved() {
        return reserved;
    }

    public void setReserved(boolean reserved) {
        this.reserved = reserved;
    }

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return email;
    }

    public String getOriginalName(){
        return username;
    }

    public String getOriginalRole(){
        return getRoles().stream().findFirst().get().getName();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return getRoles();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getCountByEnroll(OrderItemEnroll enroll){
        return enroll.getCount();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Order getActualOrder(){
        for (Order order: orders) {
            if (Objects.equals(order.getDone(), 0)){
                return order;
            }
        }
        return null;
    }

    public int getItemCountByItemId(Long ItemID){
        Order orderF = getActualOrder();
        if (orderF != null){
            for (OrderItemEnroll enroll: orderF.getOrderDishEnrolls()){
                if (Objects.equals(enroll.getItem().getItemID(), ItemID))
                    return enroll.getCount();
            }
        }
        return 0;
    }

    public List<Order> getOrders(boolean all) {
        if (all)
            return orders;
        else {
            List<Order> notActualOrders = new ArrayList<>();
            for (Order order: orders){
                if (order.getDone() != 0){
                    notActualOrders.add(order);
                }
            }
            return notActualOrders;
        }
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", reserved=" + reserved +
                '}';
    }
}
