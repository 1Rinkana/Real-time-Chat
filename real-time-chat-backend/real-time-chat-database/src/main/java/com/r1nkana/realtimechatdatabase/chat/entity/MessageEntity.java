package com.r1nkana.realtimechatdatabase.chat.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "message")
public class MessageEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "uuid")
    private UUID uuid;

    @Column(name = "text")
    private String text;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity sentBy;

    @Column(name = "sent_at")
    private LocalDateTime sentAt;

    public MessageEntity(String text,
                         UserEntity sentBy,
                         LocalDateTime sentAt)
    {
        this.text = text;
        this.sentBy = sentBy;
        this.sentAt = sentAt;
    }

    protected MessageEntity() {}


    public UUID getUuid()
    {
        return uuid;
    }

    public void setUuid(UUID uuid)
    {
        this.uuid = uuid;
    }

    public String getText()
    {
        return text;
    }

    public void setText(String text)
    {
        this.text = text;
    }


    public UserEntity getSentBy()
    {
        return sentBy;
    }

    public void setSentBy(UserEntity sentBy)
    {
        this.sentBy = sentBy;
    }

    public LocalDateTime getSentAt()
    {
        return sentAt;
    }

    public void setSentAt(LocalDateTime sentAt)
    {
        this.sentAt = sentAt;
    }
}
