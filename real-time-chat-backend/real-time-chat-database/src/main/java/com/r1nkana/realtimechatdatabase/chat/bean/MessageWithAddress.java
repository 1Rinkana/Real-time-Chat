package chat.bean;

import java.util.UUID;

public record MessageWithAddress(UUID sentTo, MessageBean message) {
}
