import { handlerConvertDuration } from "../../helpers/song.helper";
import ArrowLeft from "./../../assets/arrow-left.svg";
import ArrowRight from "./../../assets/arrow-right.svg";
import Play from "./../../assets/play.svg";
import Pause from "./../../assets/pause.svg";
import "./Player.scss";
import { observer } from "mobx-react-lite";
import InputRange from "../InputRange/InputRange";
import { songTypes } from "../../types/song";
import { storeSong } from "../../store/song";

function Player({ ...props }: songTypes) {
  return (
    <div className="player-wrapper">
      <div className="player-buttons">
        <button>{true ? <Play /> : <Pause />}</button>
        <button>
          <ArrowLeft />
        </button>
        <button>
          <ArrowRight />
        </button>
      </div>
      <img
        src={`http://localhost:3000/${props.photo}`}
        width={100}
        alt={props.title}
        className="player-image"
      />
      <div className="player-content">
        <div className="player-text">
          <div className="player-text-content">
            <h3>{props.title}</h3>
            <p>{props.author}</p>
          </div>

          <p>{handlerConvertDuration(props.duration)}</p>
        </div>
        <div className="player-progress-bar">
          <div className="player-progress" style={{ width: `100%` }}></div>
        </div>
      </div>
      <div style={{ width: "100px" }}>
        <InputRange />
      </div>
    </div>
  );
}
export default observer(Player);
