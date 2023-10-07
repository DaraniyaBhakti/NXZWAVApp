export const Constant = {
    appName:"NXZ WAV",
    markBullet: "\u2B24",
    markBullet1:"\u2022",
    space:" ",
    unitPts:"pts"
}

export const APIRequest = {
    contentType:"Content-Type",
    jsonApiContentType : "application/json",
    httpGetMethod: "GET",
    httpPostMethod: "POST",
    httpPutMethod: "PUT",
    httpDeleteMethod: "DELETE",
}

export const APIConstant = {
    markQuestion:"?",
    markEqual:"=",
    markAnd:"&&",
    paramsUserProfileInfoId:"user_profile_info_id",
    paramsQuery:"query",
    paramsUserPostId:"user_post_id",
    paramsTypePostComment : "BxBlockPosts::UserPost",
    paramsReceiverID : "receiver_id",
    paramsSenderID : "sender_id",
    paramsMessageID : "message_id",
    paramsDMConversationID : "conversation_id",
    paramsPMConversationID : "pm_conversation_id",
}

export const APIEndPoint = {
    endPointAPIGetFollowers:"bx_block_followers/follows/followers_list",
    endPointAPIGetFollowing : "bx_block_followers/follows/following_list",
    endPointAPISearchWatcher: 'bx_block_followers/follows/watchers_search',
    
    endPointAPIGetComment: "bx_block_posts/user_posts/get_post_comments",
    endPointPostComment: "bx_block_comments/comments",
    endPointReplyComment: "bx_block_comments/reply_comments",

    endPointAPIGetDMList:"bx_block_chat/chats/conversation_list",
    endPointAPIGetPMList:"bx_block_chat/chats/pm_conversation_list",
    endPointAPIGetUserList:"bx_block_chat/chats/search_user",
    endPointAPIUnlockMessage:"/bx_block_chat/chats/unlock_message",

    endPointAPIPostChat:"bx_block_chat/chats",
    endPointAPIPmChat:"bx_block_chat/chats/create_pm",
    endPointAPIGetDMChatList:"bx_block_chat/chats/dm_chat",
    endPointAPIGetPMChatList:"bx_block_chat/chats/pm_chat",
    endPointAPIDeleteConversation:"bx_block_chat/chats/delete_conversation",
    endPointAPIPutReadMessage:"bx_block_chat/chats/read_messages"
}

export function defaultProfileImage(name:string) : string {
  return 'https://eu.ui-avatars.com/api/?name=name&size=100'
}

export function defaultPostImage(name:string) : string {
  return 'https://eu.ui-avatars.com/api/?name=name&size=300'
}