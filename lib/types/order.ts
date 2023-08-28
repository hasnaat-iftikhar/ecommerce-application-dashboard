type OrderType = {
  id: string;
  product: string;
  date: string;
  customer: string;
  status: "delivered" | "canceled" | "on way";
  amount: number;
};

export default OrderType;
