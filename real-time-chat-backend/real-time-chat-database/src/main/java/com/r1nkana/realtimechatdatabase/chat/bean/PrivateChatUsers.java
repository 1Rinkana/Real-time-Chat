package chat.bean;

import java.util.UUID;

public record PrivateChatUsers(UUID askedUser, UUID chatWithUser) {
}
