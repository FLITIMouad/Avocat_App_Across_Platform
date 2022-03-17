import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isadmin: true,
  },
  {
    name: "Mouad Fliti",
    email: "Mouad@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Nisrine OUASTI",
    email: "Nisrine@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Oussama Houmada",
    email: "Oussama@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
