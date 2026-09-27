package chat.bean;

import java.time.LocalDateTime;
import java.util.UUID;

public record MessageBean(UUID uuid,
                          String text,
                          UserBean sentByUser,
                          LocalDateTime sentAt) {}
