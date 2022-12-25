## Reduce with TypeScript

If an initial value is supplied to reduce then sometimes its type must be specified:
```ts
arr.reduce(fn, [])

// may have to be

arr.reduce<string[]>(fn, [])

// or

arr.reduce(fn, <string[]>[])

// or force its type with type assertion

arr.reduce(fn, [] as string[])
```

### Examples

The function we passed to the reduce method gets called for each element in the array.
The `reduce()` method returns the accumulated result. On the next iteration, the `accumulator` variable contains whatever we returned from the callback function.

Use a generic to type the reduce() method in TypeScript, e.g. `const result = arr.reduce<Record<string, string>>(myFunction, {})`.
The generic is used to specify the type of the return and initial values of the `reduce()` method.

```ts
const arr = [{ id: 1 }, { name: 'Alice' }, { salary: 100 }];

type ReduceReturnType = {
  id?: number;
  name?: string;
  salary?: number;
};

const result = arr.reduce<ReduceReturnType>(
  (accumulator, current) => {
    return { ...accumulator, ...current };
  },
  {}, // initial value
);

// const result: ReduceReturnType
console.log(result); // { id: 1, name: 'Alice', salary: 100 }
```
We marked the properties as optional in `ReduceReturnType` to satisfy the compiler, because the initial value we passed to the `reduce()` method is an empty object and is not compatible with `ReduceReturnType`.

You can also use a type assertion, especially if the type of the return value is different than the type of the initial value:
```ts
const arr = [{ id: 1 }, { name: 'Alice' }, { salary: 100 }];

type ReduceReturnType = {
  id: number; // no longer optional
  name: string;
  salary: number;
};

const result = arr.reduce<ReduceReturnType>(
  (accumulator, current) => {
    return { ...accumulator, ...current };
  },
  {} as ReduceReturnType, // using Type Assertion
);

// const result: ReduceReturnType
console.log(result); // { id: 1, name: 'Alice', salary: 100 }
```

Example with `Record<string, string>`:
```ts
const arr = ['a', 'b', 'c'];

type ReduceReturnType = Record<string, string>;

const result = arr.reduce<ReduceReturnType>(
  (accumulator, current) => {
    return { ...accumulator, [current]: current };
  },
  {}, // initial value
);

// const result: ReduceReturnType
console.log(result); // { a: 'a', b: 'b', c: 'c' }
```
We used `Record<string, string>` for the type of the `accumulator`, initial value and return value of the `reduce()` method.

The `Record<Keys, Type>` type is a utility type and is used to construct an object whose keys and values are of specific type.
