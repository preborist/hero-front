import http from '../http-common';

class HeroesDataServices {
  getAll() {
    return http.get('/heroes');
  }

  get(id) {
    return http.get(`/heroes/${id}`);
  }

  create(data) {
    return http.post('/heroes', data);
  }

  update(id, data) {
    return http.put(`/heroes/${id}`, data);
  }

  delete(id) {
    return http.delete(`/heroes/${id}`);
  }
}

export default new HeroesDataServices();
