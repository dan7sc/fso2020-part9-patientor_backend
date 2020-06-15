/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import crypto from 'crypto';
import { NewPatientEntry } from './types';

export const toNewPatientEntry = (object: any | string): NewPatientEntry => {
    const { name, dateOfBirth, ssn, gender, occupation } = object;

    const newEntry: NewPatientEntry = {
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    };

    return newEntry;
};

export const generateUUID = (): string => {
    const uuid1: string = crypto.randomBytes(4).toString("hex");
    const uuid2: string = crypto.randomBytes(2).toString("hex");
    const uuid3: string = crypto.randomBytes(2).toString("hex");
    const uuid4: string = crypto.randomBytes(2).toString("hex");
    const uuid5: string = crypto.randomBytes(6).toString("hex");

    return uuid1 + '-' + uuid2 + '-' + uuid3 + '-' + uuid4 + '-' + uuid5;
};
