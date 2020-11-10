const {
  validationResult
} = require('express-validator/check');

const Cake = require('../models/cake');

const constants = require('../util/constants');
const specificFieldsNotSet = {
  updatedAt: 0,
  __v: 0,
  createdAt: 0
};

exports.getCakes = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 10;
  let totalItems;

  try {
    totalItems = await Cake.find().countDocuments();
    const cakes = await Cake.find({}, specificFieldsNotSet)
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res
      .status(constants.STATUS_CODE_OK)
      .json({
        data: cakes,
        totalItems: totalItems
      });
  } catch (err) {
    err = setCatchError(err);
    next(err);
  }
};

exports.createCake = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = setError(constants.DATA_VALIDATION_FAILED, constants.STATUS_CODE_UNPROCESSABLE_ENTITY);
    throw error;
  }

  const name = req.body.name;
  const price = req.body.price;
  const flavors = req.body.flavors;

  const cake = new Cake({
    name: name,
    price: price,
    flavors: flavors
  });

  try {
    const result = await cake.save();
    res.status(constants.STATUS_CODE_CREATED).json({
      data: result
    });
  } catch (err) {
    err = setCatchError(err);
    next(err);
  }
};

exports.getCake = async (req, res, next) => {
  const name = req.params.name;

  const cake = await Cake.findOne({
    name: name
  }, specificFieldsNotSet);
  try {
    if (!cake) {
      const error = setError(constants.DATA_NOT_FOUND, constants.STATUS_CODE_NOT_FOUND);
      throw error;
    }
    res.status(constants.STATUS_CODE_OK).json({
      data: cake
    });
  } catch (err) {
    err = setCatchError(err);
    next(err);
  }
};

exports.updateCake = async (req, res, next) => {
  const searchName = req.params.name;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = setError(constanst.DATA_VALIDATION_FAILED, constants.STATUS_CODE_UNPROCESSABLE_ENTITY);
    throw error;
  }

  const name = req.body.name;
  const price = req.body.price;
  const flavors = req.body.flavors;

  try {
    const cake = await Cake.findOne({
      name: searchName
    });
    if (!cake) {
      const error = setError(constants.DATA_NOT_FOUND, constants.STATUS_CODE_NOT_FOUND);
      throw error;
    }
    cake.name = name || cake.name;
    cake.price = price || cake.price;
    cake.flavors = flavors || cake.flavors;
    const result = await cake.save();
    res.status(constants.STATUS_CODE_OK).json({
      message: constants.DATA_UPDATEP,
      data: result
    });
  } catch (err) {
    err = setCatchError(err);
    next(err);
  }
};

exports.deleteCake = async (req, res, next) => {
  const name = req.params.name;

  try {
    const cake = await Cake.findOne({
      name: name
    });

    if (!cake) {
      const error = setError(constants.DATA_NOT_FOUND, constants.STATUS_CODE_NOT_FOUND);
      throw error;
    }

    await Cake.findByIdAndRemove(cake._id);
    res.status(constants.STATUS_CODE_OK).json({
      message: constants.DATA_DELETED
    });
  } catch (err) {
    err = setCatchError(err);
    next(err);
  }
};

const setError = (errorString, statusCode) => {
  const error = new Error(errorString);
  error.statusCode = statusCode;
  return error;
};

const setCatchError = (err) => {
  if (!err.statusCode) {
    err.statusCode = constants.STATUS_CODE_INTERNAL_SERVER_ERROR;
  }

  return err;
}