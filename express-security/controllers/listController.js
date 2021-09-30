const { List, User } = require('../models');
const jwt = require('jsonwebtoken');

exports.getAllLists = async (req, res, next) => {
  try {
    const lists = await List.findAll({
      where: {
        userId: req.user.id,
      },
    });
    res.status(200).json({ lists });
  } catch (error) {
    next(error);
  }
};

exports.getListById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const list = await List.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });
    res.status(200).json({ list });
  } catch (error) {
    next(error);
  }
};

exports.createList = async (req, res, next) => {
  try {
    const { title, status } = req.body;
    const list = await List.create({
      title,
      status,
      userId: req.user.id,
    });
    res.status(201).json({ list });
  } catch (error) {
    next(error);
  }
};

exports.updateList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, status } = req.body;
    // const rows[0] = await List.update({
    const [rows] = await List.update(
      {
        title,
        status,
      },
      {
        where: {
          id,
          userId: req.user.id,
        },
      }
    );
    if (rows === 0) {
      res.status(404).json({
        message: 'List not found',
      });
    }
    res.status(200).json({
      message: 'List updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await List.destroy({
      where: {
        id,
        userId: req.user.id,
      },
    });
    if (rows === 0) {
      res.status(404).json({
        message: 'fail to delete list',
      });
    }
    res.status(200).json({
      message: 'List deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
