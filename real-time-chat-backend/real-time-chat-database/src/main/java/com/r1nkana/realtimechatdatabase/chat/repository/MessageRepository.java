package com.r1nkana.realtimechatdatabase.chat.repository;

import chat.entity.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MessageRepository
        extends JpaRepository<MessageEntity, UUID>
{
    @Query("""
            SELECT message
            FROM MessageEntity message
            LEFT JOIN PrivateChatEntity privatChat ON message IN elements(privatChat.chatMessages)
            WHERE privatChat.uuid IS NULL
            ORDER BY message.sentAt""")
    List<MessageEntity> findAllPublicChatMessages();
}
