import patients from '../../data/patients';
import { generateUUID } from '../utils';

import {
    PatientEntry, NewPatientEntry, NonSensitivePatientEntry
} from '../types';

const getEntries = (): Array<PatientEntry> => {
    return patients;
};

const findById = (id: string): PatientEntry | undefined => {
    const entry = patients.find(patient => patient.id === id);
    return entry;
};

const getNonSensitiveEntries = (): Array<NonSensitivePatientEntry> => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
    const newPatientEntry = {
        id: generateUUID(),
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    findById,
    addEntry
};
