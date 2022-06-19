
// Type keyword in typescript:
// In TS the type keyword defines an alias to a type. We can also use the type keyword to define user defined types.

// Example:

type Age = number | string;    // pipe means number OR string
type Color = "blue" | "red" | "yellow" | "purple";
type Random = 1 | 2 | 'random' | boolean;
type Madness = Random | 3 | 'foo' | Color;  

// `Random` and `Color` refer to user defined types, so
// type `Madness` can contain anything within these types + the number 3 and string 'foo'

type error = Error | null;
type CallBack = (err: error, res: Color) => Random;

// You can compose types of scalar types (string, number, etc), but also of literal values like 1 or 'mystring'.
// You can even compose types of other user-defined types. For example type `Madness` has the types `Random` and `Color` in it.


// TS docs: https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases
