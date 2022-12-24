## Narrowing the `unknown` Type
This is the safe and recommended way to narrow values of type `unknown` to a more specific type.

We can narrow the unknown type to a more specific type in different ways, including the typeof operator,
the instanceof operator, and custom type guard functions.

```ts
function stringifyForLogging(value: unknown): string {
  if (typeof value === "function") {
    // Within this branch, `value` has type `Function`,
    // so we can access the function's `name` property
    const functionName = value.name || "(anonymous)";
    return `[function ${functionName}]`;
  }

  if (value instanceof Date) {
    // Within this branch, `value` has type `Date`,
    // so we can call the `toISOString` method
    return value.toISOString();
  }

  return String(value);
}
```
In addition to using the typeof or instanceof operators, we can also narrow the unknown type using a custom type guard function:
```ts
/**
 * A custom type guard function that determines whether
 * `value` is an array that only contains numbers.
 */
function isNumberArray(value: unknown): value is number[] {
  return (
    Array.isArray(value) && value.every(element => typeof element === "number")
  );
}

const unknownValue: unknown = [15, 23, 8, 4, 42, 16];

if (isNumberArray(unknownValue)) {
  // Within this branch, `unknownValue` has type `number[]`,
  // so we can spread the numbers as arguments to `Math.max`
  const max = Math.max(...unknownValue);
  console.log(max);
}
```
Notice how `unknownValue` has type `number[]` within the `if` statement branch although it is declared to be of type `unknown`.

## Using Type Assertions with `unknown`
This is NOT safe way to force the compiler to trust you that a value of type `unknown` is of a given type:
```ts
const value: unknown = "Hello World";
const someString: string = value as string; // type assertion
const otherString = someString.toUpperCase(); // "HELLO WORLD"
```
TypeScript is not performing any special checks to make sure the type assertion is actually valid.
The type checker assumes that you know better and trusts that whatever type you're using in your type assertion is correct.

This can easily lead to an error being thrown at runtime if you make a mistake and specify an incorrect type:
```ts
const value: unknown = 42;
const someString: string = value as string;
const otherString = someString.toUpperCase(); // ERROR
```
