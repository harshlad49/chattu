import React, { useState, useEffect, useRef } from 'react';
import './VideoCallPage.css';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicOffIcon from '@mui/icons-material/MicOff';
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { useNavigate } from "react-router-dom";

const VideoCallPage = ({ user }) => {
  const [isMuted, setMuted] = useState(false);
  const [isVideoOn, setVideoOn] = useState(true);
  const [isChatOpen, setChatOpen] = useState(false);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null); // Ref for the simulated remote user video
  const navigate = useNavigate();

  useEffect(() => {
    if (isVideoOn) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: !isMuted })
        .then((stream) => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error("Error accessing media devices.", error);
        });
    } else {
      if (localVideoRef.current && localVideoRef.current.srcObject) {
        const stream = localVideoRef.current.srcObject;
        stream.getTracks().forEach(track => track.stop());
        localVideoRef.current.srcObject = null;
      }
    }
  }, [isVideoOn, isMuted]);

  const toggleMute = () => setMuted(!isMuted);
  const toggleVideo = () => setVideoOn(!isVideoOn);
  const toggleChat = () => setChatOpen(!isChatOpen);

  const endCall = () => {
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
    }
    navigate("/");
  };

  return (
    <div className="video-call-page">
      <div className="video-grid">
        <div className="video-tile main-video">
          <video ref={remoteVideoRef} autoPlay playsInline muted />
          <p>{user?.name || "User 1"}</p>
        </div>
        <div className="video-tile local-video">
          <video ref={localVideoRef} autoPlay playsInline muted={isMuted} />
          <p>{"You"}</p>
        </div>
      </div>

      <div className="controls-bar">
        <button onClick={toggleMute}>{isMuted ? <MicOffIcon /> : <MicIcon />}</button>
        <button onClick={toggleVideo}>{isVideoOn ? <VideocamIcon /> : <VideocamOffIcon />}</button>
        <button className="end-call" onClick={endCall}><CallEndIcon /></button>
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

export default VideoCallPage;
