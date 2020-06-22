/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from 'crypto';
import {
  NewPatient, Gender, Discharge, SickLeave, HealthCheckRating, Entry, NewEntry,
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

const isDischarge = (param: any): param is Discharge => {
  return Object.keys(param).includes('date') && Object.keys(param).includes('criteria');
}

const isSickLeave = (param: any): param is SickLeave => {
  return Object.keys(param).includes('startDate') && Object.keys(param).includes('endDate');
}

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};


// const isHospital = (param: any): param is 'Hospital' => {
//   return param === 'Hospital';
// };

// const isHealthCheck = (param: any): param is 'HealthCheck' => {
//   return param === 'HealthCheck';
// };

// const isOccupationalHealthcare = (param: any): param is 'OccupationalHealthcare' => {
//   return param === 'OccupationalHealthcare';
// };

const isType = (param: any): param is 'Hospital' | 'HealthCheck' | 'OccupationalHealthcare' => {
  return param === 'Hospital' || param === 'HealthCheck' || param === 'OccupationalHealthcare';
}

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

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
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
  if (!discharge || !isDischarge(discharge || !isDate(discharge.date) || !isString(discharge.criteria))) {
    throw new Error('Incorrect or missing discharge');
  }
  return discharge;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave || !isDate(sickLeave.startDate) || !isDate(sickLeave.endDate))) {
    throw new Error('Incorrect or missing sickLeave');
  }
  return sickLeave;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing healthCheckRating');
  }
  return healthCheckRating;
};


// const parseHospital = (type: any): HospitalEntry => {
//   if (!isHospital(type)) {
//     throw new Error('Incorret or missing type:');
//   }
//   return type;
// };

// const parseHealthCheck = (type: any): HealthCheckEnry => {
//   if (!isHealthCheck(type)) {
//     throw new Error('Incorret or missing type:');
//   }
//   return type;
// };

// const parseOccupationalHealthcare = (type: any): OccupationalHealthcareEntry => {
//   if (!isOccupationalHealthcare(type)) {
//     throw new Error('Incorret or missing type:');
//   }
//   return type;
// };


const parseType = (type: any): 'Hospital' | 'HealthCheck' | 'OccupationalHealthcare' => {
  if (!isType(type)) {
    throw new Error('Incorret or missing type:');
  }
  return type;
};

// const parseEntryValues = (object: any | undefined): Entry => {
//   const { type, description, date, specialist, diagnosisCodes, ...otherValues } = object;

//   if (type === 'Hospital') {
//     return {
//       type: 'Hospital'
//     }
//   }
// }

export const toNewPatient = (object: any | undefined): NewPatient => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { name, dateOfBirth, ssn, gender, occupation, entries } = object;

    const newPatient: NewPatient = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
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
  let newPatientEntry: NewEntry;

  switch(type) {
    case 'Hospital':
      const { discharge } = otherValues;

      newPatientEntry = {
        type: parseType(type),
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        // discharge: parseDischarge(discharge)
      };

      break;
    case 'HealthCheck':
      const { healthCheckRating } = otherValues;

      newPatientEntry = {
        type: parseType(type),
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        // healthCheckRating: parseHealthCheckRating(healthCheckRating)
      };

      break;
    case 'OccupationalHealthcare':
      const { employerName, sickLeave } = otherValues;

      newPatientEntry = {
        type: parseType(type),
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseSpecialist(specialist),
        diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
        // employerName: parseName(employerName),
        // sickLeave: parseSickLeave(sickLeave)
      };

      break;
    default:
      throw new Error('Error: invalid entry');
  }
  return newPatientEntry;
};

export const generateUUID = (): string => {
  const uuid: string[] = [];
  const byteSizes: number[] = [4, 2, 2, 2, 6];

  byteSizes.map(size => (
    uuid.push(crypto.randomBytes(size).toString("hex"))
  ));

  return uuid.join('-');
};
