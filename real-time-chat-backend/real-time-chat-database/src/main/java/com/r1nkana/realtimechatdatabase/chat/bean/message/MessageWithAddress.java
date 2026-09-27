package chat.bean.message;

import java.util.UUID;

public record MessageWithAddress(UUID sentTo, MessageBean message) {}
