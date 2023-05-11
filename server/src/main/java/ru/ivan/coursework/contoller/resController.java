package ru.ivan.coursework.contoller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import ru.ivan.coursework.entity.User;
import ru.ivan.coursework.repository.UserRepository;
import ru.ivan.coursework.service.ResService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/res")
public class resController {

    @Autowired
    private ResService resService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/accept")
    public ResponseEntity<?> addB(Authentication authentication, @RequestParam(name = "number") Integer number){
        User user = (User) authentication.getPrincipal();
        if (user.isReserved()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } else {
            boolean flag = resService.addRes(number);
            if (flag) {
                user.setReserved(true);
                userRepository.save(user);
                resService.sendRes(user, number);
            } else {
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
        }         return ResponseEntity.ok("OK");
    }

    @GetMapping("/check")
    public ResponseEntity<?> checkRes(){
        return ResponseEntity.ok(resService.checkTime());
    }



}
