import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toastr from 'toastr';
import HeroesDataServices from '../../services/heroes.service';
import './Hero.scss';
import Loader from '../Loader';

toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: false,
  positionClass: 'toast-top-right',
  preventDuplicates: false,
  onclick: null,
  showDuration: '300',
  hideDuration: '1000',
  timeOut: '5000',
  extendedTimeOut: '1000',
  showEasing: 'swing',
  hideEasing: 'linear',
  showMethod: 'fadeIn',
  hideMethod: 'fadeOut',
};

const Hero = () => {
  const [currentHero, setCurrentHero] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();
  let { id } = useParams();
  const { register, handleSubmit } = useForm();

  const retrieveHero = id => {
    setIsLoading(true);
    HeroesDataServices.get(id)
      .then(response => {
        setCurrentHero(response.data.data.hero);
      })
      .catch(e => {
        console.log(e);
      })
      .finally(setIsLoading(false));
  };

  const deleteHero = () => {
    setIsLoading(true);
    HeroesDataServices.delete(id)
      .then(response => {
        history.push('/heroes');
        toastr['success']('deleted');
      })
      .catch(e => {
        console.log(e);
      })
      .finally(setIsLoading(false));
  };

  useEffect(() => {
    retrieveHero(id);
  }, [id]);

  const onSubmit = data => {
    setIsLoading(true);
    HeroesDataServices.update(id, data)
      .then(response => {
        setCurrentHero(response.data.data.hero);
        toastr['success']('success');
      })
      .catch(e => {
        console.log(e);
      })
      .finally(setIsLoading(false));
  };

  return (
    <div>
      {isLoading && <Loader />}
      {currentHero ? (
        <div>
          <h1>Update Hero spec</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">
                Nickname
                <input
                  className="form-control"
                  type="text"
                  defaultValue={currentHero.nickname}
                  {...register('nickname', { required: true })}
                />
              </label>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Real Name
                <input
                  className="form-control"
                  type="text"
                  defaultValue={currentHero.real_name}
                  {...register('real_name', { required: true })}
                />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="origin_description" className="form-label">
                Description
              </label>
              <textarea
                id="origin_description"
                className="form-control"
                type="text"
                rows="3"
                defaultValue={currentHero.origin_description}
                {...register('origin_description')}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="superpowers" className="form-label">
                Super powers
              </label>
              <textarea
                rows="1"
                id="superpowers"
                className="form-control"
                type="text"
                defaultValue={currentHero.superpowers}
                {...register('superpowers')}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="catch_phrase" className="form-label">
                Catch phrase
              </label>
              <textarea
                rows="1"
                id="catch_phrase"
                className="form-control"
                type="text"
                defaultValue={currentHero.catch_phrase}
                {...register('catch_phrase')}
              />
            </div>
            <input
              className="btn btn-primary"
              type="submit"
              value="Update info"
            />
          </form>
          <button className="btn btn-danger mt-2 mb-2" onClick={deleteHero}>
            Delete Hero Card from Database
          </button>
          <ul className="list-group hero-gallery flex-wrap">
            {currentHero.images.length > 0
              ? currentHero.images.map(image => (
                  <li
                    key={image.filename}
                    className="list-group-item gallery-item"
                  >
                    <img
                      src={`http://localhost:3000/${image.filename}`}
                      className="card-img-top "
                      alt={image.nickname}
                    />
                  </li>
                ))
              : null}
          </ul>
        </div>
      ) : (
        <div>
          <p>Please click on Hero</p>
        </div>
      )}
    </div>
  );
};
export default Hero;
