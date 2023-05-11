package ru.ivan.coursework;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import ru.ivan.coursework.entity.Role;
import ru.ivan.coursework.repository.RoleRepository;

import javax.annotation.PostConstruct;

@SpringBootApplication
@EnableJpaRepositories
public class CourseworkApplication {
	@Autowired
	RoleRepository roleRepository;

	@PostConstruct
	public void roles(){
		if(roleRepository.findRoleByName("USER") == null){
			Role role_user = new Role("USER");
			roleRepository.save(role_user);
		}
		if(roleRepository.findRoleByName("ADMIN") == null){
			Role role_admin = new Role("ADMIN");
			roleRepository.save(role_admin);
		}
	}

	public static void main(String[] args) {
		SpringApplication.run(CourseworkApplication.class, args);
	}

}
