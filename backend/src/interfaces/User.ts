export interface User {
      id: string,
      name: string,
      contact: {
        whatsapp: string,
        email: string
      }
      password: string;
};

export interface UserCrendentials {
    email: User["contact"]["email"];
    password: User["password"];
};
