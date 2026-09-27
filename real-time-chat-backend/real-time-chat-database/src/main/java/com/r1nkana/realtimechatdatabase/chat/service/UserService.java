package com.r1nkana.realtimechatdatabase.chat.service;

import chat.bean.request.RegistrationBean;
import chat.bean.user.UserBean;
import chat.worker.UserWorker;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService {
    private final UserWorker userWorker;

    public UserService(UserWorker userWorker) {
        this.userWorker = userWorker;
    }

    @Transactional
    public UserBean registrateUser(RegistrationBean registrationBean) {
        return userWorker.saveUser(registrationBean);
    }

    @Transactional
    public UserBean getUser(UUID uuid) {
        return userWorker.getUserBean(uuid);
    }
}
