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
