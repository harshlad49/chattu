import React, { useState } from 'react';
import './groupvideocall.css';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicOffIcon from '@mui/icons-material/MicOff';
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { useNavigate } from "react-router-dom";
const GroupVideoCall = () => {
  const [isMuted, setMuted] = useState(false);
  const [isVideoOn, setVideoOn] = useState(true);
  const [isChatOpen, setChatOpen] = useState(false);

  const toggleMute = () => setMuted(!isMuted);
  const toggleVideo = () => setVideoOn(!isVideoOn);
  const toggleChat = () => setChatOpen(!isChatOpen);
  const navigate = useNavigate();
  const endcall = () => {
    navigate("/"); // Navigate to the home page or any other route
  };
  return (
    <div className="video-call-page">
      <div className="video-grid">
        {/* Sample video tiles, replace with actual video feeds */}
        {[1, 2 , 3].map(id => (
          <div key={id} className="video-tile">
            <p>User {id}</p>
          </div>
        ))}
      </div>

      <div className="controls-bar">
        <button onClick={toggleMute}>{isMuted ? <MicOffIcon/> : <MicIcon/>}</button>
        <button onClick={toggleVideo}>{isVideoOn ? <VideocamIcon />: <VideocamOffIcon/>}</button>
        <button className="end-call" onClick={endcall}><CallEndIcon /></button>
      </div>

      {isChatOpen && (
        <div className="chat-panel">
          <h3>Chat</h3>
          <div className="chat-messages">
            {/* Chat messages here */}
          </div>
          <input type="text" placeholder="Type a message..." />
        </div>
      )}
    </div>
  );
};

export default GroupVideoCall;
