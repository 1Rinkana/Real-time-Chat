package com.r1nkana.realtimechatdatabase.chat.mapper;

import jakarta.annotation.Nonnull;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;

import java.util.Optional;
import java.util.UUID;

public class HeaderAccessorMapper {
    @Nonnull
    public static Optional<UUID> getUserUUid(StompHeaderAccessor headerAccessor) {
        return Optional.ofNullable(headerAccessor.getSessionAttributes())
                .map(map -> UUID.fromString(map.get("™user-uuid").toString()));
    }
}
