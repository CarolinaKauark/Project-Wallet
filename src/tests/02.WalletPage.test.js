import React from 'react';
import { screen } from '@testing-library/react';
import { response as mockData } from './mocks/mockData';
import App from '../App';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndStore } from './helpers/testConfig';

import { EMAIL_INPUT_TEST_ID } from './helpers/constants';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(mockData),
    }));
};

describe('2 - Crie uma página para sua carteira com as seguintes características:', () => {
  beforeEach(mockFetch);
  afterEach(() => jest.clearAllMocks());
  
  test('A rota para esta página deve ser \'/carteira\'', () => {
    const { history } = renderWithRouterAndStore(<App />);
    history.push('/carteira');
    const email = screen.queryByTestId(EMAIL_INPUT_TEST_ID);
    expect(email).toBeNull();
  });

  test('O componente deve se chamar Wallet e estar localizado na pasta "src/pages"', () => {
    const { container } = renderWithRouterAndStore(<Wallet />, '/carteira', {});
    expect(container).toBeDefined();
  });
});
