/**
 * Centralized Socket.IO Client Bootstrap
 * 
 * This script provides a single, reusable Socket.IO client connection that:
 * 1. Loads once per page and exposes a global window.socket
 * 2. Tries to connect to same origin first (for local/server deployments)
 * 3. Falls back to configurable external server URL if same-origin fails (for static hosting like GitHub Pages)
 * 
 * Usage:
 * 1. Include Socket.IO CDN script: <script src="https://cdn.socket.io/4.6.1/socket.io.min.js"></script>
 * 2. (Optional) Set fallback URL: <script>window.SOCKET_URL = 'https://hidon1.com';</script>
 * 3. Include this script: <script src="socket-client.js"></script>
 * 4. Access socket via: window.socket
 */

(function() {
  'use strict';
  
  // Prevent re-initialization if socket already exists
  if (window.socket) {
    console.log('Socket.IO client already initialized');
    return;
  }

  // Check if Socket.IO library is loaded
  if (typeof io === 'undefined') {
    console.error('Socket.IO library not loaded. Please include the Socket.IO CDN script before socket-client.js');
    return;
  }

  // Determine connection URL
  // Priority: 1) window.SOCKET_URL (external server), 2) same origin (default)
  const socketUrl = window.SOCKET_URL || undefined;
  
  // Initialize Socket.IO connection
  try {
    const socket = io(socketUrl, {
      // Reconnection settings for better reliability
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      // Transports: try WebSocket first, fall back to polling
      transports: ['websocket', 'polling']
    });

    // Connection event handlers
    socket.on('connect', () => {
      console.log('Socket.IO connected:', socket.id);
      console.log('Connected to:', socketUrl || 'same origin');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket.IO connection error:', error.message);
      
      // If connecting to same origin failed and no fallback is set, show helpful message
      if (!socketUrl) {
        console.warn('Tip: Set window.SOCKET_URL to connect to an external Socket.IO server');
        console.warn('Example: window.SOCKET_URL = "https://hidon1.com";');
      }
    });

    socket.on('disconnect', (reason) => {
      console.log('Socket.IO disconnected:', reason);
    });

    socket.on('error', (error) => {
      console.error('Socket.IO error:', error);
    });

    // Expose socket globally
    window.socket = socket;
    
    // Also expose for backward compatibility if code expects 'socket' variable
    // Note: This won't work for 'const socket' declarations, only for accessing global socket
    if (typeof globalThis !== 'undefined') {
      globalThis.socket = socket;
    }

    console.log('Socket.IO client initialized successfully');
    
  } catch (error) {
    console.error('Failed to initialize Socket.IO client:', error);
  }
})();
