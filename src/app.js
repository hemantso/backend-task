const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./model');
const {getProfile} = require('./middleware/getProfile');
const contractRoutes = require( './routes/contract.routes');
const jobRoutes = require( './routes/job.routes');
const profileRoutes = require( './routes/profile.routes');
const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize)
app.set('models', sequelize.models)

/**
 * FIX ME!
 * @returns contract by id
 */
app.use('/contracts', contractRoutes);
app.use('/jobs', jobRoutes);
app.use('/balances', profileRoutes);

module.exports = app;
