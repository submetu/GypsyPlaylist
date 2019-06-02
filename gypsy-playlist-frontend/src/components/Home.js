import React, { useCallback, useState, useContext } from "react";
import { AppContext } from "../core/AppContextProvider";
import Button from "@material-ui/core/Button";
import { createSpotifyService } from "../services/createSpotifyService";

export function Home() {
  const { theme } = useContext(AppContext);
  const onClick = useCallback(() => {
    createSpotifyService({
      url: "browse/new-releases",
      onSuccess: data => {
        console.log("data");
      }
    });
  }, []);
  return (
    <div className="Home">
      <div>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={onClick}
        >
          Browse
        </Button>
      </div>
    </div>
  );
}
