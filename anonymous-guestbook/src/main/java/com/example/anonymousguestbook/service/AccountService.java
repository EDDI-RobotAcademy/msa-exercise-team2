package com.example.anonymousguestbook.service;

import com.example.anonymousguestbook.entity.User;
import com.example.anonymousguestbook.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final UserRepository userRepository;

                .build();

        userRepository.save(user);
        return new AccountResponse(true, "회원가입 성공");
    }

    public AccountResponse login(LoginRequest request) {
        return userRepository.findByUsername(request.getUsername())
                .map(user -> {
                    if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                        return new AccountResponse(true, "로그인 성공");
                    } else {
                        return new AccountResponse(false, "비밀번호가 틀렸습니다.");
                    }
                })
                .orElseGet(() -> new AccountResponse(false, "존재하지 않는 사용자입니다."));
    }
}
