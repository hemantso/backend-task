const { Op } = require('sequelize');

const getContractById = async (req) => {
  const { Contract, Profile } = req.app.get('models');
  const profileId = req.profile.id;
  const contractId = req.params.id;
  
  return await Contract.findOne({
    where: { id: contractId },
    include: [
      { model: Profile, as: 'Client', attributes: ['id'] },
      { model: Profile, as: 'Contractor', attributes: ['id'] }
    ]
  }).then(contract => {
    if (contract && (contract.Client.id === profileId || contract.Contractor.id === profileId)) {
      return contract;
    }
    return null;
  });
};

const getNonTerminatedContracts = async (req) => {
  const { Contract } = req.app.get('models');
  const profileId = req.profile.id;

  const contracts = await Contract.findAll({
    where: {
      [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
      status: {
        [Op.ne]: 'terminated',
      },
    },
  });
  return contracts;
};

module.exports = { getContractById, getNonTerminatedContracts };
