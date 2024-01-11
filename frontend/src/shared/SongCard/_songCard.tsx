import './_songCard.scss';

interface SongCardProps {
  id: number;
  title: string;
  author: string;
  photo: string;
  duration: number;
}

export function SongCard({ ...props }: SongCardProps) {
  return (
    <div className="song-card">
      <div className="song-card-content">
        <img
          src={`http://localhost:3000/${props.photo}`}
          alt={props.title}
          className="song-card-content-img"
        />
        <div className="song-card-content-text">
          <h4 className="song-card-text-title">{props.title}</h4>
          <p className="song-card-text-author">{props.author}</p>
        </div>
      </div>
      <p className="song-card-duration">{props.duration}</p>
    </div>
  );
}
