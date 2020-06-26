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
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);

    res.json(addedPatient);
  } catch(error) {
    const { message } = error as Error;
    res.status(404).json({ error: message });
  }
});

router.post('/:id/entries', (req, res) => {
  const patient = patientService.findPatientById(req.params.id);

  if (patient) {
    try {
      const newPatientEntry = toNewPatientEntry(req.body);

      const updatedPatient = patientService.addPatientEntry(patient, newPatientEntry);

      res.json(updatedPatient);
    } catch(error) {
      const { message } = error as Error;
      res.status(404).json({ error: message });
    }
  } else {
    const error = 'Patient doesn\'t exist';
    res.status(404).json({ error });
  }
});

export default router;
