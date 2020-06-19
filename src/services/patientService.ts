import patients from '../../data/patients';
import { generateUUID } from '../utils';

import {
    Patient, NewPatient, PublicPatient
} from '../types';

const getEntries = (): Array<Patient> => {
    return patients;
};

const findById = (id: string): Patient | undefined => {
    const entry = patients.find(patient => patient.id === id);
    return entry;
};

const getPublicEntries = (): Array<PublicPatient> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const addEntry = (entry: NewPatient): Patient => {
    const newPatient = {
        id: generateUUID(),
        ...entry
    };

    patients.push(newPatient);
    return newPatient;
};

export default {
    getEntries,
    getPublicEntries,
    findById,
    addEntry
};
