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

const addPatientEntry = (patient: Patient, entry: NewEntry): Entry => {
  // let newPatientEntry;

  // switch(entry.type) {
  //     case 'Hospital':

  //       newPatientEntry = {
  //         id: generateUUID(),
  //         ...entry,
  //         discharge: entry.discharge
  //       };
  //       break;
  //     case 'HealthCheck':
  //       newPatientEntry = {
  //         id: generateUUID(),
  //         ...entry,
  //         healthCheckRating: entry.healthCheckRating
  //       };
  //       break;
  //     case 'HealthCheck':
  //       newPatientEntry = {
  //         id: generateUUID(),
  //         ...entry,
  //         employerName: entry.employerName,
  //         sickLeave: entry.sickLeave
  //       };
  //       break;
  //   default:
  //     throw new Error('Error: invalid entry');
  // }

  const newPatientEntry = {
    id: generateUUID(),
    ...entry
  };

  console.log(patient);

  // const updatedPatient = {
  //   ...patient,
  //   entries: patient.entries.concat(newPatientEntry)
  // };

  // patients.find(patient => patient.id === id).push(newPatientEntry);
  return newPatientEntry;
};

export default {
    getPatientList,
    getPublicPatientList,
    findPatientById,
    addPatient,
    addPatientEntry
};
