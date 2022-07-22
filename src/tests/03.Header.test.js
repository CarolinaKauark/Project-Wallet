import React from 'react';
import { screen } from '@testing-library/react';
import { response as mockData, initialStateHeader } from './mocks/mockData';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndStore } from './helpers/testConfig';

import { TOTAL_FIELD_TEST_ID } from './helpers/constants';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(mockData),
    }));
};

describe('3 - Crie um header para a página de carteira contendo as seguintes características:', () => {
  beforeEach(mockFetch);
  afterEach(() => jest.clearAllMocks());

  const initial = initialStateHeader;

  test('Um elemento que exiba o email do usuário que fez login.', () => {
    const { store } = renderWithRouterAndStore(<Wallet />, '/carteira', initial);
    const emailField = screen.getByTestId('email-field');

    expect(emailField.innerHTML).not.toBe('');
    expect(emailField).toContainHTML(store.getState().user.email);
  });

  test('Crie um campo com a despesa total gerada pela lista de gastos.', () => {
    renderWithRouterAndStore(<Wallet />, '/carteira', initial);
    const totalField = screen.getByTestId(TOTAL_FIELD_TEST_ID);

    const INITIAL_VALUE = 0;
    expect(totalField).toContainHTML(INITIAL_VALUE);
  });

  test('Crie um campo que mostre que qual câmbio está sendo utilizado, que será neste caso \'BRL\'', () => {
    renderWithRouterAndStore(<Wallet />, '/carteira');
    const exchangeField = screen.getByTestId('header-currency-field');

    expect(exchangeField).toBeInTheDocument();
    expect(exchangeField).toContainHTML('BRL');
  });
});
