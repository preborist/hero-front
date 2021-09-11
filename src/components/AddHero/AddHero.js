import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toastr from 'toastr';

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

const AddHero = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let history = useHistory();

  const onSubmit = async data => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('nickname', data.nickname);
    formData.append('real_name', data.real_name);
    formData.append('origin_description', data.origin_description);
    formData.append('catch_phrase', data.catch_phrase);

    for (const file of data.images) {
      formData.append('images', file);
    }

    await fetch('http://localhost:3000/api/heroes', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        toastr['success']('ulpoaded');
        history.push('/heroes');
      })
      .catch(e => {
        console.log(e);
      })
      .finally(setIsLoading(false));
  };

  return (
    <div>
      <div>
        <h1>Add New Hero</h1>
        {isLoading && <Loader />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">
              Upload Hero Images
              <input
                id="images"
                multiple
                name="images"
                className="form-control"
                type="file"
                {...register('images')}
              />
            </label>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Nickname
              <input
                className="form-control"
                type="text"
                placeholder={errors.nickname ? 'This field is required' : ''}
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
                placeholder={errors.nickname ? 'This field is required' : ''}
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
