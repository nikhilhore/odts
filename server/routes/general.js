const express = require('express');
const router = express.Router();

const Census = require('../models/Census');
const Office = require('../models/Office');

// Census request handlers
router.get('/states', async (req, res) => {
    try {
        const states = await Census.collection.distinct('state');
        res.send(states);
    } catch (err) {
        res.send({ status: 'failed', message: err.message || "Something went wrong, please try again." });
    }
});

router.post('/districts', async (req, res) => {
    try {
        const districts = await Census.collection.distinct('district', { state: req.body.state });
        res.send(districts);
    } catch (err) {
        res.send({ status: 'failed', message: err.message || "Something went wrong, please try again." });
    }
});

router.post('/subDistricts', async (req, res) => {
    try {
        const subDistricts = await Census.collection.distinct('subDistrict', { state: req.body.state, district: req.body.district });
        res.send(subDistricts);
    } catch (err) {
        res.send({ status: 'failed', message: err.message || "Something went wrong, please try again." });
    }
});

// office request handler
router.post('/offices', async (req, res) => {
    try {
        const offices = await Office.find({ state: req.body.state, district: req.body.district, subDistrict: req.body.subDistrict }).exec();
        res.send(offices);
    } catch (err) {
        res.send({ status: 'failed', message: err.message || "Something went wrong, please try again." });
    }
});

router.post('/getoffice', async (req, res) => {
    try {
        const { officeId } = req.body;
        const office = await Office.findOne({ officeId }).exec();
        res.send(office);
    } catch (err) {
        res.send({ status: 'failed', message: err.message || "Something went wrong, please try again." });
    }
});

module.exports = router;