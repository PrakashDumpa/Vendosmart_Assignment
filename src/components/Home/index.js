import { useEffect, useState } from "react";
import "./index.css";
import MovieItem from "../MovieItem";
import Page from "../Page";

const Home = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [pageHanderList, setPageHanderList] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [searchInput, setSearchInput] = useState("Avengers");

  const getMoviesListFun = async (searchFor) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=e8ccc676e299173067a80520c1fee405&query=${searchFor}`
      );
      const data = await response.json();
      if (response.ok) {
        // console.log("Success");
        let shortedList = data.results.sort(
          (a, b) => new Date(a.release_date) - new Date(b.release_date)
        );

        setMoviesList(shortedList);
        setPageHanderList(shortedList.slice(0, 4));
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMoviesListFun(searchInput);
  }, []);

  //   console.log(moviesList);
  //   console.log("pageNationList", pageHanderList);

  const onChangeSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const onClickSearchButton = () => {
    getMoviesListFun(searchInput);
    setCurrentPageNumber(1);
  };

  const onClickEnterButton = (event) => {
    if (event.key === "Enter") {
      getMoviesListFun(event.target.value);
      setCurrentPageNumber(1);
    }
    setSearchInput(event.target.value);
  };

  const SearchingFun = () => (
    <div className="d-flex justify-content-center align-items-center mb-5">
      <p className=" text-center m-0">MOIVE NAME</p>
      <div className="form-outline col-9 ">
        <input
          type="search"
          className="form-control"
          placeholder="Search"
          onChange={onChangeSearchInput}
          onKeyDown={onClickEnterButton}
          value={searchInput}
        />
      </div>
      <button
        type="button"
        className="btn btn-dark m-0"
        onClick={onClickSearchButton}
      >
        x Search!
      </button>
    </div>
  );

  const PageNumberFun = (pageNo) => {
    setCurrentPageNumber(pageNo);
    let startIndex = pageNo * 4 - 4;
    let endIndex = pageNo * 4;
    setPageHanderList(moviesList.slice(startIndex, endIndex));
  };

  //   console.log("currentPageNumber", currentPageNumber);
  return (
    <div className="min-vh-100  d-flex flex-row justify-content-center p-4 pb-5">
      <div className=" movies_page p-3">
        {SearchingFun()}
        {pageHanderList.length > 0 ? (
          <>
            <ul className="list-unstyled">
              {pageHanderList.map((each) => (
                <MovieItem
                  key={each.id}
                  EachMovieItem={{
                    ...each,
                    vote_average: each.vote_average.toFixed(1),
                  }}
                />
              ))}
            </ul>
            <Page
              PageNumberFun={PageNumberFun}
              totalLength={moviesList.length}
              currentPageNumber={currentPageNumber}
            />
          </>
        ) : (
          <div className="h-100 d-flex flex-column justify-content-center align-items-center">
            <img
              src="https://res.cloudinary.com/dp8ggbibl/image/upload/v1675939046/Mini%20Project/search_not_found_rdbqe9.png"
              alt="Search not found"
            />
            <p className="h4 text-secondary mt-3">
              Your search for {searchInput} did not find any matches.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
