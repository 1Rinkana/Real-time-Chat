package com.r1nkana.realtimechatdatabase.chat.exception;

public class MessageNotFoundException
        extends RuntimeException
{
    public MessageNotFoundException()
    {
        super("Message not found.");;
    }
}
