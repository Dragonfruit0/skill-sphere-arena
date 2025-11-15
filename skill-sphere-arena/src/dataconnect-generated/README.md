# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetMyRoutines*](#getmyroutines)
- [**Mutations**](#mutations)
  - [*CreateDemoUser*](#createdemouser)
  - [*CreateRoutine*](#createroutine)
  - [*LogWorkout*](#logworkout)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetMyRoutines
You can execute the `GetMyRoutines` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyRoutines(): QueryPromise<GetMyRoutinesData, undefined>;

interface GetMyRoutinesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyRoutinesData, undefined>;
}
export const getMyRoutinesRef: GetMyRoutinesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyRoutines(dc: DataConnect): QueryPromise<GetMyRoutinesData, undefined>;

interface GetMyRoutinesRef {
  ...
  (dc: DataConnect): QueryRef<GetMyRoutinesData, undefined>;
}
export const getMyRoutinesRef: GetMyRoutinesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyRoutinesRef:
```typescript
const name = getMyRoutinesRef.operationName;
console.log(name);
```

### Variables
The `GetMyRoutines` query has no variables.
### Return Type
Recall that executing the `GetMyRoutines` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyRoutinesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetMyRoutinesData {
  routines: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    isPublic?: boolean | null;
    createdAt: TimestampString;
  } & Routine_Key)[];
}
```
### Using `GetMyRoutines`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyRoutines } from '@dataconnect/generated';


// Call the `getMyRoutines()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyRoutines();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyRoutines(dataConnect);

console.log(data.routines);

// Or, you can use the `Promise` API.
getMyRoutines().then((response) => {
  const data = response.data;
  console.log(data.routines);
});
```

### Using `GetMyRoutines`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyRoutinesRef } from '@dataconnect/generated';


// Call the `getMyRoutinesRef()` function to get a reference to the query.
const ref = getMyRoutinesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyRoutinesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.routines);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.routines);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateDemoUser
You can execute the `CreateDemoUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createDemoUser(): MutationPromise<CreateDemoUserData, undefined>;

interface CreateDemoUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateDemoUserData, undefined>;
}
export const createDemoUserRef: CreateDemoUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createDemoUser(dc: DataConnect): MutationPromise<CreateDemoUserData, undefined>;

interface CreateDemoUserRef {
  ...
  (dc: DataConnect): MutationRef<CreateDemoUserData, undefined>;
}
export const createDemoUserRef: CreateDemoUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createDemoUserRef:
```typescript
const name = createDemoUserRef.operationName;
console.log(name);
```

### Variables
The `CreateDemoUser` mutation has no variables.
### Return Type
Recall that executing the `CreateDemoUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateDemoUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateDemoUserData {
  user_insert: User_Key;
}
```
### Using `CreateDemoUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createDemoUser } from '@dataconnect/generated';


// Call the `createDemoUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createDemoUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createDemoUser(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createDemoUser().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateDemoUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createDemoUserRef } from '@dataconnect/generated';


// Call the `createDemoUserRef()` function to get a reference to the mutation.
const ref = createDemoUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createDemoUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## CreateRoutine
You can execute the `CreateRoutine` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createRoutine(vars: CreateRoutineVariables): MutationPromise<CreateRoutineData, CreateRoutineVariables>;

interface CreateRoutineRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateRoutineVariables): MutationRef<CreateRoutineData, CreateRoutineVariables>;
}
export const createRoutineRef: CreateRoutineRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createRoutine(dc: DataConnect, vars: CreateRoutineVariables): MutationPromise<CreateRoutineData, CreateRoutineVariables>;

interface CreateRoutineRef {
  ...
  (dc: DataConnect, vars: CreateRoutineVariables): MutationRef<CreateRoutineData, CreateRoutineVariables>;
}
export const createRoutineRef: CreateRoutineRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createRoutineRef:
```typescript
const name = createRoutineRef.operationName;
console.log(name);
```

