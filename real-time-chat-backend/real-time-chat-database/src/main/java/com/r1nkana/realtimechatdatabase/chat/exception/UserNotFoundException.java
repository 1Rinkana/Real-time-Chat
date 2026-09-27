package com.r1nkana.realtimechatdatabase.chat.exception;

public class UserNotFoundException
        extends RuntimeException
{
    public UserNotFoundException()
    {
        super("User not found.");
    }
}
