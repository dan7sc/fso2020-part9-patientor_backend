/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from 'crypto';
import {
  NewPatient, Gender, Discharge, SickLeave, HealthCheckRating,
  Entry, NewEntry, NewBaseEntry, OccupationalHealthcareEntry
} from './types';

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

const isArrayOfStrings = (param: any[]): param is string[] => {
  return param.every(
    (element: any) => (typeof element === 'string' || element instanceof String)
  );
};

const isHospitalType = (param: any): param is 'Hospital' => {
  return param === 'Hospital';
};

const isOccupationalHealthcareType = (param: any): param is 'OccupationalHealthcare' => {
  return param === 'OccupationalHealthcare';
};

const isHealthCheckType = (param: any): param is 'HealthCheck' => {
  return param === 'HealthCheck';
};

const isDischarge = (param: any): param is Discharge => {
  return Object.keys(param).includes('date') && Object.keys(param).includes('criteria');
};

const isSickLeave = (param: any): param is SickLeave => {
  return Object.keys(param).includes('startDate') && Object.keys(param).includes('endDate');
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name:');
  }
  return name;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};

const parseSSN = (ssn: any): string => {
  if (!ssn || !isString(ssn) || !isSSN(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseGender = (gender: any): Gender => {
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

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description:');
  }
  return description;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist:');
  }
  return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: any): string[] => {
  if (!Array.isArray(diagnosisCodes) || !isArrayOfStrings(diagnosisCodes)) {
    throw new Error('Incorrect or missing diagnosisCodes:');
  }
  return diagnosisCodes;
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge');
  }

  const { date, criteria } = discharge;
  if (!isDate(date) || !isString(criteria)) {
    throw new Error('Incorret or missing date or criteria in discharge');
  }

  return discharge;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sickLeave');
  }

  const { startDate, endDate } = sickLeave;
  if (!isDate(startDate) || !isDate(endDate)) {
    throw new Error('Incorrect or missing startDate or endDate in sickLeave');
  }

  return sickLeave;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing healthCheckRating');
  }
  return healthCheckRating;
};

const parseHospitalType = (hospitalType: any): 'Hospital' => {
  if (!hospitalType || !isHospitalType(hospitalType)) {
    throw new Error('Incorrect or missing type');
  }
  return hospitalType;
};

const parseOccupationalHealthcareType = (occupationalHealthcareType: any): 'OccupationalHealthcare' => {
  if (!occupationalHealthcareType || !isOccupationalHealthcareType(occupationalHealthcareType)) {
    throw new Error('Incorrect or missing type');
  }
  return occupationalHealthcareType;
};

const parseHealthCheckType = (healthCheckType: any): 'HealthCheck' => {
  if (!healthCheckType || !isHealthCheckType(healthCheckType)) {
    throw new Error('Incorrect or missing type');
  }
  return healthCheckType;
};

const assertNever = (value: any | never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const toNewPatient = (object: any | undefined): NewPatient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { name, dateOfBirth, ssn, gender, occupation, entries } = object;

  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: entries as Entry[]
  };

  return newPatient;
};

export const toNewPatientEntry = (object: any | undefined): NewEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { type, description, date, specialist, diagnosisCodes, ...otherValues } = object;

  const newPatientBaseEntry: NewBaseEntry = {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
  };

  if (diagnosisCodes) {
    newPatientBaseEntry.diagnosisCodes = parseDiagnosisCodes(diagnosisCodes);
  }

  switch(type) {
    case 'Hospital':
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { discharge } = otherValues;

      const hospitalEntry = {
        type: parseHospitalType(type),
        ...newPatientBaseEntry,
        discharge: parseDischarge(discharge)
      };

      return hospitalEntry;
    case 'OccupationalHealthcare':
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { employerName, sickLeave } = otherValues;

      const occupationalHealthcareEntry = {
        type: parseOccupationalHealthcareType(type),
        ...newPatientBaseEntry,
        employerName: parseName(employerName),
      } as OccupationalHealthcareEntry;

      if (sickLeave) {
        occupationalHealthcareEntry.sickLeave = parseSickLeave(sickLeave);
      }

      return occupationalHealthcareEntry;
    case 'HealthCheck':
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { healthCheckRating } = otherValues;

      const healthCheckEntry = {
        type: parseHealthCheckType(type),
        ...newPatientBaseEntry,
        healthCheckRating: parseHealthCheckRating(healthCheckRating)
      };

      return healthCheckEntry;
    default:
      return assertNever({ ...object });
  }
};

export const generateUUID = (): string => {
  const uuid: string[] = [];
  const byteSizes: number[] = [4, 2, 2, 2, 6];

  byteSizes.map(size => (
    uuid.push(crypto.randomBytes(size).toString("hex"))
  ));

  return uuid.join('-');
};
