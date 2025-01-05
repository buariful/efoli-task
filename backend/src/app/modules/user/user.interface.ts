export type TUserCreate = {
  first_name: string;
  last_name?: string;
  email: string;
  password: string;
  role: TUserRole;
};

export type TUserLogin = {
  email: string;
  password: string;
};

export type TUserRole = "CUSTOMER" | "ADMIN" | "EXECUTIVE";
