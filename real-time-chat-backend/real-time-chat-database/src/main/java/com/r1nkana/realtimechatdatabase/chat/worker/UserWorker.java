package com.r1nkana.realtimechatdatabase.chat.worker;

import chat.bean.request.RegistrationBean;
import chat.bean.user.UserBean;
import chat.entity.UserEntity;
import chat.exception.UserNotFoundException;
import chat.mapper.UserMapper;
import chat.repository.UserRepository;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.UUID;

@Component
public class UserWorker
{
    private final UserRepository userRepository;

    public UserWorker(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    public UserBean saveUser(RegistrationBean registrationBean)
    {
        UserEntity userEntity = new UserEntity(registrationBean.username(), LocalDateTime.now());
        userRepository.save(userEntity);

        return UserMapper.mapEntityToBean(userEntity);
    }

    public UserEntity getUserEntity(UUID uuid) {
        return userRepository
                .findById(uuid)
                .orElseThrow(UserNotFoundException::new);
    }

    public UserBean getUserBean(UUID uuid) {
        return UserMapper.mapEntityToBean(getUserEntity(uuid));
    }
}

