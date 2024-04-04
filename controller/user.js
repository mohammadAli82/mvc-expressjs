const fs = require("fs");
const data = JSON.parse(fs.readFileSync("db.json", "UTF-8"));
const user = data.user;

module.exports.createUser = (req, res) => {
  console.log(req.body);
  user.push(req.body);
  res.status(201).json(req.body);
};
module.exports.getAllUser = (req, res) => {
  res.json(user);
};
module.exports.getUser = (req, res) => {
  const id = +req.params.id;
  const userFind = user.find((user) => user.id === id);
  if (userFind) {
    res.json(userFind);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
};

module.exports.replaceUser = (req, res) => {
  const id = +req.params.id;
  const userIndex = user.findIndex((p) => p.id === id);
  user.splice(userIndex, 1, { ...req.body, id: id });
  res.status(201).json();
};
module.exports.updateUser = (req, res) => {
  const id = +req.params.id;
  const userIndex = user.findIndex((p) => p.id === id);
  user.splice(userIndex, 1, { ...req.body, id: id });
  res.status(201).json();
};
module.exports.deleteUser = (req, res) => {
  const id = +req.params.id;
  const userIndex = user.findIndex((p) => p.id === id);
  if (userIndex !== -1) {
    const deletedUser = user.splice(userIndex, 1);
    res.status(200).json(deletedUser);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
};
