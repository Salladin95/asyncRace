import { Icar, IWinner } from '../../system/contracts';

export function makeRequest(code: number, url = '', options = {}, baseURL = 'http://127.0.0.1:3000/') {
  return fetch(baseURL + url, options).then((response) => {
    if (response.status === code) {
      return response.json();
    }

    return response.text().then((text) => {
      throw new Error(text);
    });
  });
}

export const requestForCreateCar = (name: string, color: string): Promise<Icar> => {
  const body = JSON.stringify({ name, color });

  return makeRequest(201, 'garage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body,
  });
};

export const engine = (id: number, status: 'started' | 'stopped' | 'drive') => {
  return makeRequest(200, `engine?id=${id}&status=${status}`, {
    method: 'PATCH',
  });
};

export const selectRequest = (id: number): Promise<Icar> => {
  return makeRequest(200, `garage/${id}`, {
    method: 'GET',
  });
};

export const updateRequest = (id: number, name: string, color: string): Promise<Icar> => {
  const body = JSON.stringify({ name, color });
  return makeRequest(200, `garage/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body,
  });
};

export const deleteRequest = (id: number) => {
  return makeRequest(200, `garage/${id}`, {
    method: 'DELETE',
  });
};

export const getCarsRequest = (page?: number, limit?: number): Promise<Icar[]> => {
  return makeRequest(200, `garage?page=${page}&limit=${limit}`, {
    method: 'GET',
  });
};

export const createWinnerRequest = (
  id: number,
  wins: number,
  time:number,
): Promise<IWinner> => {
  const body = JSON.stringify({ id, wins, time });
  return makeRequest(201, 'winners', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body,
  });
};

export const updateWinnerRequest = (
  id: number,
  wins: number,
  time:number,
): Promise<IWinner> => {
  const body = JSON.stringify({ id, wins, time });
  return makeRequest(200, `winners/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body,
  });
};

export const getWinnerRequest = (id: number): Promise<IWinner> => {
  return makeRequest(200, `winners/${id}`, {
    method: 'GET',
  });
};

export const getWinnersRequest = (): Promise<IWinner[]> => {
  return makeRequest(200, 'winners', {
    method: 'GET',
  });
};
