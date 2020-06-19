import diagnosis from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getEntries = (): Array<Diagnosis> => {
    return diagnosis;
};

export default {
    getEntries
};
