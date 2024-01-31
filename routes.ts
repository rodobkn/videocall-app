 
 /**
  * An array of routes that are used for authentication
  * These routes will redirect logged in users to /home
  * @type {string[]}
  */
 export const authRoutes = [
   "/",
 ];
 
 /**
  * The prefix for API authentication routes
  * Routes that start with this prefix are used for API authentication purposes
  * @type {string}
  */
 export const apiAuthPrefix = "/api/auth";

 /**
  * The prefix for Livekit routes (video server provider api)
  * @type {string}
  */
export const apiLivekitPrefix = "/api/livekit"

  /**
  * The prefix for video call rooms
  * @type {string}
  */
  export const videoCallRoomPrefix = "/room";
 
 /**
  * The default redirect path after logging in
  * @type {string}
  */
 export const DEFAULT_LOGIN_REDIRECT = "/home";
