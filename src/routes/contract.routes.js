const express = require('express');

const { getContractById, getNonTerminatedContracts } = require('../controller/contract.controller');
const { getProfile } = require('../middleware/getProfile');

const contractRouter = express.Router();

contractRouter.get('/', getProfile, getNonTerminatedContracts);
contractRouter.get('/:id', getProfile, getContractById);

module.exports = contractRouter;
