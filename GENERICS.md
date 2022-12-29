
## Arrow Functions

```ts
function foo<T>(x: T): T { return x; } // works fine both in .ts and .tsx
```

```ts
const foo = <T>(x: T) => x; // errors in JSX -> element 'T' has no corresponding closing tag
```

Workaround for the error above:

```ts
const foo = <T extends unknown>(x: T) => x;
// or
const foo = <T,>(x: T) => x;
```

More at: https://stackoverflow.com/questions/32308370/what-is-the-syntax-for-typescript-arrow-functions-with-generics

## Advanced Generics

```ts
type EmployeeProps = {
  name: string;
  salary: number;
};

export class Attributes<T> {
  constructor(private data: T) {}

  // example 1
  get(key: string): string | number {
     return this.data[key];
  }
  
  // example 2 (better)
  get<K extends keyof T>(key: K): T[K] {
    return this.data[key];
  }
}

const attrs = new Attributes<EmployeeProps>({
  name: 'Tom',
  salary: 5000,
});

// example 1
 const name = attrs.get('name'); // name is of type string or number, that's  what we have hardcoded as a return of the get method

// example 2 (better)
const name = attrs.get('name'); // is now of type string

const test = attrs.get('test'); // ERROR: Argument of type '"test"' is not assignable to parameter of type '"name" | "salary"'.
```
We've specified that the `get` method returns `T[K]`, which is an object lookup just like in js - it looks up the value of the key `K` in the object `T` - which in our case is the value of the key `name` from the type `EmployeeProps` which is `string`.

The type of `K` can only ever be one of the keys of `T` - in our case name or salary. In other words - we can only call `get` with one of the keys of `T` - `name` or `salary`.

Continue at https://bobbyhadz.com/blog/advanced-typescript-generics
