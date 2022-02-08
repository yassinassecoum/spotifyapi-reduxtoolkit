import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Layout } from "./Layout";
import { getPlaylistById, getToken, getPlaylists } from "../services/ApiCalls";
import { useDispatch } from "react-redux";
import { setPlaylists } from "../features/spotify";
export const PlaylistDetail = () => {
  const { id } = useParams();
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchTracks = async () => {
      const token = await getToken();
      const userPlaylists = await getPlaylists(token);
      dispatch(setPlaylists(userPlaylists));
      const playlist = await getPlaylistById(token, id);
      setCurrentPlaylist(playlist);
    };
    fetchTracks();
  }, [id]);
  return (
    <Container>
      <Layout />
      {currentPlaylist ? (
        <WrapContent>
          <div className="wrapTitle">
            <img
              className="logoPlaylist"
              src={currentPlaylist.images[0].url}
              alt="playlistPicture"
            />
            <div className="wrapper">
              <span className="playlistName"> {currentPlaylist.name} </span>
              <span className="playlistDesc">
                {currentPlaylist.description}
              </span>
              <span className="playlistInfo">
                <a
                  className="strong"
                  href={currentPlaylist.owner.external_urls.spotify}
                  target="_blank"
                  rel="noreferrer"
                >
                  {currentPlaylist.owner.display_name}
                </a>
                <span>
                  {" ⬤ "} {currentPlaylist.followers.total} likes {" ⬤ "}
                  {currentPlaylist.tracks.total} tracks
                </span>
              </span>
            </div>
          </div>
          <div className="wrapTracks">
            {currentPlaylist.tracks.items.map((track, key) => (
              <Box key={key}>
                <div className="wrapRankImg">
                  <span className="ranking">{key + 1}</span>
                  <img
                    className="logo"
                    src={track.track.album.images[1].url}
                    alt="cover-album"
                  />
                </div>

                <div className="infos">
                  <span className="title"> {track.track.name} </span>
                  <span className="artist"> {track.track.artists[0].name}</span>
                  <span className="date">
                    {new Date(
                      track.track.album.release_date
                    ).toLocaleDateString("en-GB")}
                  </span>
                </div>
                <a
                  href={track.track.external_urls.spotify}
                  target="_blank"
                  className="toSpotify"
                  rel="noreferrer"
                >
                  Open on Spotify
                </a>
              </Box>
            ))}
          </div>
        </WrapContent>
      ) : (
        ""
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;
const WrapContent = styled.div`
  position: relative;
  min-height: calc(80vh);
  overflow-x: hidden;
  display: block;
  top: 96px;
  padding: 0 50px;
  width: 100%;
  @media (max-width: 998px) {
    padding: 0 15px;
  }
  .wrapTitle {
    display: flex;
    align-items: center;
    .logoPlaylist {
      width: 250px;
      @media (max-width: 998px) {
        width: 180px;
      }
    }
    .wrapper {
      display: flex;
      flex-direction: column;
      margin-left: 20px;
      .playlistName {
        font-size: 88px;
        font-weight: 600;
        @media (max-width: 1288px) {
          font-size: 66px;
        }
        @media (max-width: 998px) {
          font-size: 42px;
        }
      }
      .playlistDesc {
        color: rgba(255, 255, 255, 0.7);
        font-size: 18px;
      }
      .playlistInfo {
        color: rgba(255, 255, 255, 0.7);
        font-size: 18px;
        .strong {
          font-weight: 600;
        }
      }
    }
  }
  .wrapTracks {
    display: flex;
    flex-direction: column;
  }
`;
const Box = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 8px;
  background-color: #181818;
  cursor: pointer;
  margin: 16px 0 0;
  padding: 24px 44px 24px 32px;
  min-height: 95px;
  @media (max-width: 768px) {
    padding: 14px;
  }
  .wrapRankImg {
    display: flex;
    align-items: center;
    @media (max-width: 468px) {
      align-items: left;
    }
  }

  .logo {
    height: 98px;
    width: 98px;
    margin-right: 40px;
    @media (max-width: 768px) {
      height: 68px;
      width: 68px;
      margin-right: 15px;
    }
    @media (max-width: 468px) {
      height: 88px;
      width: 88px;
      margin-right: 0px;
    }
  }
  .ranking {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -2px;
    margin-right: 16px;
  }
  .infos {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    width: 100%;
    .title {
      font-size: 24px;
      line-height: 28px;
      letter-spacing: -0.04em;
      @media (max-width: 768px) {
        font-size: 16px;
      }
    }
    .artist {
      color: #9f9f9f;
      display: block;
      line-height: 24px;
      font-size: 16px;
      font-weight: 600;
      margin: 10px 0 0;
      @media (max-width: 768px) {
        font-size: 13px;
      }
    }
    .date {
      color: #9f9f9f;
      display: block;
      font-size: 14px;
      line-height: 24px;
      @media (max-width: 768px) {
        font-size: 12px;
      }
    }
  }
  .toSpotify {
    min-width: 110px;
    border: 1px solid #20d06a;
    border-radius: 100px;
    color: #20d06a;
    font-size: 11px;
    font-weight: 700;
    padding: 8px 5px;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.3s, color 0.3s;
    background-color: transparent;
    &:hover {
      background-color: #20d06a;
      color: white;
    }
    @media (max-width: 768px) {
      display: none;
    }
  }
`;
