/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from 'crypto';
import {
  NewPatient, Gender, Discharge, SickLeave, HealthCheckRating,
  Entry, NewEntry, NewBaseEntry, NewOccupationalHealthcareEntry,
  NewHospitalEntry, NewHealthCheckEntry, EntryType,
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

const isEntryType = (param: any): param is EntryType => {
  return Object.values(EntryType).includes(param);
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
    throw new Error('Incorrect or missing name');
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
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: any): string[] => {
  if (!Array.isArray(diagnosisCodes) || !isArrayOfStrings(diagnosisCodes)) {
    throw new Error('Incorrect or missing diagnosis codes');
  }
  return diagnosisCodes;
};

const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge');
  }
  const { date, criteria } = discharge;
  if (!isDate(date)) {
    throw new Error('Incorret or missing date');
  }
  if (!isString(criteria)) {
    throw new Error('ncorret or missing criteria');
  }
  return discharge;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing sick leave');
  }
  const { startDate, endDate } = sickLeave;
  if (!isDate(startDate)) {
    throw new Error('Incorrect or missing start date');
  }
  if (!isDate(endDate)) {
    throw new Error('Incorrect or missing end date');
  }
  return sickLeave;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if ((!healthCheckRating && healthCheckRating !== 0) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing health check rating');
  }
  return healthCheckRating;
};

const parseEntryType = (entryType: any): EntryType => {
  if (!entryType || !isString(entryType) || !isEntryType(entryType)) {
    throw new Error('Incorrect or missing type');
  }
  return entryType;
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

  const entryType = parseEntryType(type);

  switch(entryType) {
    case EntryType.Hospital:
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { discharge } = otherValues;

      const hospitalEntry: NewHospitalEntry = {
        type: entryType,
        ...newPatientBaseEntry,
        discharge: parseDischarge(discharge)
      };

      return hospitalEntry;
    case EntryType.OccupationalHealthcare:
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { employerName, sickLeave } = otherValues;

      const occupationalHealthcareEntry: NewOccupationalHealthcareEntry = {
        type: entryType,
        ...newPatientBaseEntry,
        employerName: parseName(employerName),
      };

      if (sickLeave) {
        occupationalHealthcareEntry.sickLeave = parseSickLeave(sickLeave);
      }

      return occupationalHealthcareEntry;
    case EntryType.HealthCheck:
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { healthCheckRating } = otherValues;

      const healthCheckEntry: NewHealthCheckEntry = {
        type: entryType,
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
