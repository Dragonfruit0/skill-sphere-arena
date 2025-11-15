const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'skillsphere',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createDemoUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateDemoUser');
}
createDemoUserRef.operationName = 'CreateDemoUser';
exports.createDemoUserRef = createDemoUserRef;

exports.createDemoUser = function createDemoUser(dc) {
  return executeMutation(createDemoUserRef(dc));
};

const getMyRoutinesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyRoutines');
}
getMyRoutinesRef.operationName = 'GetMyRoutines';
exports.getMyRoutinesRef = getMyRoutinesRef;

exports.getMyRoutines = function getMyRoutines(dc) {
  return executeQuery(getMyRoutinesRef(dc));
};

const createRoutineRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateRoutine', inputVars);
}
createRoutineRef.operationName = 'CreateRoutine';
exports.createRoutineRef = createRoutineRef;

exports.createRoutine = function createRoutine(dcOrVars, vars) {
  return executeMutation(createRoutineRef(dcOrVars, vars));
};

const logWorkoutRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'LogWorkout', inputVars);
}
logWorkoutRef.operationName = 'LogWorkout';
exports.logWorkoutRef = logWorkoutRef;

exports.logWorkout = function logWorkout(dcOrVars, vars) {
  return executeMutation(logWorkoutRef(dcOrVars, vars));
};
