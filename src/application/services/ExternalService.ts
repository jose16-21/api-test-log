import axios from 'axios';

export class ExternalService {
  async getPost(id: number): Promise<any> {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return response.data;
  }
}