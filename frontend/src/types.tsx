export type actionType = {
  type: string;
  payload: any;
};

export type userType = {
  _id: string;
  name: string;
  email: string;
  permissionLevel: string;
  createdAt: Date;
  updatedAt: Date;
  imagePath: string;
};

export type statetype = {
  user: userType | null;
  isFetching: boolean;
  error: any;
};

export type transactionProps = {
  date: Date;
  title: string;
  amount: number;
  description: string;
  recordedBy: string;
  book: string;
};
