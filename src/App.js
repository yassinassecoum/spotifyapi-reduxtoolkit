import "./App.css";
import { useEffect } from "react";
import { Layout } from "./components/Layout";
import styled from "styled-components";
import { getToken, getUserProfile, getPlaylists } from "./services/ApiCalls";
import { setToken, setUser, setPlaylists } from "./features/spotify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.spotify);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      dispatch(setToken(token));
      const userProfile = await getUserProfile(token);
      dispatch(
        setUser({
          name: userProfile.display_name,
          followers: userProfile.followers.total,
          id: userProfile.id,
          image: userProfile.images[0].url,
          url: userProfile.external_urls.spotify,
        })
      );
      const userPlaylists = await getPlaylists(token);
      dispatch(setPlaylists(userPlaylists));
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Layout />
      <WrapContent>
        <WrapTitle>
          <img className="logo" src={state.user.image} alt="user-logo" />
          <div className="wrapper">
            <a
              className="username"
              href={state.user.url}
              target="_blank"
              rel="noreferrer"
            >
              {state.user.name}
            </a>
            <br />
            <Description>
              5D MUSIC is a playlist brand created by mysellf with differents
              kind of musics.
              <br />
              We currently have 5 playlists live for each music style.The
              Playlist is updated weekly, our followers loves our music
              selection.
            </Description>
            <span className="followers">{state.user.followers} followers</span>
            <br />
          </div>
        </WrapTitle>
        <h2>Playlists</h2>
        <WrapPlaylist>
          {state.playlists.map((playlist, index) => {
            return (
              <div
                key={index}
                className="playlist"
                onClick={() => navigate(`/playlist/${playlist.id}`)}
              >
                <img
                  className="playlistPicture"
                  src={playlist.images[0].url}
                  alt="playlistPicture"
                />
                <span className="playlistName"> {playlist.name} </span>
              </div>
            );
          })}
        </WrapPlaylist>
      </WrapContent>
    </Container>
  );
}

export default App;

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
  h2 {
    margin-top: 45px;
  }
`;
const WrapTitle = styled.div`
  display: flex;
  align-items: center;
  .wrapper {
    width: 100%;
  }
  .logo {
    border-radius: 50%;
    @media (max-width: 998px) {
      width: 80%;
    }
  }
  .username {
    font-size: 96px;
    font-weight: 600;
    margin-left: 30px;
    @media (max-width: 1288px) {
      font-size: 66px;
    }
    @media (max-width: 998px) {
      font-size: 42px;
    }
  }
  .followers {
    font-size: 18px;
    font-weight: 600;
    margin-left: 30px;
    color: rgba(255, 255, 255, 0.7);
    @media (max-width: 998px) {
      font-size: 14px;
    }
  }
`;
const Description = styled.p`
  color: hsla(0, 0%, 95.3%, 1);
  font-size: 16px;
  margin: 20px 0 24px;
  line-height: 1.5;
  letter-spacing: 1.5px;
  margin-left: 30px;
  @media (max-width: 998px) {
    font-size: 12px;
  }
`;

const WrapPlaylist = styled.div`
  display: grid;
  grid-gap: 35px;
  gap: 20px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  margin-bottom: 50px;
  @media (max-width: 1288px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media (max-width: 998px) {
    gap: 55px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .playlist {
    min-height: 255px;
    border-radius: 10px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    overflow: hidden;
    background: #181818;
    padding: 16px;
    position: relative;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    border: 3px solid rgba(249, 249, 249, 0.1);
    .playlistPicture {
      inset: 0px;
      display: block;
      height: 90%;
      object-fit: fill;
      opacity: 1;
      transition: opacity 500ms ease-in-out 0s;
      width: 100%;
      z-index: 1;
      margin-bottom: 10px;
    }
    &:hover {
      background: #282828;
    }
    .playlistName {
      font-weight: 600;
    }
  }
`;
