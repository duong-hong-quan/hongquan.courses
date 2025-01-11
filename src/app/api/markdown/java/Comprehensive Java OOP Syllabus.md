### **1. About mentor - Duong Hong Quan**
 
- **Education:** A graduate of **FPT University, Ho Chi Minh City** - **K17**, earning a **Bachelor's degree with distinction** and a **GPA of 3.5/4.0**.
- **Current Role:** Working as a **Junior Fullstack Developer**, gaining hands-on experience in both frontend and backend development.
- **Further Studies:** Currently pursuing a **Master's degree in Software Engineering** at **FSB (FPT School of Business & Technology)** to deepen technical expertise and advance professional development.
### **2. Introduction to Java and OOP Concepts**

#### **Definition**

- **Java:** A high-level, object-oriented programming language designed to have as few implementation dependencies as possible. It follows the "write once, run anywhere" principle.
- **Object-Oriented Programming (OOP):** A programming paradigm based on the concept of "objects," which contain data (attributes) and code (methods).

#### **Core OOP Principles:**

1. **Encapsulation:** Bundling data and methods that operate on the data into a single unit (class).
2. **Inheritance:** Mechanism for a new class to derive properties and behaviors from an existing class.
3. **Polymorphism:** Ability of objects to take on multiple forms, typically through method overloading and overriding.
4. **Abstraction:** Hiding implementation details and showing only essential features of an object.

```
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java and OOP!");
    }
}

```
### **3. Basic Java Syntax and Structure**

#### **Structure of a Java Program**

- **Definition:** The fundamental layout of a Java program includes a package declaration, imports, a class declaration, and methods.

#### **Components:**

1. **Package:** Logical grouping of classes.
2. **Class:** Blueprint for creating objects.
3. **Main Method:** Entry point for the program.

```
package mypackage; // Package declaration

import java.util.Scanner; // Importing a library

public class BasicStructure {
    public static void main(String[] args) {
        System.out.println("Basic Java Structure");
    }
}

```

### **4. Classes and Objects**

#### **Definition**

- **Class:** A blueprint for objects, containing fields (attributes) and methods (behavior).
- **Object:** An instance of a class.

```
class Person {
    String name; // Attribute
    int age;     // Attribute
    
    void introduce() { // Method
        System.out.println("Hi, I am " + name + " and I am " + age + " years old.");
    }
}

```
```
public class Main {
    public static void main(String[] args) {
        Person person = new Person(); // Create an object
        person.name = "Alice";
        person.age = 30;
        person.introduce();
    }
}

```

### **5. Constructors**

#### **Definition**

- A constructor is a special method used to initialize objects. It has the same name as the class and no return type.


```
class Car {
    String brand;
    
    // Constructor
    Car(String brand) {
        this.brand = brand;
    }
    
    void displayBrand() {
        System.out.println("Car brand: " + brand);
    }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car("Toyota");
        car.displayBrand();
    }
}

```

### **6. Inheritance**

#### **Definition**

- Inheritance allows a class to inherit fields and methods from another class.

#### **Example:**

```
class Animal {
    void sound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog extends Animal {
    void sound() {
        System.out.println("Dog barks");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.sound();
    }
}

```

### **7. Polymorphism**

#### **Definition**

- **Method Overloading:** Multiple methods in the same class with the same name but different parameters.
- **Method Overriding:** A subclass modifies the behavior of a method from its superclass.

#### **Example (Overriding):**
```
class Shape {
    void draw() {
        System.out.println("Drawing a shape");
    }
}

class Circle extends Shape {
    @Override
    void draw() {
        System.out.println("Drawing a circle");
    }
}

public class Main {
    public static void main(String[] args) {
        Shape shape = new Circle();
        shape.draw();
    }
}

```

### **8. Abstraction**

#### **Definition**

- **Abstract Class:** A class that cannot be instantiated and can contain abstract (unimplemented) methods.
- **Interface:** A contract for classes to implement, with all methods abstract by default.

#### **Example (Abstract Class):**
```
abstract class Animal {
    abstract void sound(); // Abstract method
}

class Cat extends Animal {
    @Override
    void sound() {
        System.out.println("Cat meows");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal cat = new Cat();
        cat.sound();
    }
}

```
#### **Example (Interface):**

```
interface Vehicle {
    void move(); // Abstract method
}

class Bike implements Vehicle {
    @Override
    public void move() {
        System.out.println("Bike is moving");
    }
}

public class Main {
    public static void main(String[] args) {
        Vehicle bike = new Bike();
        bike.move();
    }
}

```

### **9. Encapsulation**

#### **Definition**

- Restrict direct access to fields and provide controlled access using getters and setters.

#### **Example:**

```
class Employee {
    private String name; // Private field

    // Getter
    public String getName() {
        return name;
    }

    // Setter
    public void setName(String name) {
        this.name = name;
    }
}

public class Main {
    public static void main(String[] args) {
        Employee emp = new Employee();
        emp.setName("John");
        System.out.println("Employee Name: " + emp.getName());
    }
}

```

### **10. Advanced Topics**

#### **Exception Handling**

- **Definition:** Mechanism to handle runtime errors gracefully using `try-catch-finally`.

#### **Example:**
```
public class Main {
    public static void main(String[] args) {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero!");
        } finally {
            System.out.println("Execution complete.");
        }
    }
}

```

### **11. Collections and Generics**

#### **Definition**

- **Collections:** Framework for managing groups of objects (e.g., `ArrayList`, `HashMap`).
- **Generics:** Enable type safety in collections.

```
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Bob");
        for (String name : names) {
            System.out.println(name);
        }
    }
}

```

### **12. File Handling**

#### **Definition**

- Reading and writing files using Java's `java.io` and `java.nio` packages.

#### **Example:**
```
import java.io.FileWriter;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try (FileWriter writer = new FileWriter("output.txt")) {
            writer.write("Hello, File Handling!");
        } catch (IOException e) {
            System.out.println("An error occurred: " + e.getMessage());
        }
    }
}

```