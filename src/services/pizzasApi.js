import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, order, category, search, currentPage, limit } = params;

    const { data } = await axios.get(`https://66ddb903f7bcc0bbdcded4d8.mockapi.io/api/pizzas`, {
      params: _.pickBy(
        {
          page: currentPage,
          limit,
          category,
          sortBy,
          order,
          search,
        },
        _.identity,
      ),
    })
    .catch(err => {
      throw new Error('Failed  to fetch pizzas');
    });

    return data;
  },
);
