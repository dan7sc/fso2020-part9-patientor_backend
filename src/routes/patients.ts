import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientService.getPublicEntries());
});

router.get('/:id', (req, res) => {
    const patient = patientService.findById(req.params.id);

    if (patient) {
        res.json(patient);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedPatientEntry = patientService.addEntry(newPatientEntry);

    res.json(addedPatientEntry);
});

export default router;
