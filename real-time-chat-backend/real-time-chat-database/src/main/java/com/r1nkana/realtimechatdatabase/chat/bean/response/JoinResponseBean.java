package chat.bean.response;

import chat.bean.message.MessageBean;
import chat.bean.user.UserBean;

import java.util.List;

public record JoinResponseBean(List<MessageBean> messages, List<UserBean> onlineUsers) {}
