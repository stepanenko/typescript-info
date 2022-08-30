## Interfaces vs Types in TypeScript

> Always prefer interface over type

When to use `type`:

- Use type when defining an alias for primitive types (string, boolean, number, bigint, symbol, etc)  
- Use type when defining tuple types  
- Use type when defining function types  
- Use type when defining a union  
- Use type when trying to overload functions in object types via composition  
- Use type when needing to take advantage of mapped types 

When to use `interface`:

Use interface for all object types where using type is not required (see above)  
Use interface when you want to take advantage of declaration merging  

### Primitive types

The easiest difference to see between type and interface is that only type can be used to alias a primitive:
```ts
type Nullish = null | undefined;
type Fruit = 'apple' | 'pear' | 'orange';
type Num = number | bigint;
```

None of these examples are possible to achieve with interfaces.

💡 When providing a type alias for a primitive value, use the type keyword.

### Tuple types

Tuples can only be typed via the type keyword:
```ts
type row = [colOne: number, colTwo: string];
```
💡 Use the type keyword when providing types for tuples.

### Function types

Functions can be typed by both the type and interface keywords:
```ts
// via type
type Sum = (x: number, y: number) => number;

// via interface
interface Sum {
  (x: number, y: number): number;
}
```
Since the same effect can be achieved either way, the rule will be to use type in these scenarios since it's a little easier to read (and less verbose).

💡 Use type when defining function types.

### Union types

Union types can only be achieved with the type keyword:
```ts
type Fruit = 'apple' | 'pear' | 'orange';
type Vegetable = 'broccoli' | 'carrot' | 'lettuce';

// 'apple' | 'pear' | 'orange' | 'broccoli' | 'carrot' | 'lettuce';
type HealthyFoods = Fruit | Vegetable;
```
💡 When defining union types, use the type keyword

### Object types

An object in JavaScript is a key/value map, and an "object type" is typescript's way of typing those key/value maps. Both interface and type can be used when providing types for an object as the original question makes clear. So when do you use type vs interface for object types?

#### Intersection vs Inheritance

With types and composition, I can do something like this:
```ts
interface NumLogger { 
    log: (val: number) => void;
}
type StrAndNumLogger = NumLogger & { 
  log: (val: string) => void;
}

const logger: StrAndNumLogger = {
  log: (val: string | number) => console.log(val)
}

logger.log(1);
logger.log('hi');
```
Typescript is totally happy. What about if I tried to extend that with interface:


interface StrAndNumLogger extends NumLogger { 
    log: (val: string) => void; 
};
The declaration of StrAndNumLogger gives me an error:

Interface 'StrAndNumLogger' incorrectly extends interface 'NumLogger'

With interfaces, the subtypes have to exactly match the types declared in the super type, otherwise TS will throw an error like the one above.

💡 When trying to overload functions in object types, you'll be better off using the type keyword.

#### Declaration Merging

The key aspect to interfaces in typescript that distinguish them from types is that they can be extended with new functionality after they've already been declared. A common use case for this feature occurs when you want to extend the types that are exported from a node module. For example, @types/jest exports types that can be used when working with the jest library. However, jest also allows for extending the main jest type with new functions. For example, I can add a custom test like this:
```
jest.timedTest = async (testName, wrappedTest, timeout) =>
  test(
    testName,
    async () => {
      const start = Date.now();
      await wrappedTest(mockTrack);
      const end = Date.now();

      console.log(`elapsed time in ms: ${end - start}`);
    },
    timeout
  );
```
And then I can use it like this:
```
test.timedTest('this is my custom test', () => {
  expect(true).toBe(true);
});
```
And now the time elapsed for that test will be printed to the console once the test is complete. Great! There's only one problem - typescript has no clue that i've added a timedTest function, so it'll throw an error in the editor (the code will run fine, but TS will be angry).

To resolve this, I need to tell TS that there's a new type on top of the existing types that are already available from jest. To do that, I can do this:
```
declare namespace jest {
  interface It {
    timedTest: (name: string, fn: (mockTrack: Mock) => any, timeout?: number) => void;
  }
}
```
Because of how interfaces work, this type declaration will be merged with the type declarations exported from @types/jest. So I didn't just re-declare jest.It; I extended jest.It with a new function so that TS is now aware of my custom test function.

This type of thing is not possible with the type keyword. If @types/jest had declared their types with the type keyword, I wouldn't have been able to extend those types with my own custom types, and therefore there would have been no good way to make TS happy about my new function. This process that is unique to the interface keyword is called declaration merging.

Declaration merging is also possible to do locally like this:
```
interface Person {
  name: string;
}

interface Person {
  age: number;
}

// no error
const person: Person = {
  name: 'Mark',
  age: 25
};
```
If I did the exact same thing above with the type keyword, I would have gotten an error since types cannot be re-declared/merged. In the real world, JavaScript objects are much like this interface example; they can be dynamically updated with new fields at runtime.

💡 Because interface declarations can be merged, interfaces more accurately represent the dynamic nature of JavaScript objects than types do, and they should be preferred for that reason.

### Mapped object types

With the type keyword, I can take advantage of mapped types like this:
```ts
type Fruit = 'apple' | 'orange' | 'banana';

type FruitCount = {
  [key in Fruit]: number;
}

const fruits: FruitCount = {
  apple: 2,
  orange: 3,
  banana: 4
};
```
This cannot be done with interfaces:
```ts
type Fruit = 'apple' | 'orange' | 'banana';

// ERROR: 
interface FruitCount {
  [key in Fruit]: number;
}
```
💡 When needing to take advantage of mapped types, use the type keyword

### Performance

Much of the time, a simple type alias to an object type acts very similarly to an interface.
```ts
interface Foo { prop: string }

type Bar = { prop: string };
```
However, and as soon as you need to compose two or more types, you have the option of extending those types with an interface, or intersecting them in a type alias, and that's when the differences start to matter.

Interfaces create a single flat object type that detects property conflicts, which are usually important to resolve! Intersections on the other hand just recursively merge properties, and in some cases produce never. Interfaces also display consistently better, whereas type aliases to intersections can't be displayed in part of other intersections. Type relationships between interfaces are also cached, as opposed to intersection types as a whole. A final noteworthy difference is that when checking against a target intersection type, every constituent is checked before checking against the "effective"/"flattened" type.

For this reason, extending types with interfaces/extends is suggested over creating intersection types.

Answer link: https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript
