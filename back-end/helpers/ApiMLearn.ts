import axios, { AxiosResponse } from 'axios';

class ApiMLearn {
  private host: string;
  private token: string;
  private serviceId: string;
  private groupId: string;

  constructor(token: string, serviceId: string, groupId: string) {
    this.host = 'https://api.mlearn.mobi/';
    this.token = token;
    this.serviceId = serviceId;
    this.groupId = groupId;
    this.constructHeaders();
  }

  private constructHeaders() {
    axios.defaults.headers.common['Authorization'] = this.token;
    axios.defaults.headers.common['service-id'] = this.serviceId;
    axios.defaults.headers.common['app-users-group-id'] = this.groupId;
  }

  private async handleResponse(response: AxiosResponse) {
    if (response.data) {
      return response.data;
    };
    const { config, ...necessaryInfos } = response;
    return {
      ...necessaryInfos,
    };
  }

  public async post(newUser: INewUserMLearn) {
    return axios({
      method: 'POST',
      url: `${this.host}/integrator/${this.serviceId}/users`,
      data: newUser
    })
      .then(this.handleResponse)
      .catch(this.handleResponse);
  }

  public async put(id: string, action: Action) {
    return axios({
      method: 'PUT',
      url: `${this.host}/integrator/${this.serviceId}/users/${id}/${action}`,
    })
      .then(this.handleResponse)
      .catch(this.handleResponse);
  }

}

export default ApiMLearn;
