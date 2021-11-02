
Anonymous:
```ts
function greet(person: { name: string; age: number }) {
  return "Hello " + person.name;
}
```

Interface:
```ts
interface Person {
  name: string;
  age: number;
}
 
function greet(person: Person) {
  return "Hello " + person.name;
}
```

Type alias:
```ts
type Person = {
  name: string;
  age: number;
};
 
function greet(person: Person) {
  return "Hello " + person.name;
}
```
