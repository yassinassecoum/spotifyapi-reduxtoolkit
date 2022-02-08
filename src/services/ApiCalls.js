import axios from "axios";

export const getToken = async () => {
  const tokenResponse = await axios("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        btoa(
          process.env.REACT_APP_CLIENT_ID + ":" + process.env.REACT_APP_SECRET
        ),
    },
    data: "grant_type=client_credentials",
  });

  return tokenResponse.data.access_token;
};

export const getPlaylists = async (token) => {
  const dataResponse = await axios(
    `https://api.spotify.com/v1/users/i3i3c4we8r6v8n1jjadnkd9vy/playlists`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    }
  ).catch((error) => console.log(error));
  return dataResponse.data.items;
};

export const getUserProfile = async (token) => {
  const dataResponse = await axios(
    `https://api.spotify.com/v1/users/i3i3c4we8r6v8n1jjadnkd9vy`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    }
  ).catch((error) => console.log(error));
  return dataResponse.data;
};

export const getTracksByPlaylistId = async (token, id) => {
  const dataResponse = await axios(
    `	https://api.spotify.com/v1/playlists/${id}/tracks?limit=50`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    }
  ).catch((error) => console.log(error));
  return dataResponse.data;
};
export const getPlaylistById = async (token, id) => {
  const dataResponse = await axios(
    `	https://api.spotify.com/v1/playlists/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    }
  ).catch((error) => console.log(error));
  return dataResponse.data;
};
