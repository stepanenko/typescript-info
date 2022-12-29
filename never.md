## Type `never`

The `never` type is used very rarely in typescript, only when the function is never going to reach a return statement.

This happens mostly for 2 reasons:
- the function throws an error
- the function loops infinitely

Let's look at an example of the most common use case - the function throws an error therefore it never reaches a return statement:
```ts
function throwError(message: string): never {
  throw new Error(message);
}
```

More at https://bobbyhadz.com/blog/typescript-never
