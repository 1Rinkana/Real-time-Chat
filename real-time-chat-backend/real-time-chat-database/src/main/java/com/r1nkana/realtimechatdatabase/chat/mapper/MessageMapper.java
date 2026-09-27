package com.r1nkana.realtimechatdatabase.chat.mapper;

import chat.bean.message.MessageBean;
import chat.entity.MessageEntity;

public class MessageMapper
{
    public static MessageBean mapEntityToBean(MessageEntity messageEntity)
    {
        return new MessageBean(
                messageEntity.getUuid(),
                messageEntity.getText(),
                UserMapper.mapEntityToBean(messageEntity.getSentBy()),
                messageEntity.getSentAt());
    }
}
