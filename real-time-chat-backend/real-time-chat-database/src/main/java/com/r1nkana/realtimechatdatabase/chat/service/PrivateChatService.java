package com.r1nkana.realtimechatdatabase.chat.service;

import chat.bean.message.MessageBean;
import chat.bean.message.NewMessageBean;
import chat.bean.user.PrivateChatUsers;
import chat.entity.MessageEntity;
import chat.entity.PrivateChatEntity;
import chat.worker.MessageWorker;
import chat.worker.PrivateChatWorker;
import chat.worker.UserWorker;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class PrivateChatService
{
    private final PrivateChatWorker privateChatWorker;

    private final UserWorker userWorker;

    private final MessageWorker messageWorker;

    public PrivateChatService(PrivateChatWorker privateChatWorker,
                              UserWorker userWorker,
                              MessageWorker messageWorker)
    {
        this.privateChatWorker = privateChatWorker;
        this.userWorker = userWorker;
        this.messageWorker = messageWorker;
    }

    @Transactional
    public MessageBean registrateMessageInChat(NewMessageBean newMessage)
    {
        return privateChatWorker.addChatMessage(
                getOrAddChatByUsers(newMessage),
                getSavedMessage(newMessage)
        );
    }

    private PrivateChatEntity getOrAddChatByUsers(NewMessageBean newMessage) {

        return privateChatWorker.getOrAddChatByUsers(
                newMessage.sentByUser(),
                newMessage.sendToUser(),
                userWorker::getUserEntity);
    }

    private MessageEntity getSavedMessage(NewMessageBean newMessage)
    {
        return messageWorker.saveMessageInRepository(
                newMessage,
                userWorker::getUserEntity);
    }

    @Transactional
    public List<MessageBean> getChatMessages(PrivateChatUsers privateChatUsers)
    {
        List<MessageBean> privateChatMessages = privateChatWorker.getUsersChatMessages(
                privateChatUsers.askedUser(),
                privateChatUsers.chatWithUser(),
                userWorker::getUserEntity);

        return privateChatMessages.stream()
                .sorted(Comparator.comparing(MessageBean::sentAt))
                .toList();
    }
}
