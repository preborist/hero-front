import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import ReactPaginate from 'react-paginate';

import Loader from '../Loader';
import HeroesDataServices from '../../services/heroes.service';
import defaultImage from './default.jpg';
import './HeroesList.scss';

const HeroesList = () => {
  const PAGE_SIZE = 5;
  let history = useHistory();
  const [heroesList, setHeroesList] = useState([]);
  const [currentPage, setPage] = useState(0);
  const [pageCount, setPageCount] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handlePageClick = ({ selected }) => {
    setPage(selected);
  };

  const retrieveHeroesList = () => {
    setIsLoading(true);
    HeroesDataServices.getAll()
      .then(response => {
        setHeroesList(response.data.data);
        setPageCount(response.data.data.length / PAGE_SIZE);
      })
      .catch(e => {
        console.log(e);
      })
      .finally(setIsLoading(false));
  };

  const displayData = _.chunk(heroesList, PAGE_SIZE)[currentPage];

  useEffect(() => {
    retrieveHeroesList();
  }, []);

  return (
    <div>
      {isLoading && <Loader />}
      <h2>Heroes List</h2>
      <ul className="list-group ">
        {displayData &&
          displayData.map(hero => (
            <li
              className="list-group-item list-group-item-action"
              key={hero.id}
              onClick={() => {
                history.push(`/heroes/${hero.id}`);
              }}
            >
              <div
                className="card "
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Сlick to see detailed info or edit"
              >
                <img
                  src={
                    hero.images[0]
                      ? `http://localhost:3000/${hero.images[0].filename}`
                      : defaultImage
                  }
                  className="card-img-top img-thumbnail"
                  alt={hero.nickname}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    Hero Nickname: {hero.nickname.toUpperCase()}
                  </h5>
                </div>
              </div>
            </li>
          ))}
      </ul>
      {heroesList.length > 5 && (
        <ReactPaginate
          containerClassName="pagination mt-3 justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          activeClassName="active"
          previousClassName="page-item"
          nextClassName="page-item"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
        />
      )}
    </div>
  );
};

export default HeroesList;
