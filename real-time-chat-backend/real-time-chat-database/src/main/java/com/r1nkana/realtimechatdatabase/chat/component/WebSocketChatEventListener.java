package com.r1nkana.realtimechatdatabase.chat.component;

import chat.bean.response.StatusUpdateBean;
import chat.bean.user.UserBean;
import chat.bean.user.UserStatus;
import chat.service.UserService;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.security.Principal;
import java.util.UUID;

@Component
public class WebSocketChatEventListener
{
    private final UserService userService;
    private final OnlineUserStorage onlineUserStorage;
    private final SimpMessageSendingOperations messagingTemplate;

    public WebSocketChatEventListener(
            UserService userService,
            OnlineUserStorage onlineUserStorage,
            SimpMessageSendingOperations messagingTemplate)
    {

        this.userService = userService;
        this.onlineUserStorage = onlineUserStorage;
        this.messagingTemplate = messagingTemplate;
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event)
    {

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        Principal principal = accessor.getUser();

        if (principal == null) {
            return;
        }

        UUID uuid = UUID.fromString(principal.getName());
        UserBean user = userService.getUser(uuid);

        onlineUserStorage.remove(uuid);

        StatusUpdateBean status = new StatusUpdateBean(UserStatus.OFFLINE, user);
        messagingTemplate.convertAndSend("/chat/users", status);
    }
}