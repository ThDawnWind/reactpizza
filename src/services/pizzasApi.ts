import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import _ from 'lodash';

interface IFetchPizzasParams {
  sortBy: string;
  category: number | null; 
  order: 'asc' | 'desc';
  currentPage: number;
  limit: number;
  search: string;
}

interface IPizza {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
  description: string;
}

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async ({ sortBy, category, order, currentPage, limit, search }: IFetchPizzasParams) => {
    try {
      const { data } = await axios.get<IPizza[]>('https://66ddb903f7bcc0bbdcded4d8.mockapi.io/api/pizzas', {
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
      });
      
      return data;
    } catch (err) {
      throw new Error(`Failed to fetch pizzas. Error: ${err}`);
    }
  }
);
