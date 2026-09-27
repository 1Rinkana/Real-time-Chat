package com.r1nkana.realtimechatdatabase.chat.repository;

import chat.entity.PrivateChatEntity;
import chat.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
@Repository
public interface PrivateChatRepository
        extends JpaRepository<PrivateChatEntity, UUID> {
    @Query("""
        SELECT privateChat
        FROM PrivateChatEntity privateChat
        WHERE (privateChat.firstUser = :firstUser
           AND privateChat.secondUser = :secondUser)
           OR (privateChat.firstUser = :secondUser
           AND privateChat.secondUser = :firstUser)""")
    Optional<PrivateChatEntity> findChatByUsers(@Param("firstUser") UserEntity firstUser,
                                                @Param("secondUser") UserEntity secondUser);
}
