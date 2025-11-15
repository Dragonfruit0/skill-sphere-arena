import { CreateDemoUserData, GetMyRoutinesData, CreateRoutineData, CreateRoutineVariables, LogWorkoutData, LogWorkoutVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateDemoUser(options?: useDataConnectMutationOptions<CreateDemoUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateDemoUserData, undefined>;
export function useCreateDemoUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateDemoUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateDemoUserData, undefined>;

export function useGetMyRoutines(options?: useDataConnectQueryOptions<GetMyRoutinesData>): UseDataConnectQueryResult<GetMyRoutinesData, undefined>;
export function useGetMyRoutines(dc: DataConnect, options?: useDataConnectQueryOptions<GetMyRoutinesData>): UseDataConnectQueryResult<GetMyRoutinesData, undefined>;

export function useCreateRoutine(options?: useDataConnectMutationOptions<CreateRoutineData, FirebaseError, CreateRoutineVariables>): UseDataConnectMutationResult<CreateRoutineData, CreateRoutineVariables>;
export function useCreateRoutine(dc: DataConnect, options?: useDataConnectMutationOptions<CreateRoutineData, FirebaseError, CreateRoutineVariables>): UseDataConnectMutationResult<CreateRoutineData, CreateRoutineVariables>;

export function useLogWorkout(options?: useDataConnectMutationOptions<LogWorkoutData, FirebaseError, LogWorkoutVariables>): UseDataConnectMutationResult<LogWorkoutData, LogWorkoutVariables>;
export function useLogWorkout(dc: DataConnect, options?: useDataConnectMutationOptions<LogWorkoutData, FirebaseError, LogWorkoutVariables>): UseDataConnectMutationResult<LogWorkoutData, LogWorkoutVariables>;
