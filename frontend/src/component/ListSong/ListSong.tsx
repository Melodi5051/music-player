import { songTypes } from "../../types/song";
import { storeSong } from "../../store/song";
import ItemList from "./ItemList/ItemList";
import "./ListSong.scss";
export default function ListSong() {
  return (
    <div className="list-wrapper">
      {storeSong.dataSong
        ? storeSong.dataSong.map((element: songTypes) => (
            <ItemList key={element.id} {...element} />
          ))
        : null}
    </div>
  );
}
