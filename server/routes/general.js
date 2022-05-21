const express = require('express');
const router = express.Router();

const { Census } = require('../models/Census');
const { Office } = require('../models/Office');

// Census request handlers
router.get('/states', async (req, res) => {
    const states = await Census.collection.distinct('state');
    res.send(states);
});

router.post('/districts', async (req, res) => {
    const districts = await Census.collection.distinct('district', { state: req.body.state });
    res.send(districts);
});

router.post('/subDistricts', async (req, res) => {
    const subDistricts = await Census.collection.distinct('subDistrict', { state: req.body.state, district: req.body.district });
    res.send(subDistricts);
});

// office request handler
router.post('/offices', async (req, res) => {
    const offices = await Office.find({ state: req.body.state, district: req.body.district, subDistrict: req.body.subDistrict }).exec();
    res.send(offices);
});

router.post('/getoffice', async (req, res) => {
    const { officeId } = req.body;
    const office = await Office.findOne({ officeId }).exec();
    res.send(office);
});

module.exports = router;