package chat.bean;

import java.util.List;

public record JoinResponseBean(List<MessageBean> messages, List<UserBean> onlineUsers) {}
