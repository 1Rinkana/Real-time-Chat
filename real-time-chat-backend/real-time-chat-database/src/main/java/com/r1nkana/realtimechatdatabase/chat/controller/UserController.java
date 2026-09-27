package com.r1nkana.realtimechatdatabase.chat.controller;

import chat.bean.request.RegistrationBean;
import chat.bean.user.UserBean;
import chat.service.UserService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController
{
    private final UserService userService;

    public UserController(UserService userService)
    {
        this.userService = userService;
    }

    @PostMapping
    public UserBean registrateUser(@RequestBody RegistrationBean registrationBean)
    {
        return userService.registrateUser(registrationBean);
    }
}
