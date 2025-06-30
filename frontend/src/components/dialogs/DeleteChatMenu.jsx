import { Menu, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { setIsDeleteMenu } from "../../redux/reducers/misc";
import {
  Delete as DeleteIcon,
  ExitToApp as ExitToAppIcon,
  VideoCall as VideoCallIcon,
  Call as CallIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAsyncMutation } from "../../hooks/hook";
import {
  useDeleteChatMutation,
  useLeaveGroupMutation,
} from "../../redux/api/api";

const DeleteChatMenu = ({ dispatch, deleteMenuAnchor }) => {
  const navigate = useNavigate();
  const { isDeleteMenu, selectedDeleteChat } = useSelector((state) => state.misc);

  const [deleteChat, _, deleteChatData] = useAsyncMutation(useDeleteChatMutation);
  const [leaveGroup, __, leaveGroupData] = useAsyncMutation(useLeaveGroupMutation);

  const isGroup = selectedDeleteChat.groupChat;

  const closeHandler = () => {
    dispatch(setIsDeleteMenu(false));
    deleteMenuAnchor.current = null;
  };

  const leaveGroupHandler = (chatId) => {
    closeHandler();
    leaveGroup("Leaving Group...", chatId);
  };

  const deleteChatHandler = (chatId) => {
    closeHandler();
    deleteChat("Deleting Chat...", chatId);
  };

  // const videoCallHandler = (chatId) => {
  //   closeHandler();
  //   navigate(`/video-call/${chatId}`);
    
  // };
  const videoCallHandler = () => {
    closeHandler();
    navigate(`/video-call/`);
    
  };
  const groupVideoCallHandler = () => {
    closeHandler();
    navigate(`/group-video-call`);
  };
  // const groupVideoCallHandler = (chatId) => {
  //   closeHandler();
  //   navigate(`/group-video-call/${chatId}`);
  // };

  useEffect(() => {
    if (deleteChatData || leaveGroupData) navigate("/");
  }, [deleteChatData, leaveGroupData]);

  return (
    <Menu
      open={isDeleteMenu}
      onClose={closeHandler}
      anchorEl={deleteMenuAnchor.current}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
    >
      <Stack
        sx={{
          width: "10rem",
          padding: "0.5rem",
          cursor: "pointer",
        }}
        direction={"row"}
        alignItems={"center"}
        spacing={"0.5rem"}
        onClick={() => isGroup ? leaveGroupHandler(selectedDeleteChat.chatId) : deleteChatHandler(selectedDeleteChat.chatId)}
      >
        {isGroup ? (
          <>
            <ExitToAppIcon />
            <Typography>Leave Group</Typography>
          </>
        ) : (
          <>
            <DeleteIcon />
            <Typography>Delete Chat</Typography>
          </>
        )}
      </Stack>
      <Stack
        sx={{
          width: "10rem",
          padding: "0.5rem",
          cursor: "pointer",
        }}
        direction={"row"}
        alignItems={"center"}
        spacing={"0.5rem"}
        onClick={() => isGroup ? groupVideoCallHandler(selectedDeleteChat.chatId) : videoCallHandler(selectedDeleteChat.chatId)}
      >
        {isGroup ? (
          <>
            <VideoCallIcon />
            <Typography>Group Video Call</Typography>
          </>
        ) : (
          <>
            <VideoCallIcon />
            <Typography>Video Call</Typography>
          </>
        )}
      </Stack>
      <Stack
        sx={{
          width: "10rem",
          padding: "0.5rem",
          cursor: "pointer",
        }}
        direction={"row"}
        alignItems={"center"}
        spacing={"0.5rem"}
        onClick={() => isGroup ? leaveGroupHandler(selectedDeleteChat.chatId) : deleteChatHandler(selectedDeleteChat.chatId)}
      >
        {isGroup ? (
          <>
            <CallIcon />
            <Typography>Group Call</Typography>
          </>
        ) : (
          <>
            <CallIcon />
            <Typography>Call</Typography>
          </>
        )}
      </Stack>
    </Menu>
  );
};

export default DeleteChatMenu;
