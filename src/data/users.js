const users = [
  {
    email: "mhn048c@gmail.com",
    password: "password"
  },
  {
    email: "user2@email.com",
    password: "password"
  },
  {
    email: "user3@email.com",
    password: "password"
  }
]

export const getUserByEmail = (email) => {
  const found = users.find(user => user.email === email);
  return found;
}