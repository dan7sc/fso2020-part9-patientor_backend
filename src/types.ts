export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface  HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: Discharge;
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient  = Omit<Patient, 'id'>;

export type NewEntry  = Omit<Entry, 'id'>;

export type NewHospitalEntry  = Omit<HospitalEntry, 'id'>;

export type NewOccupationalHealthcareEntry  = Omit<OccupationalHealthcareEntry, 'id'>;

export type NewHealthCheckEntry  = Omit<HealthCheckEntry, 'id'>;

export enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other'
}
