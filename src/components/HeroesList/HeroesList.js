import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import _ from 'lodash';
import ReactPaginate from 'react-paginate';

import HeroesDataServices from '../../services/heroes.service';

const HeroesList = () => {
  const PAGE_SIZE = 5;
  let history = useHistory();
  const [heroesList, setHeroesList] = useState([]);
  const [currentPage, setPage] = useState(0);
  const [pageCount, setPageCount] = useState();

  const handlePageClick = ({ selected }) => {
    setPage(selected);
  };

  const retrieveHeroesList = () => {
    HeroesDataServices.getAll()
      .then(response => {
        setHeroesList(response.data.data);
        setPageCount(response.data.data.length / PAGE_SIZE);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const displayData = _.chunk(heroesList, PAGE_SIZE)[currentPage];

  useEffect(() => {
    retrieveHeroesList();
    console.log('pageCount', pageCount);
  }, []);

  return (
    <div>
      <h2>Heroes List</h2>
      <ul className="list-group">
        {displayData &&
          displayData.map(hero => (
            <li
              className="list-group-item list-group-item-action "
              key={hero.id}
              onClick={() => {
                history.push(`/heroes/${hero.id}`);
              }}
            >
              <div
                className="card"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Сlick to see detailed info or edit"
              >
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{hero.nickname}</h5>
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
