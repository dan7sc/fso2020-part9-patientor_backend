import patients from '../../data/patients';
import { generateUUID } from '../utils';

import {
  Patient, NewPatient, PublicPatient, Entry, NewEntry
} from '../types';

const getPatientList = (): Array<Patient> => {
  return patients;
};

const findPatientById = (id: string): Patient | undefined => {
  const entry = patients.find(patient => patient.id === id);
  return entry;
};

const getPublicPatientList = (): Array<PublicPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: generateUUID(),
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

const addPatientEntry = (patient: Patient, entry: NewEntry): Patient => {
  const newPatientEntry = {
    id: generateUUID(),
    ...entry
  } as Entry;

  const updatedPatient = {
    ...patient,
    entries: patient.entries.concat(newPatientEntry)
  };

  patients.map(element => (
    element.id === updatedPatient.id ? element.entries.push(newPatientEntry) : element
  ));

  return updatedPatient;
};

export default {
  getPatientList,
  getPublicPatientList,
  findPatientById,
  addPatient,
  addPatientEntry
};
