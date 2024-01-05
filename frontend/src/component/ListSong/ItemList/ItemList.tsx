import { handlerConvertDuration } from "../../../helpers/song.helper";
import { songTypes } from "../../../types/song";
import "./ItemList.scss";
import Pause from "./../../../assets/play.svg";
import Play from "./../../../assets/pause.svg";
import { useState } from "react";
import { storeSong } from "../../../store/song";

export default function ItemList({ ...props }: songTypes) {
  const [hover, setHover] = useState(false);
  const [status, setStatus] = useState(false);
  const handleHoverItem = () => {
    setHover(true);
  };

  const handleLeaveItem = () => {
    setHover(false);
  };

  const handlePlaySong = () => {
    storeSong.playSong({ ...props });
    setStatus(!status);
  };

  return (
    <div
      className="list-item"
      onMouseEnter={handleHoverItem}
      onMouseLeave={handleLeaveItem}
      onClick={handlePlaySong}
    >
      <div className="list-content">
        <img
          src={`http://localhost:3000/${props.photo}`}
          width={40}
          alt={props.title}
          className="list-content-img"
        />
        <div className="list-btn" style={{ display: hover ? "flex" : "none" }}>
          {storeSong.status && storeSong.currentSongId === props.id ? (
            <Play />
          ) : (
            <Pause />
          )}
        </div>
        <div className="list-content-text">
          <h3 className="list-text-title">{props.title}</h3>
          <p className="list-text-author">{props.author}</p>
        </div>
      </div>
      <p className="list-duration">{handlerConvertDuration(props.duration)}</p>
    </div>
  );
}
