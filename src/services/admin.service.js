const { Op } = require('sequelize');

const getBestProfession = async (req) => {
  const { Job, Contract, Profile } = req.app.get('models');
  const { start, end } = req.query;
  const sequelize = req.app.get('sequelize');

  const bestProfessions = await Job.findAll({
    where: {
      paid: true,
      paymentDate: {
        [Op.between]: [new Date(start), new Date(end)],
      },
    },
    include: [
      {
        model: Contract,
        include: [{ model: Profile, as: 'Contractor' }],
      },
    ],
    attributes: [
      [sequelize.fn('SUM', sequelize.col('price')), 'total'],
      'Contract.Contractor.profession',
    ],
    group: ['Contract.Contractor.profession'],
    order: [[sequelize.literal('total'), 'DESC']],
    limit: 1,
  });

  return bestProfessions[0] ? bestProfessions[0].Contract.Contractor.profession : null;;
};

const getBestClients = async (req) => {
  const { Job, Contract, Profile } = req.app.get('models');
  const { start, end, limit = 2} = req.query;
  const sequelize = req.app.get('sequelize');

  const clients = await Job.findAll({
    where: {
      paid: true,
      paymentDate: {
        [Op.between]: [new Date(start), new Date(end)],
      },
    },
    include: [
      {
        model: Contract,
        include: [{ model: Profile, as: 'Client' }],
      },
    ],
    attributes: [
      [sequelize.fn('SUM', sequelize.col('price')), 'total'],
      'Contract.Client.id',
      'Contract.Client.firstName',
      'Contract.Client.lastName',
    ],
    group: ['Contract.Client.id'],
    order: [[sequelize.literal('total'), 'DESC']],
    limit: parseInt(limit, 10),
  });

  return clients.map((client) => ({
    id: client.Contract.Client.id,
    fullName: `${client.Contract.Client.firstName} ${client.Contract.Client.lastName}`,
    paid: client.dataValues.total,
  }));
};

module.exports = {
  getBestProfession,
  getBestClients
};
