/* eslint-disable */
import { Get, Post, Put, Delete } from "./instance";

export default {
  Login: (param: object) => Post("/auth/login", param, null),
  GetTest: (url: string) => Get(url,{},{})
};
