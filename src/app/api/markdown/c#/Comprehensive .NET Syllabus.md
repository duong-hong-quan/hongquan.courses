### **1. About mentor - Duong Hong Quan**
 
- **Education:** A graduate of **FPT University, Ho Chi Minh City** - **K17**, earning a **Bachelor's degree with distinction** and a **GPA of 3.5/4.0**.
- **Current Role:** Working as a **Junior Fullstack Developer**, gaining hands-on experience in both frontend and backend development.
- **Further Studies:** Currently pursuing a **Master's degree in Software Engineering** at **FSB (FPT School of Business & Technology)** to deepen technical expertise and advance professional development.
### **2. Introduction to .NET Framework**

#### **Definition**

- **.NET Framework:** A development platform created by Microsoft for building and running applications on Windows. It supports multiple languages like C#, F#, and VB.NET and provides a comprehensive class library.

#### **Core Components:**

1. **CLR (Common Language Runtime):** Executes applications and provides services like memory management, exception handling, and security.
2. **FCL (Framework Class Library):** A collection of reusable classes, interfaces, and value types.
```
using System;

class Program {
    static void Main() {
        Console.WriteLine("Welcome to .NET!");
    }
}

```

### **3. Basic Syntax and Structure**

#### **Structure of a .NET Application**

- **Definition:** A .NET application typically consists of namespaces, classes, methods, and statements.

#### **Example Code:**

```
using System; // Namespace

namespace MyApp { // Namespace declaration
    class Program { // Class
        static void Main(string[] args) { // Method
            Console.WriteLine("Hello, .NET!"); // Statement
        }
    }
}

```

### **4. Object-Oriented Programming in .NET**

#### **Definition**

- OOP in .NET follows the principles of encapsulation, inheritance, polymorphism, and abstraction.

#### **Example:**
```
class Animal {
    public void Speak() {
        Console.WriteLine("Animal speaks");
    }
}

class Dog : Animal {
    public new void Speak() {
        Console.WriteLine("Dog barks");
    }
}

class Program {
    static void Main() {
        Animal a = new Dog();
        a.Speak(); // Output: Animal speaks
    }
}

```

### **5. Entity Framework Core**

#### **Definition**

- **Entity Framework Core (EF Core):** An ORM (Object-Relational Mapper) for .NET that enables developers to work with databases using .NET objects.

#### **Steps to Use EF Core:**

1. Install EF Core NuGet packages:
```
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools

```
 2. Define a DbContext and Models:
```
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext {
    public DbSet<Student> Students { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
        optionsBuilder.UseSqlServer("YourConnectionStringHere");
    }
}

public class Student {
    public int Id { get; set; }
    public string Name { get; set; }
}

```

	3.Apply Migrations:
```
dotnet ef migrations add InitialCreate
dotnet ef database update

```

### **6. Three-Layer Architecture**

#### **Definition**

- The **3-layer architecture** separates the application into three distinct layers:
    1. **Presentation Layer (PL):** Handles UI/UX.
    2. **Business Logic Layer (BLL):** Contains core business logic.
    3. **Data Access Layer (DAL):** Interacts with the database.

### **7. ASP.NET Core for Web Development**

#### **Definition**

- **ASP.NET Core:** A cross-platform framework for building modern web applications and APIs.

#### **Example:**
```
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
var app = builder.Build();

app.MapControllers();

app.Run();

```
#### **Controller Example:**
```
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class HelloController : ControllerBase {
    [HttpGet]
    public string Get() {
        return "Hello, ASP.NET Core!";
    }
}

```

### **8. Comprehensive Guide to LINQ (Language Integrated Query)**

#### **8.1. What is LINQ?**

#### **Definition:**

- **LINQ (Language Integrated Query):** A powerful query language integrated into C# and VB.NET, allowing you to query collections of data (like arrays, lists, or databases) using a consistent syntax.

#### **Benefits:**

1. **Type Safety:** LINQ queries are type-checked at compile time.
2. **Consistent Syntax:** Same syntax for querying in-memory data (collections) and databases.
3. **Readable Code:** Cleaner and more readable than traditional looping constructs.
4. **Extensibility:** Supports querying various data sources like XML, SQL, and objects.

---

#### **8.2. Types of LINQ**

1. **LINQ to Objects:** Works with in-memory collections like arrays, lists, and dictionaries.
2. **LINQ to SQL:** Maps C# objects to database tables for SQL queries.
3. **LINQ to XML:** Processes XML documents.
4. **LINQ to Entities:** Used with Entity Framework for database queries.
5. **LINQ to DataSet:** Queries over ADO.NET DataSets.

---

#### **8.3. LINQ Syntax**

##### **Query Syntax vs Method Syntax**

- **Query Syntax:** SQL-like syntax.
- **Method Syntax:** Chained method calls with lambda expressions.

##### **Example:**
```
using System;
using System.Linq;

class Program {
    static void Main() {
        int[] numbers = { 1, 2, 3, 4, 5, 6 };

        // Query Syntax
        var evenNumbersQuery = from num in numbers
                               where num % 2 == 0
                               select num;

        // Method Syntax
        var evenNumbersMethod = numbers.Where(num => num % 2 == 0);

        Console.WriteLine("Even Numbers (Query Syntax): " + string.Join(", ", evenNumbersQuery));
        Console.WriteLine("Even Numbers (Method Syntax): " + string.Join(", ", evenNumbersMethod));
    }
}

```
#### **8.4. LINQ Operations**

LINQ provides a rich set of operations, broadly categorized as **projection**, **filtering**, **sorting**, **grouping**, and **aggregation**.

---

