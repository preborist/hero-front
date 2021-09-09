import { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import HeroesDataServices from '../../services/heroes.service';

const AddHero = () => {
  const { register, handleSubmit, errors } = useForm();
  let history = useHistory();
  const [currentHero, setCurrentHero] = useState(null);
  const saveHero = () => {
    HeroesDataServices.create();
  };

  const onSubmit = data => {
    HeroesDataServices.create(data)
      .then(response => {
        console.log('data hero create: ', response);
        setCurrentHero({ ...response });
        history.push('/');
      })
      .catch(e => {
        console.log(e);
      });
    console.log('data: ', data);
  };

  return (
    <div>
      <div>
        <h1>Add New Hero</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">
              Nickname
              <input
                className="form-control"
                type="text"
                {...register('nickname')}
              />
            </label>
          </div>

          <div className="mb-3">
            <label className="form-label">
              Real Name
              <input
                className="form-control"
                type="text"
                {...register('real_name')}
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
              {...register('catch_phrase')}
            />
          </div>

          <input className="btn btn-primary" type="submit" value="Create" />
        </form>
      </div>
      <div></div>
    </div>
  );
};
export default AddHero;
