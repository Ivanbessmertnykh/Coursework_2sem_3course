package ru.ivan.coursework.contoller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.ivan.coursework.config.JWT.JWTUtil;
import ru.ivan.coursework.entity.User;
import ru.ivan.coursework.repository.UserRepository;
import ru.ivan.coursework.service.UserService;
import javax.validation.Valid;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
public class regController {

    @Autowired
    private UserService userService;
    @Autowired
    private JWTUtil jwtUtil;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getFieldErrors(), HttpStatus.CONFLICT);
        }
        return userService.saveUser(user, bindingResult);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        return userService.loginUser(user);
    }

    @GetMapping("/check")
    public ResponseEntity<?> getUserInfo(Authentication authentication) {
        return userService.showUserInfo(authentication);
    }

    @PostMapping("/change")
    public ResponseEntity<?> changeUser(@Valid @RequestBody User user, Authentication authentication){
        System.out.println(user.toString());
        User currentUser = (User) authentication.getPrincipal();
        if (Objects.equals(user.getEmail(), currentUser.getEmail()) || userRepository.findByEmail(user.getEmail()) == null){
            currentUser.setEmail(user.getEmail());
            currentUser.setUsername(user.getOriginalName());
            currentUser.setPassword(user.getPassword());
            currentUser = userService.rootReSave(currentUser);
            authentication = new UsernamePasswordAuthenticationToken(currentUser.getUsername(), currentUser.getPassword());
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return ResponseEntity.ok(jwtUtil.generateToken(currentUser.getEmail()));
        } else {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

    }

}
