import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const AddHero = () => {
  const { register, handleSubmit } = useForm();
  let history = useHistory();

  const onSubmit = async data => {
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
        history.push('/heroes');
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      <div>
        <h1>Add New Hero</h1>
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
