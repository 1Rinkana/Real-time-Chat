package com.r1nkana.realtimechatdatabase.chat.worker;

import chat.bean.message.MessageBean;
import chat.entity.MessageEntity;
import chat.entity.PrivateChatEntity;
import chat.entity.UserEntity;
import chat.mapper.MessageMapper;
import chat.repository.PrivateChatRepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Function;

@Component
public class PrivateChatWorker {
    private final PrivateChatRepository privateChatRepository;

    public PrivateChatWorker(PrivateChatRepository privateChatRepository) {
        this.privateChatRepository = privateChatRepository;
    }

    private PrivateChatEntity createNewChat(UserEntity firstUser,
                                           UserEntity secondUser)
    {
        return privateChatRepository.save(new PrivateChatEntity(firstUser, secondUser));
    }

    private Optional<PrivateChatEntity> getChatByUsers(UserEntity firstUser,
                                                       UserEntity secondUser)
    {
        return privateChatRepository.findChatByUsers(firstUser, secondUser);
    }

    public PrivateChatEntity getOrAddChatByUsers(UUID firstUserUUID,
                                                 UUID secondUserUUID,
                                                 Function<UUID, UserEntity> getUserEntity)
    {
        UserEntity firstUser = getUserEntity.apply(firstUserUUID);
        UserEntity secondUser = getUserEntity.apply(secondUserUUID);

        return getChatByUsers(firstUser, secondUser).orElseGet(() -> createNewChat(firstUser, secondUser));
    }

    public MessageBean addChatMessage(PrivateChatEntity privateChatEntity,
                                      MessageEntity messageEntity)
    {
        privateChatEntity.addChatMessage(messageEntity);
        privateChatRepository.save(privateChatEntity);

        return MessageMapper.mapEntityToBean(messageEntity);
    }

    public List<MessageBean> getUsersChatMessages(UUID askedUserUUID,
                                                  UUID chatWithUserUUID,
                                                  Function<UUID, UserEntity> getUserEntity)
    {
        PrivateChatEntity privateChatEntity = getOrAddChatByUsers(
                askedUserUUID,
                chatWithUserUUID,
                getUserEntity);


        return privateChatEntity.getChatMessages().stream()
                .map(MessageMapper::mapEntityToBean)
                .toList();
    }
}
