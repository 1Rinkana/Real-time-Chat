package com.r1nkana.realtimechatdatabase.chat.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "private_chat")
public class PrivateChatEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "uuid")
    private UUID uuid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "first_user_id")
    private UserEntity firstUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "second_user_id")
    private UserEntity secondUser;

    @OneToMany
    @JoinTable(name = "private_chat_messages",
            joinColumns = @JoinColumn(name = "chat_id"),
            inverseJoinColumns = @JoinColumn(name = "message_id"))
    private List<MessageEntity> chatMessages;

    public PrivateChatEntity(UserEntity firstUser,
                             UserEntity secondUser)
    {
        this.firstUser = firstUser;
        this.secondUser = secondUser;
        this.chatMessages = new ArrayList<>();
    }

    protected PrivateChatEntity() {}

    public UUID getUuid()
    {
        return uuid;
    }

    public void setUuid(UUID uuid)
    {
        this.uuid = uuid;
    }

    public UserEntity getFirstUser()
    {
        return firstUser;
    }

    public void setFirstUser(UserEntity firstUser)
    {
        this.firstUser = firstUser;
    }

    public UserEntity getSecondUser()
    {
        return secondUser;
    }

    public void setSecondUser(UserEntity secondUser)
    {
        this.secondUser = secondUser;
    }

    public List<MessageEntity> getChatMessages()
    {
        return chatMessages;
    }

    public void setChatMessages(List<MessageEntity> chatMessages)
    {
        this.chatMessages = chatMessages;
    }

    public void addChatMessage(MessageEntity chatMessage)
    {
        this.chatMessages.add(chatMessage);
    }
}
