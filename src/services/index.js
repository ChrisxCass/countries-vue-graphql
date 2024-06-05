import unplashApi from './axios';


class Service {

  async getImages(params) {
    try {
      const { data } = await unplashApi.get(`/search/photos?query=${params.country}`);
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default new Service();