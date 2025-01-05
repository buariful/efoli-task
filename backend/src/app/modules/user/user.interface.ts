export type TUserCreate = {
  first_name: string;
  last_name?: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN" | "EXECUTIVE";
};
