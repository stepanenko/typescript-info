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

---
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

---
## The `unknown` Type in Union Types
In a union type, `unknown` absorbs every type. This means that if any of the types is `unknown`, the union type evaluates to `unknown`:
```ts
type UnionType1 = unknown | null; // unknown
type UnionType2 = unknown | undefined; // unknown
type UnionType3 = unknown | string; // unknown
type UnionType4 = unknown | number[]; // unknown
```
The one exception to this rule is `any`. If at least one of the types is `any`, the union type evaluates to `any`:
```ts
type UnionType5 = unknown | any; // any
```

---
## The `unknown` Type in Intersection Types
In an intersection type, every type absorbs unknown. This means that intersecting any type with unknown doesn't change the resulting type:
```ts
type IntersectionType1 = unknown & null; // null
type IntersectionType2 = unknown & undefined; // undefined
type IntersectionType3 = unknown & string; // string
type IntersectionType4 = unknown & number[]; // number[]
type IntersectionType5 = unknown & any; // any
```

---
## Example: Reading JSON from localStorage
Let's assume we want to write a function that reads a value from localStorage and deserializes it as JSON.
If the item doesn't exist or isn't valid JSON, the function should return an error result; otherwise, it should deserialize and return the value.

Since we don't know what type of value we'll get after deserializing the persisted JSON string,
we'll be using unknown as the type for the deserialized value. This means that callers of our function
will have to do some form of checking before performing operations on the returned value (or resort to using type assertions).

```ts
type Result =
  | { success: true; value: unknown }
  | { success: false; error: Error };

function tryDeserializeLocalStorageItem(key: string): Result {
  const item = localStorage.getItem(key);

  if (item === null) {
    // The item does not exist, thus return an error result
    return {
      success: false,
      error: new Error(`Item with key "${key}" does not exist`),
    };
  }

  let value: unknown;

  try {
    value = JSON.parse(item);
  } catch (error) {
    // The item is not valid JSON, thus return an error result
    return {
      success: false,
      error,
    };
  }

  // Everything's fine, thus return a success result
  return {
    success: true,
    value,
  };
}
```
The return type `Result` is a [tagged union type](https://mariusschulz.com/blog/tagged-union-types-in-typescript) (also known as a discriminated union type).
In other languages, it's also known as `Maybe`, `Option` or `Optional`.
We use `Result` to cleanly model a successful and unsuccessful outcome of the operation.

Callers of the tryDeserializeLocalStorageItem function have to inspect the success property before attempting to use the value or error properties:
```ts
const result = tryDeserializeLocalStorageItem("dark_mode");

if (result.success) {
  // We've narrowed the `success` property to `true`,
  // so we can access the `value` property
  const darkModeEnabled: unknown = result.value;

  if (typeof darkModeEnabled === "boolean") {
    // We've narrowed the `unknown` type to `boolean`,
    // so we can safely use `darkModeEnabled` as a boolean
    console.log("Dark mode enabled: " + darkModeEnabled);
  }
} else {
  // We've narrowed the `success` property to `false`,
  // so we can access the `error` property
  console.error(result.error);
}
```

For the sake of completeness, a more sophisticated alternative to this approach is to use [typed decoders](https://dev.to/joanllenas/decoding-json-with-typescript-1jjc) for safe JSON parsing.
A decoder lets us specify the expected schema of the value we want to deserialize.
If the persisted JSON turns out not to match that schema, the decoding will fail in a well-defined manner.
That way, our function always returns either a valid or a failed decoding result and we could eliminate the unknown type altogether.

Source: https://mariusschulz.com/blog/the-unknown-type-in-typescript
