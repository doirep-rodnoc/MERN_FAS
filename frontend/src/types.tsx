export type actionType = {
  type: string;
  payload: any;
};

export type userType = {
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  imagePath: string;
  books: string[];
};

export type statetype = {
  user: userType | null;
  isFetching: boolean;
  error: any;
};

export type transactionProps = {
  _id: string;
  date: Date;
  title: string;
  amount: number;
  description: string;
  recordedBy: string;
  book: string;
  isPending: boolean;
};

export type bookType = {
  _id: string;
  date: Date;
  title: string;
  totalAmount: number;
  usedAmount: number;
  incomeAmount: number;
  description: string;
  adminUser: string[];
  nomalUser: string[];
}
