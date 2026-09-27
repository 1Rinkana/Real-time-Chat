package chat.bean;

import jakarta.annotation.Nullable;

import java.util.UUID;

public record NewMessageBean(String text,
                             UUID sentByUser,
                             boolean isPublic,
                             @Nullable UUID sendToUser) {}
