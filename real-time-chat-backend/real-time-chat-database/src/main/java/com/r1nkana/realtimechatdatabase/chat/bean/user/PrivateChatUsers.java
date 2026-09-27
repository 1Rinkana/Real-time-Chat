package chat.bean.user;

import java.util.UUID;

public record PrivateChatUsers(UUID askedUser, UUID chatWithUser) { }
