package com.r1nkana.realtimechatdatabase.chat.component;

import jakarta.annotation.Nonnull;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;

@Component
public class WebSocketInterceptor implements ChannelInterceptor
{
    @Override
    public Message<?> preSend(
            @Nonnull Message<?> message,
            @Nonnull MessageChannel channel)
    {

        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(
                        message,
                        StompHeaderAccessor.class
                );

        if (accessor != null && StompCommand.CONNECT.equals(accessor.getCommand()))
        {
            String userUuid = accessor.getFirstNativeHeader("user-uuid");

            if (userUuid != null) {
                accessor.setUser(() -> userUuid);
            }
        }

        return message;
    }
}