package com.r1nkana.realtimechatdatabase.chat.controller;

import chat.bean.*;
import chat.bean.message.MessageBean;
import chat.bean.message.MessageWithAddress;
import chat.bean.message.NewMessageBean;
import chat.bean.request.JoinRequestBean;
import chat.bean.response.JoinResponseBean;
import chat.bean.response.StatusUpdateBean;
import chat.bean.user.PrivateChatUsers;
import chat.bean.user.UserBean;
import chat.bean.user.UserOnlineBean;
import chat.bean.user.UserStatus;
import chat.component.OnlineUserStorage;
import chat.service.MessageService;
import chat.service.PrivateChatService;
import chat.service.UserService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@Controller
public class MessageController
{
    private final MessageService messageService;
    private final UserService userService;
    private final PrivateChatService privateChatService;
    private final OnlineUserStorage onlineUserStorage;
    private final SimpMessagingTemplate messagingTemplate;

    public MessageController(MessageService messageService,
                             UserService userService,
                             PrivateChatService privateChatService,
                             OnlineUserStorage onlineUserStorage,
                             SimpMessagingTemplate messagingTemplate)
    {
        this.messageService = messageService;
        this.userService = userService;
        this.privateChatService = privateChatService;
        this.onlineUserStorage = onlineUserStorage;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/new-message")
    public void newMessage(NewMessageBean newMessageBean)
    {
        if (newMessageBean.isPublic()) {
            messagingTemplate.convertAndSend(
                    "/chat/public/new-message",
                    messageService.saveNewMessage(newMessageBean));
        }
        else
        {
            MessageBean messageBean = privateChatService.registrateMessageInChat(newMessageBean);

            MessageWithAddress messageWithAddress = new MessageWithAddress(newMessageBean.sendToUser(), messageBean);

            UserOnlineBean sendBy = onlineUserStorage.get(newMessageBean.sentByUser());
            UserOnlineBean sendTo = onlineUserStorage.get(newMessageBean.sendToUser());

            messagingTemplate.convertAndSend(
                    "/chat/private/client/%s".formatted(sendBy.clientUUID()),
                    messageWithAddress);

            messagingTemplate.convertAndSend(
                    "/chat/private/client/%s".formatted(sendTo.clientUUID()),
                    messageWithAddress);
        }
    }

    @MessageMapping("/join")
    public void join(
            JoinBean joinBean,
            Principal principal)
    {
        UUID userUUID = UUID.fromString(principal.getName());
        UUID clientUUID = UUID.fromString(joinBean.clientId());

        UserBean user = userService.getUser(userUUID);

        onlineUserStorage.add(
                userUUID,
                user,
                clientUUID);

        StatusUpdateBean status =
                new StatusUpdateBean(
                        UserStatus.ONLINE,
                        user);

        messagingTemplate.convertAndSend(
                "/chat/users",
                status);

        List<MessageBean> messages = messageService.getAllPublicChatMessages();
        List<UserBean> onlineUsers = onlineUserStorage.getOnlineUsers();
        JoinResponseBean joinResponseBean = new JoinResponseBean(messages, onlineUsers);

        messagingTemplate.convertAndSend(
                "/chat/public/history/client/%s".formatted(clientUUID),
                joinResponseBean);
    }

    @MessageMapping("/chat/public")
    public void requestPublicChatMessages(JoinRequestBean joinBean)
    {
        List<MessageBean> messages = messageService.getAllPublicChatMessages();;

        messagingTemplate.convertAndSend(
                "/chat/public/messages/client/%s".formatted(joinBean.clientId()),
                messages);
    }

    @MessageMapping("/chat/private")
    public void requestPublicChatMessages(PrivateChatUsers privateChatUsers)
    {
        List<MessageBean> messages = privateChatService.getChatMessages(privateChatUsers);
        UserOnlineBean askedUser = onlineUserStorage.get(privateChatUsers.askedUser());

        messagingTemplate.convertAndSend(
                "/chat/private/messages/client/%s".formatted(askedUser.clientUUID()),
                messages);
    }
}
