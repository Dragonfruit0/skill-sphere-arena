import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateDemoUserData {
  user_insert: User_Key;
}

export interface CreateRoutineData {
  routine_insert: Routine_Key;
}

export interface CreateRoutineVariables {
  name: string;
  description?: string | null;
  isPublic: boolean;
}

export interface Exercise_Key {
  id: UUIDString;
  __typename?: 'Exercise_Key';
}

export interface GetMyRoutinesData {
  routines: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    isPublic?: boolean | null;
    createdAt: TimestampString;
  } & Routine_Key)[];
}

export interface LogWorkoutData {
  workoutLog_insert: WorkoutLog_Key;
}

export interface LogWorkoutVariables {
  routineId: UUIDString;
  logDate: DateString;
  startTime: TimestampString;
  endTime?: TimestampString | null;
  notes?: string | null;
}

export interface RoutineExercise_Key {
  routineId: UUIDString;
  exerciseId: UUIDString;
  __typename?: 'RoutineExercise_Key';
}

export interface Routine_Key {
  id: UUIDString;
  __typename?: 'Routine_Key';
}

export interface SetLog_Key {
  id: UUIDString;
  __typename?: 'SetLog_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface WorkoutLog_Key {
  id: UUIDString;
  __typename?: 'WorkoutLog_Key';
}

interface CreateDemoUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateDemoUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateDemoUserData, undefined>;
  operationName: string;
}
export const createDemoUserRef: CreateDemoUserRef;

export function createDemoUser(): MutationPromise<CreateDemoUserData, undefined>;
export function createDemoUser(dc: DataConnect): MutationPromise<CreateDemoUserData, undefined>;

interface GetMyRoutinesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyRoutinesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyRoutinesData, undefined>;
  operationName: string;
}
export const getMyRoutinesRef: GetMyRoutinesRef;

export function getMyRoutines(): QueryPromise<GetMyRoutinesData, undefined>;
export function getMyRoutines(dc: DataConnect): QueryPromise<GetMyRoutinesData, undefined>;

interface CreateRoutineRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateRoutineVariables): MutationRef<CreateRoutineData, CreateRoutineVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateRoutineVariables): MutationRef<CreateRoutineData, CreateRoutineVariables>;
  operationName: string;
}
export const createRoutineRef: CreateRoutineRef;

export function createRoutine(vars: CreateRoutineVariables): MutationPromise<CreateRoutineData, CreateRoutineVariables>;
export function createRoutine(dc: DataConnect, vars: CreateRoutineVariables): MutationPromise<CreateRoutineData, CreateRoutineVariables>;

interface LogWorkoutRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: LogWorkoutVariables): MutationRef<LogWorkoutData, LogWorkoutVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: LogWorkoutVariables): MutationRef<LogWorkoutData, LogWorkoutVariables>;
  operationName: string;
}
export const logWorkoutRef: LogWorkoutRef;

export function logWorkout(vars: LogWorkoutVariables): MutationPromise<LogWorkoutData, LogWorkoutVariables>;
export function logWorkout(dc: DataConnect, vars: LogWorkoutVariables): MutationPromise<LogWorkoutData, LogWorkoutVariables>;

