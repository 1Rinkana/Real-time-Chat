package chat.bean.message;

import chat.bean.user.UserBean;

import java.time.LocalDateTime;
import java.util.UUID;

public record MessageBean(UUID uuid,
                          String text,
                          UserBean sentByUser,
                          LocalDateTime sentAt) {}
