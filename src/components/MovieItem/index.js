import "./index.css";

const MovieItem = (props) => {
  const { EachMovieItem } = props;
  const { title, vote_average, release_date, poster_path, overview } =
    EachMovieItem;
  return (
    <li className="card p-3 mt-3 shadow-lg">
      <div className="d-flex">
        <div className="col-3 text-center">
          <img
            // src={`https://developers.themoviedb.org/${backdrop_path}`}
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={title}
            className="image_size"
          />
        </div>
        <div>
          <h1 className="h3">{title}</h1>
          <div className="d-flex align-items-center mt-2 ">
            <h1 className="h6 m-0">RELEASE DATE : </h1>
            <p className="h6 m-0 text-secondary"> {release_date}</p>
          </div>
          <div className="d-flex align-items-center mt-2">
            <h1 className="h6 m-0">RATING : </h1>
            <p className="h6 m-0 text-secondary"> {vote_average}</p>
          </div>
          <p className="text-secondary mt-2">{overview}</p>
        </div>
      </div>
    </li>
  );
};

export default MovieItem;
