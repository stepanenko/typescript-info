## Non-Nullable Types in TypeScript

You can enable the `strictNullChecks` compiler option within your project's `tsconfig.json` file:
```json
{
  "compilerOptions": {
    "strictNullChecks": true
    // ...
  }
}
```
In strict null checking mode, null and undefined are no longer assignable to every type:

```ts
// Compiled with --strictNullChecks

let name: string;
name = "Marius";  // OK
name = null;      // Error
name = undefined; // Error

let age: number;
age = 24;        // OK
age = null;      // Error
age = undefined; // Error

let isMarried: boolean;
isMarried = true;      // OK
isMarried = false;     // OK
isMarried = null;      // Error
isMarried = undefined; // Error
```
Since types are non-nullable by default when strict null checking is enabled,
we need to explicitly opt into nullability and tell the type checker which variables we want to be nullable.
We do this by constructing a union type containing the null or undefined types:
```ts
let name: string | null;
name = "Marius";  // OK
name = null;      // OK
name = undefined; // Error
```

**Note**: In strict null checking mode, local variables cannot be referenced before they have been assigned:
```ts
let name: string;
console.log(name); // Error: Variable 'name' is used before being assigned.
```
An exception to this rule are local variables whose type includes `undefined`:
```ts
let name: string | undefined;
console.log(name); // No error
```
That was **definite assignment analysis** - it's a protection measure against nullability bugs.
The idea is to make sure that every non-nullable local variable has been initialized properly before it's being used.
