/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from 'crypto';
import { NewPatientEntry, Gender, Entry } from './types';

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: any): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const isSSN = (param: string): param is string => {
    const [a, b]: string[] = param.split('-');
    return !isNaN(Number(a)) && a.length === 6 && b.length === 4;
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name:');
    }
    return name;
};

const parseDateOfBirth = (dateOfBirth: any): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date');
    }
    return dateOfBirth;
};

const parseSSN = (ssn: any): string => {
    if (!ssn || !isString(ssn) || !isSSN(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};

const parseGender = (gender: any): string => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

export const toNewPatientEntry = (object: any | undefined): NewPatientEntry => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { name, dateOfBirth, ssn, gender, occupation, entries } = object;

    const newEntry: NewPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSSN(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: entries as Entry[]
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
