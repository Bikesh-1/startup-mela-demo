export type Activity = {
  id: string;
  amount: string;
  month: string;
  user: {
    coustumerId: string;
    userdetails: {
      name: string;
      profilephoto?: string;
    };
  }
}