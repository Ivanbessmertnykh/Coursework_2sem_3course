package ru.ivan.coursework.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.ivan.coursework.entity.User;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    User findByEmail(String email);
    List<User> findAllBy();

    @Transactional
    @Modifying
    @Query(value = "UPDATE jpa.order_items SET item_id = ?1, order_id = ?2, count = ?3 where item_id = ?1 and order_id = ?2", nativeQuery = true)
    public void updateEnroll(Long ItemId, Long OrderId, int newCount);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO jpa.order_items(count, item_id, order_id) VALUES(1,?1,?2)", nativeQuery = true)
    public void createEnroll(Long ItemId, Long OrderId);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM jpa.order_items where order_items.order_id=?1", nativeQuery = true)
    public void destroyEnroll(Long orderId);

    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "delete from jpa.order_items where order_id=?1 and item_id=?2 ;")
    void enrollToTrash(Long orderId, Long itemId);
}
