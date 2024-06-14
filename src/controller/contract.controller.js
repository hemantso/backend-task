const httpStatus = require('http-status');

const ContractService = require('../services/contract.service');

const getContractById = async (req, res) => {
  try {
    const contract = await ContractService.getContractById(req);
    if (!contract) {
      res.sendStatus(httpStatus.NOT_FOUND);
    } else {
      res.status(httpStatus.OK).json(contract);
    }
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error });
  }
};

module.exports = {
  getContractById,
};