#### **8.4.1. Projection**

- Used to transform data from one form to another using the `select` operator.

##### **Example:**
```
using System;
using System.Linq;

class Program {
    static void Main() {
        string[] names = { "Alice", "Bob", "Charlie" };

        var upperCaseNames = names.Select(name => name.ToUpper());

        Console.WriteLine("Names in Upper Case: " + string.Join(", ", upperCaseNames));
    }
}

```
#### **8.4.2. Filtering**

- Extracts elements from a collection that satisfy a condition using `where`.
```
using System;
using System.Linq;

class Program {
    static void Main() {
        int[] numbers = { 1, 2, 3, 4, 5, 6 };

        var filteredNumbers = numbers.Where(n => n > 3);

        Console.WriteLine("Numbers greater than 3: " + string.Join(", ", filteredNumbers));
    }
}

```

#### **8.4.3. Sorting**

- Sorts the data using operators like `OrderBy`, `OrderByDescending`.

##### **Example:**

```
using System;
using System.Linq;

class Program {
    static void Main() {
        string[] names = { "Charlie", "Alice", "Bob" };

        var sortedNames = names.OrderBy(name => name);

        Console.WriteLine("Sorted Names: " + string.Join(", ", sortedNames));
    }
}

```

#### **8.4.4. Grouping**

- Groups data based on a key using the `group` operator.

```
using System;
using System.Linq;

class Program {
    static void Main() {
        string[] words = { "apple", "banana", "apricot", "cherry" };

        var groupedWords = from word in words
                           group word by word[0] into wordGroup
                           select wordGroup;

        foreach (var group in groupedWords) {
            Console.WriteLine($"Words starting with {group.Key}: {string.Join(", ", group)}");
        }
    }
}

```

#### **8.4.5. Aggregation**

- Performs operations like `Sum`, `Average`, `Min`, `Max`, `Count`.
```
using System;
using System.Linq;

class Program {
    static void Main() {
        int[] numbers = { 1, 2, 3, 4, 5 };

        int sum = numbers.Sum();
        double average = numbers.Average();
        int max = numbers.Max();

        Console.WriteLine($"Sum: {sum}, Average: {average}, Max: {max}");
    }
}

```

#### **8.4.6. LINQ with Entity Framework**

##### **Steps:**

1. **Create a Model:**
```
public class Product {
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
}

```
2. Define the DbContext:
	
```
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext {
    public DbSet<Product> Products { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
        optionsBuilder.UseSqlServer("YourConnectionStringHere");
    }
}

```

3. **Query the Database:**

```
using System.Linq;

class Program {
    static void Main() {
        using (var context = new AppDbContext()) {
            var expensiveProducts = context.Products
                                           .Where(p => p.Price > 100)
                                           .OrderBy(p => p.Name);

            foreach (var product in expensiveProducts) {
                Console.WriteLine($"{product.Name} - ${product.Price}");
            }
        }
    }
}

```

#### **8.4.7. Deferred Execution**

- LINQ queries are not executed until you iterate over the data.
```
using System;
using System.Linq;

class Program {
    static void Main() {
        int[] numbers = { 1, 2, 3, 4, 5 };

        var query = numbers.Where(n => n > 2); // Query not executed yet

        Console.WriteLine("Filtered Numbers:");
        foreach (var num in query) { // Query executed here
            Console.WriteLine(num);
        }
    }
}

```

#### **8.4.8. Combining LINQ Queries**

- Combine multiple LINQ operations like filtering, projecting, and sorting.

```
using System;
using System.Linq;

class Program {
    static void Main() {
        string[] names = { "Alice", "Bob", "Charlie", "David" };

        var query = names
                    .Where(name => name.Length > 3)
                    .OrderBy(name => name)
                    .Select(name => name.ToUpper());

        Console.WriteLine("Result: " + string.Join(", ", query));
    }
}

```



### **9. Exception Handling**

#### **Definition**

- Handling runtime errors using `try-catch-finally`.

#### **Example:**
```
class Program {
    static void Main() {
        try {
            int result = 10 / 0;
        } catch (DivideByZeroException e) {
            Console.WriteLine("Cannot divide by zero!");
        } finally {
            Console.WriteLine("Execution completed.");
        }
    }
}

```

### **10. Dependency Injection (DI)**

#### **Definition**

- DI is a design pattern that allows injecting dependencies into a class, reducing tight coupling.

#### **Example:**

```
using Microsoft.Extensions.DependencyInjection;

var services = new ServiceCollection();
services.AddTransient<IGreetingService, GreetingService>();
var provider = services.BuildServiceProvider();

var service = provider.GetService<IGreetingService>();
service.Greet();

public interface IGreetingService {
    void Greet();
}

public class GreetingService : IGreetingService {
    public void Greet() {
        Console.WriteLine("Hello, Dependency Injection!");
    }
}

```


### **11. Multithreading and Asynchronous Programming**

#### **Definition**

- Use `Task` and `async/await` for concurrent programming.

#### **Example:**


```
using System;
using System.Threading.Tasks;

class Program {
    static async Task Main() {
        await PrintMessageAsync();
        Console.WriteLine("End of Main");
    }

    static async Task PrintMessageAsync() {
        await Task.Delay(1000);
        Console.WriteLine("Async Task Complete");
    }
}

```

### **12. File Handling**

#### **Definition**

- Reading and writing files using `System.IO`.

#### **Example:**

```
using System.IO;

class Program {
    static void Main() {
        File.WriteAllText("example.txt", "Hello, File Handling!");
        string content = File.ReadAllText("example.txt");
        Console.WriteLine(content);
    }
}

```
