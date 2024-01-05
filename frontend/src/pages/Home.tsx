import { observer } from "mobx-react-lite";
import { useEffect, useLayoutEffect } from "react";
import { storeSong } from "../store/song";
import ListSong from "../component/ListSong/ListSong";

export default observer(function Home() {
  useLayoutEffect(() => {
    storeSong.setDataSong();
  }, []);

  useEffect(() => {
    console.log(storeSong.dataSong);
  }, [storeSong.dataSong]);
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <header>Шапка</header>
      <ListSong />
      <footer>Футер</footer>
    </div>
  );
});
