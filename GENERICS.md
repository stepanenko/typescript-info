
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
