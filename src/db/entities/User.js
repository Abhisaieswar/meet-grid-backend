module.exports = {
  name: "User",
  id: {
    primary: true,
    type: "int",
    generated: true,
  },
  name: {
    type: "varchar",
    maxLength: 255,
  },
  password: {
    type: "varchar",
    maxLength: 255,
  },
};
