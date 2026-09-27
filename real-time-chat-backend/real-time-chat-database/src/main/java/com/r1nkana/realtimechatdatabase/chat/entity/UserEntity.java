package com.r1nkana.realtimechatdatabase.chat.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "chat_user")
public class UserEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "uuid")
    private UUID uuid;

    @Column(name = "username")
    private String username;

    @Column(name = "registration_time")
    private LocalDateTime registrationTime;

    public UserEntity(String username, LocalDateTime registrationTime)
    {
        this.username = username;
        this.registrationTime = registrationTime;
    }

    protected UserEntity() {}

    public UUID getUuid()
    {
        return uuid;
    }

    public void setUuid(UUID uuid)
    {
        this.uuid = uuid;
    }

    public String getUsername()
    {
        return username;
    }

    public void setUsername(String username)
    {
        this.username = username;
    }

    public LocalDateTime getRegistrationTime()
    {
        return registrationTime;
    }

    public void setRegistrationTime(LocalDateTime registrationTime)
    {
        this.registrationTime = registrationTime;
    }
}
