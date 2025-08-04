"use client";

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { PageContainer } from '@/components/page-container';
import io from 'socket.io-client';

// This is a simplified component. A real implementation would be more complex
// and would likely be broken down into smaller components and custom hooks.

const socket = io(); // Connect to the server defined in server.js

export default function ReadingPage() {
  const { id: roomId } = useParams();
  const { user } = useUser();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  // In a real app, you would move this complex logic to a custom hook (e.g., useWebRTC)
  const peerConnectionRef = useRef<RTCPeerConnection>();

  useEffect(() => {
    // Initialize Socket.IO connection
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    // WebRTC Peer Connection Setup
    const pc = new RTCPeerConnection({
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            // Add TURN server details from .env for production
        ]
    });
    peerConnectionRef.current = pc;

    // Get user media
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        stream.getTracks().forEach(track => pc.addTrack(track, stream));

        // Join the room
        if(user) {
            socket.emit('join-room', roomId, user.id);
        }
      })
      .catch(error => console.error('Error accessing media devices.', error));

    // Signaling Handlers
    pc.onicecandidate = event => {
        if (event.candidate) {
            socket.emit('ice-candidate', roomId, event.candidate);
        }
    };

    pc.ontrack = event => {
        if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
        }
    };

    socket.on('user-connected', async (userId: string) => {
        console.log('User connected:', userId);
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit('offer', roomId, offer);
    });

    socket.on('offer', async (offer) => {
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit('answer', roomId, answer);
    });

    socket.on('answer', async (answer) => {
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on('ice-candidate', async (candidate) => {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
    });

    // Cleanup
    return () => {
      socket.disconnect();
      pc.close();
    };
  }, [roomId, user]);

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-alex-brush text-center mb-4">Reading Room: {roomId}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="font-playfair text-xl mb-2">You</h2>
            <video ref={localVideoRef} autoPlay playsInline muted className="w-full rounded-lg glass-card" />
          </div>
          <div>
            <h2 className="font-playfair text-xl mb-2">Remote User</h2>
            <video ref={remoteVideoRef} autoPlay playsInline className="w-full rounded-lg glass-card" />
          </div>
        </div>
        <div className="mt-4 text-center">
            <p>Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
            <p>Your User ID: {user?.id}</p>
            <p>Room ID: {roomId}</p>
        </div>
      </div>
    </PageContainer>
  );
}
