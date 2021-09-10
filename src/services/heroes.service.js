import http from '../http-common';

class HeroesDataServices {
  getAll() {
    return http.get('/heroes');
  }

  get(id) {
    return http.get(`/heroes/${id}`);
  }

  create(formData) {
    return http.post('/heroes', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  update(id, data) {
    return http.put(`/heroes/${id}`, data);
  }

  delete(id) {
    return http.delete(`/heroes/${id}`);
  }
}

export default new HeroesDataServices();
