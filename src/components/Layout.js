import React, { useEffect } from "react";

import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";

import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Layout = () => {
  const drawerWidth = 180;
  const state = useSelector((state) => state.spotify);
  const navigate = useNavigate();
  return (
    <Container>
      <AppBar
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          background: "#040404",
        }}
      >
        <Toolbar>
          <WrapContent>
            <Button
              aria-haspopup="true"
              sx={{
                color: "#ffffff",
              }}
            >
              <PersonIcon />
            </Button>
          </WrapContent>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#040404",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <img
          onClick={() => navigate(`/`)}
          src="https://i.scdn.co/image/ab6775700000ee858f1940643c68fbb0b981f13e"
          alt="logo"
        />
        <WrapLinks>
          {state.playlists.map((playlist, index) => {
            return (
              <PlaylistLink
                key={index}
                onClick={() => navigate(`/playlist/${playlist.id}`)}
              >
                {playlist.name}
              </PlaylistLink>
            );
          })}
        </WrapLinks>
      </Drawer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  img {
    width: 92%;
    height: 150px;
    cursor: pointer;
    border-radius: 50%;
  }
`;

const WrapLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;
const PlaylistLink = styled.a`
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  width: 100%;
  height: 36px;
  font-weight: 600;
  align-items: center;
  &:hover {
    background: #282828;
  }
`;

const WrapContent = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
