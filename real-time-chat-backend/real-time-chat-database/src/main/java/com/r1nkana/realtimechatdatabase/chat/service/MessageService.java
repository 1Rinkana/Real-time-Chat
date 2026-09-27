package com.r1nkana.realtimechatdatabase.chat.service;

import chat.bean.message.MessageBean;
import chat.bean.message.NewMessageBean;
import chat.worker.MessageWorker;
import chat.worker.UserWorker;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService
{
    private final MessageWorker messageWorker;

    private final UserWorker userWorker;

    public MessageService(MessageWorker messageWorker,
                          UserWorker userWorker)
    {
        this.messageWorker = messageWorker;
        this.userWorker = userWorker;
    }

    @Transactional
    public MessageBean saveNewMessage(NewMessageBean newMessage)
    {
        return messageWorker.saveMessage(newMessage, userWorker::getUserEntity);
    }

    @Transactional
    public List<MessageBean> getAllPublicChatMessages()
    {
        return messageWorker.getAllPublicChatMessages();
    }
}
