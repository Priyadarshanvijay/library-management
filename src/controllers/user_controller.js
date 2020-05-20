const User = require('../models/user');
const Issue_Request = require('../models/issue_request');
const moment = require('moment');

async function loginUser(req, res) {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.json({ user, token });
  } catch (e) {
    res.status(400).send();
  }
};

async function registerUser(req, res) {
  const user = new User(req.body);
  const noOfDays = req.body.noOfDays;
  try {
    user.validFrom = moment().toDate();
    user.validTill = moment().add(noOfDays, 'days').toDate();
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};

async function getIssuedHistory(req, res) {
  try {
    const issued_history = await Issue_Request.find({ issuer: req.user._id });
    for (let i = 0; i < issued_history.length; ++i) {
      await issued_history[i].populate('book').execPopulate();
    }
    res.json(issued_history);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
}

async function deleteIssuedHistory(req, res) {
  try {
    const req_id = req.params.id;
    const issuer_id = req.user._id;
    const issued_request = await Issue_Request.findOne({ _id: req_id, issuer: issuer_id });
    if (!issued_request) {
      throw new Error('No Such Request Found');
    }
    if(issued_request.status === 3 || issued_request.status === 1) {
      throw new Error('Cannot Delete Currently Issued books history');
    }
    const deleted_request = await Issue_Request.findOneAndDelete({ _id: req_id, issuer: issuer_id });
    res.json(deleted_request);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
}

module.exports = {
  loginUser,
  registerUser,
  getIssuedHistory,
  deleteIssuedHistory
}