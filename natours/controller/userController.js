const express = require('express');
const fs = require('fs');

let users = JSON.parse(fs.readFileSync('./dev-data/data/users-simple.json'));

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    message: 'success',
    results: users.length,
    data: { users },
  });
};
exports.createUser = (req, res) => {
  const newId = users[users.length - 1].id + 1;
  const newUser = Object.assign({ id: newId }, req.body);
  users.push(newUser);

  fs.writeFile(
    './dev-data/data/users-simple.json',
    JSON.stringify(users),
    (err) => {
      if (err) {
        res.status(400).json({
          status: 'error',
          message: 'something went wrong!',
        });
      }
    }
  );

  res.status(200).json({
    status: 'success',
    data: {
      newUser,
    },
    message: 'data added succesfully',
  });
};

exports.getUser = (req, res) => {
  const id = req.params.id;
  if (id > users.length - 1) {
    return res.status(404).json({
      status: 'error',
      message: 'invalid id',
    });
  }
  const user = users.find((user) => {
    return user._id == id;
  });
  console.log(user);
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
};

exports.updateUser = (req, res) => {
  const id = req.params.id * 1;

  if (id > users.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }

  res.status(204).json({
    status: 'success',
    message: 'data updated succesfully',
  });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id * 1;
  if (id > users.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid id',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
