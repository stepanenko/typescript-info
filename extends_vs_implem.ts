
// An interface has no implementation, it's just a "contract" of what members/method this type has:
interface Point {
    x: number;
    y: number;
    distance(other: Point): number;
}

// Classes are the implementations:
class PointImplementation implements Point {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public distance(other: Point): number {
        return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
    }
}

// Example of misusing 'implements':
class Person {
    name: string;
    age: number;
}
// extends means - it gets all from its parent
// The child class (which is extended) will inherit all the properties and methods of the class is extends
class Child extends Person {}


// implements is like implementing an interface. Child object can pretend that it is parent... but it does not get any implementation
// The class which uses the implements keyword will need to implement all the properties and methods of the class which it implements
class Man implements Person {}

// Class 'Man' incorrectly implements interface 'Person'.
// Property 'name' is missing in type 'Man'.

// And that's because interfaces lack implementation.
// So if you implement a class then you only take its "contract" without the implementation, so you'll need to do this:

class NoErrorMan implements Person {
    name: string;
    age: number;
}

// More here: https://stackoverflow.com/questions/38834625/whats-the-difference-between-extends-and-implements-in-typescript
