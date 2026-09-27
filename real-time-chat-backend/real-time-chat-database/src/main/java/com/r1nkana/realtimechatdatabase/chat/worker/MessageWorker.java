package com.r1nkana.realtimechatdatabase.chat.worker;

import chat.bean.message.MessageBean;
import chat.bean.message.NewMessageBean;
import chat.entity.MessageEntity;
import chat.entity.UserEntity;
import chat.mapper.MessageMapper;
import chat.repository.MessageRepository;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.function.Function;

@Component
public class MessageWorker
{
    private final MessageRepository messageRepository;

    public MessageWorker(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public MessageEntity saveMessageInRepository(NewMessageBean newMessage,
                                                 Function<UUID, UserEntity> getUserEntity)
    {
        MessageEntity messageEntity = new MessageEntity(
                newMessage.text(),
                getUserEntity.apply(newMessage.sentByUser()),
                LocalDateTime.now());

        messageRepository.save(messageEntity);

        return messageEntity;
    }

    public MessageBean saveMessage(NewMessageBean newMessage,
                                   Function<UUID, UserEntity> getUserEntity)
    {
        return MessageMapper.mapEntityToBean(saveMessageInRepository(newMessage, getUserEntity));
    }

    public List<MessageBean> getAllPublicChatMessages()
    {
        return messageRepository.findAllPublicChatMessages().stream()
                .map(MessageMapper::mapEntityToBean)
                .toList();
    }
}
