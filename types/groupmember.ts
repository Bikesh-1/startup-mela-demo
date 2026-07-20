export type GroupMember = {
  id: string;
  user: {
    coustumerId: string;
    userdetails: {
      name: string;
      profilephoto?: string;
    };
  };
};