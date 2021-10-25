
## Extends vs Implements

- `extends`: The child class (which is extended) will inherit all the properties and methods of the class is extends
- `implements`: The class which uses the implements keyword will need to implement all the properties and methods of the class which it implements

To put in simpler terms:

- `extends`: Here you get all these methods/properties from the parent class so you don't have to implement this yourself
- `implements`: Here is a contract which the class has to follow. The class has to implement at least the following methods/properties

Example:
```javascript
class Person {
  name: string;
  age: number;

  walk(): void {
    console.log('Walking (person Class)')
  }

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
class child extends Person { }

// Man has to implements at least all the properties
// and methods of the Person class
class man implements Person {
  name: string;
  age: number

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  walk(): void {
    console.log('Walking (man class)')
  }

}

(new child('Mike', 12)).walk();
// logs: Walking(person Class)

(new man('Tom', 12)).walk();
// logs: Walking(man class)
```

In the example we can observe that the child class inherits everything from Person whereas the man class has to implement everything from Person itself.

If we were to remove something from the man class for example the walk method we would get the following compile time error:

> Class 'man' incorrectly implements class 'Person'. Did you mean to extend 'Person' and inherit its members as a subclass? Property 'walk' is missing in type 'man' but required in type 'Person'.(2720)
