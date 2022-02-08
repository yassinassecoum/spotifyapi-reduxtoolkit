import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: {
    name: "",
    followers: 0,
    id: "",
    image: "",
    url: "",
  },
  playlists: [],
  currentPlaylist: {},
};

export const spotify = createSlice({
  name: "spotify",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setCurrentPlaylist: (state, action) => {
      state.currentPlaylist = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setPlaylists: (state, action) => {
      state.playlists = action.payload;
    },
  },
});

export const { setToken, setCurrentPlaylist, setUser, setPlaylists } =
  spotify.actions;

export default spotify.reducer;
