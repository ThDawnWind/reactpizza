interface ITotalPrice {
  price: number;
  count: number;
}

export const calcTotalPrice = (items: ITotalPrice[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};