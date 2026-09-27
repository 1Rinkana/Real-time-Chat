package com.r1nkana.realtimechatdatabase.chat.component;

import chat.bean.user.UserBean;
import chat.bean.user.UserOnlineBean;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class OnlineUserStorage
{
    private final Map<UUID, UserOnlineBean> onlineUsers = new ConcurrentHashMap<>();

    public void add(UUID uuid, UserBean user, UUID clientUUID)
    {
        UserOnlineBean userOnlineBean = new UserOnlineBean(
                user,
                LocalDateTime.now(),
                clientUUID);

        onlineUsers.put(uuid, userOnlineBean);
    }

    public void remove(UUID uuid)
    {
        onlineUsers.remove(uuid);
    }

    public UserOnlineBean get(UUID uuid)
    {
        return onlineUsers.get(uuid);
    }

    public List<UserBean> getOnlineUsers()
    {
        return onlineUsers.values()
                .stream()
                .sorted(Comparator.comparing(UserOnlineBean::enteredAt))
                .map(UserOnlineBean::userBean)
                .toList();
    }
}
