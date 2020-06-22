import express from 'express';
import patientService from '../services/patientService';
import { toNewPatient, toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientService.getPublicPatientList());
});

router.get('/:id', (req, res) => {
    const patient = patientService.findPatientById(req.params.id);

    if (patient) {
        res.json(patient);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', (req, res) => {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);

    res.json(addedPatient);
});

router.post('/:id/entries', (req, res) => {
  const patient = patientService.findPatientById(req.params.id);

  if (patient) {
    const newPatientEntry = toNewPatientEntry(req.body);
    console.log(newPatientEntry);

    const addedPatientEntry = patientService.addPatientEntry(patient, newPatientEntry);

    res.json(addedPatientEntry);
    // res.json(newPatientEntry);
  } else {
    res.sendStatus(404);
  }
});

export default router;
