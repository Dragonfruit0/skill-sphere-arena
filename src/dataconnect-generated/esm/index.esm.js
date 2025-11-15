import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'skillsphere',
  location: 'us-east4'
};

export const createDemoUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateDemoUser');
}
createDemoUserRef.operationName = 'CreateDemoUser';

export function createDemoUser(dc) {
  return executeMutation(createDemoUserRef(dc));
}

export const getMyRoutinesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyRoutines');
}
getMyRoutinesRef.operationName = 'GetMyRoutines';

export function getMyRoutines(dc) {
  return executeQuery(getMyRoutinesRef(dc));
}

export const createRoutineRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateRoutine', inputVars);
}
createRoutineRef.operationName = 'CreateRoutine';

export function createRoutine(dcOrVars, vars) {
  return executeMutation(createRoutineRef(dcOrVars, vars));
}

export const logWorkoutRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'LogWorkout', inputVars);
}
logWorkoutRef.operationName = 'LogWorkout';

export function logWorkout(dcOrVars, vars) {
  return executeMutation(logWorkoutRef(dcOrVars, vars));
}

