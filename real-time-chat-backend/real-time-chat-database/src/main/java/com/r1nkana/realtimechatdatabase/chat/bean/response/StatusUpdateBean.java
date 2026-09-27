package com.r1nkana.realtimechatdatabase.chat.bean.response;

import chat.bean.user.UserBean;
import chat.bean.user.UserStatus;

public class StatusUpdateBean
{
    private UserStatus type;

    private UserBean user;

    public StatusUpdateBean(UserStatus type, UserBean user)
    {

        this.type = type;
        this.user = user;
    }

    public UserStatus getType()
    {
        return type;
    }

    public void setType(UserStatus type)
    {
        this.type = type;
    }

    public UserBean getUser()
    {
        return user;
    }

    public void setUser(UserBean user)
    {
        this.user = user;
    }
}