### Variables
The `CreateRoutine` mutation requires an argument of type `CreateRoutineVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateRoutineVariables {
  name: string;
  description?: string | null;
  isPublic: boolean;
}
```
### Return Type
Recall that executing the `CreateRoutine` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateRoutineData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateRoutineData {
  routine_insert: Routine_Key;
}
```
### Using `CreateRoutine`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createRoutine, CreateRoutineVariables } from '@dataconnect/generated';

// The `CreateRoutine` mutation requires an argument of type `CreateRoutineVariables`:
const createRoutineVars: CreateRoutineVariables = {
  name: ..., 
  description: ..., // optional
  isPublic: ..., 
};

// Call the `createRoutine()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createRoutine(createRoutineVars);
// Variables can be defined inline as well.
const { data } = await createRoutine({ name: ..., description: ..., isPublic: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createRoutine(dataConnect, createRoutineVars);

console.log(data.routine_insert);

// Or, you can use the `Promise` API.
createRoutine(createRoutineVars).then((response) => {
  const data = response.data;
  console.log(data.routine_insert);
});
```

### Using `CreateRoutine`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createRoutineRef, CreateRoutineVariables } from '@dataconnect/generated';

// The `CreateRoutine` mutation requires an argument of type `CreateRoutineVariables`:
const createRoutineVars: CreateRoutineVariables = {
  name: ..., 
  description: ..., // optional
  isPublic: ..., 
};

// Call the `createRoutineRef()` function to get a reference to the mutation.
const ref = createRoutineRef(createRoutineVars);
// Variables can be defined inline as well.
const ref = createRoutineRef({ name: ..., description: ..., isPublic: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createRoutineRef(dataConnect, createRoutineVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.routine_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.routine_insert);
});
```

## LogWorkout
You can execute the `LogWorkout` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
logWorkout(vars: LogWorkoutVariables): MutationPromise<LogWorkoutData, LogWorkoutVariables>;

interface LogWorkoutRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: LogWorkoutVariables): MutationRef<LogWorkoutData, LogWorkoutVariables>;
}
export const logWorkoutRef: LogWorkoutRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
logWorkout(dc: DataConnect, vars: LogWorkoutVariables): MutationPromise<LogWorkoutData, LogWorkoutVariables>;

interface LogWorkoutRef {
  ...
  (dc: DataConnect, vars: LogWorkoutVariables): MutationRef<LogWorkoutData, LogWorkoutVariables>;
}
export const logWorkoutRef: LogWorkoutRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the logWorkoutRef:
```typescript
const name = logWorkoutRef.operationName;
console.log(name);
```

### Variables
The `LogWorkout` mutation requires an argument of type `LogWorkoutVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface LogWorkoutVariables {
  routineId: UUIDString;
  logDate: DateString;
  startTime: TimestampString;
  endTime?: TimestampString | null;
  notes?: string | null;
}
```
### Return Type
Recall that executing the `LogWorkout` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `LogWorkoutData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface LogWorkoutData {
  workoutLog_insert: WorkoutLog_Key;
}
```
### Using `LogWorkout`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, logWorkout, LogWorkoutVariables } from '@dataconnect/generated';

// The `LogWorkout` mutation requires an argument of type `LogWorkoutVariables`:
const logWorkoutVars: LogWorkoutVariables = {
  routineId: ..., 
  logDate: ..., 
  startTime: ..., 
  endTime: ..., // optional
  notes: ..., // optional
};

// Call the `logWorkout()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await logWorkout(logWorkoutVars);
// Variables can be defined inline as well.
const { data } = await logWorkout({ routineId: ..., logDate: ..., startTime: ..., endTime: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await logWorkout(dataConnect, logWorkoutVars);

console.log(data.workoutLog_insert);

// Or, you can use the `Promise` API.
logWorkout(logWorkoutVars).then((response) => {
  const data = response.data;
  console.log(data.workoutLog_insert);
});
```

### Using `LogWorkout`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, logWorkoutRef, LogWorkoutVariables } from '@dataconnect/generated';

// The `LogWorkout` mutation requires an argument of type `LogWorkoutVariables`:
const logWorkoutVars: LogWorkoutVariables = {
  routineId: ..., 
  logDate: ..., 
  startTime: ..., 
  endTime: ..., // optional
  notes: ..., // optional
};

// Call the `logWorkoutRef()` function to get a reference to the mutation.
const ref = logWorkoutRef(logWorkoutVars);
// Variables can be defined inline as well.
const ref = logWorkoutRef({ routineId: ..., logDate: ..., startTime: ..., endTime: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = logWorkoutRef(dataConnect, logWorkoutVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.workoutLog_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.workoutLog_insert);
});
```

