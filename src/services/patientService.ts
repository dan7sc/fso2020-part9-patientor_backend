import patients from '../../data/patients';
import { generateUUID } from '../utils';

import {
  Patient, NewPatient, PublicPatient, Entry, NewEntry
} from '../types';

let patientList: Patient[] = [...patients];

const getPatientList = (): Array<Patient> => {
    return patientList;
};

const findPatientById = (id: string): Patient | undefined => {
    const entry = patientList.find(patient => patient.id === id);
    return entry;
};

const getPublicPatientList = (): Array<PublicPatient> => {
    return patientList.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
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

    patientList.push(newPatient);
    return newPatient;
};

const addPatientEntry = (patient: Patient, entry: NewEntry): NewEntry => {
    const newPatientEntry = {
        id: generateUUID(),
            ...entry
        };

    const updatedPatient = {
        ...patient,
        entries: patient.entries.concat(newPatientEntry as Entry)
    };

    patientList = patientList.map(patient => (
        patient.id === updatedPatient.id ? updatedPatient : patient
    ));

    return newPatientEntry;
};

export default {
    getPatientList,
    getPublicPatientList,
    findPatientById,
    addPatient,
    addPatientEntry
};
