package com.r1nkana.realtimechatdatabase.chat.mapper;

import chat.bean.user.UserBean;
import chat.entity.UserEntity;

public class UserMapper
{
    public static UserBean mapEntityToBean(UserEntity userEntity)
    {
        return new UserBean(userEntity.getUuid(), userEntity.getUsername());
    }
}
