import patientData from '../../data/patients';

import { PatientEntry, NonSensitivePatientEntry } from '../types';

const getEntries = (): Array<PatientEntry> => {
    return patientData;
};

const getNonSensitiveEntries = (): Array<NonSensitivePatientEntry> => {
    return patientData.map(
        ({ id, name, dateOfBirth, gender, occupation }) => ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation
        })
    );
};

export default {
    getEntries,
    getNonSensitiveEntries
};
