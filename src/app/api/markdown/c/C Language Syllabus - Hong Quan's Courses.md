### **1. About mentor - Duong Hong Quan**
 
- **Education:** A graduate of **FPT University, Ho Chi Minh City** - **K17**, earning a **Bachelor's degree with distinction** and a **GPA of 3.5/4.0**.
- **Current Role:** Working as a **Junior Fullstack Developer**, gaining hands-on experience in both frontend and backend development.
- **Further Studies:** Currently pursuing a **Master's degree in Software Engineering** at **FSB (FPT School of Business & Technology)** to deepen technical expertise and advance professional development.
### **2. Introduction to C Language**

- **Definition:** C is a general-purpose, procedural programming language that is widely used for system and application development. It is known for its performance and close interaction with hardware.

- **Example:**
 ```
#include <stdio.h>
int main() {
    printf("Hello, World!\n");
    return 0;
}


```

### **3. Basic Syntax and Structure**

- **Definition:** Understand the basic structure of a C program, including headers, main function, and return types.
- **Example:**

```
#include <stdio.h>
int main() {
    int x = 5;
    printf("Value of x is %d\n", x);
    return 0;
}

```

### **4. Data Types and Variables**

- **Definition:** Learn about different data types like `int`, `float`, `char`, and how to declare and use variables.
```
#include <stdio.h>
int main() {
    int tuoi = 25;
    float chieuCao = 5.9;
    char diem = 'A';
    printf("Tuổi: %d, Chiều cao: %.1f, Điểm: %c\n", tuoi, chieuCao, diem);
    return 0;
}

```

### **5. Control Flow Statements**

- **Definition:** Explore decision-making (if, else), loops (for, while), and switch-case.
```
#include <stdio.h>
int main() {
    int so = 10;
    if (so > 0) {
        printf("Số dương\n");
    } else {
        printf("Số âm\n");
    }
    return 0;
}

```

### **6. Functions**

- **Definition:** Understand how to define and call functions in C to improve modularity.
- **Example:**
```
#include <stdio.h>
int add(int a, int b) {
    return a + b;
}
int main() {
    printf("Sum: %d\n", add(5, 3));
    return 0;
}

```

### **7. Pointers**

- **Definition:** Learn about pointers, memory addresses, and their applications.

```
#include <stdio.h>
int main() {
    int x = 10;
    int *ptr = &x;
    printf("Value: %d, Address: %p\n", *ptr, ptr);
    return 0;
}

```
### **8. Arrays and Strings**

- **Definition:** Work with arrays and manipulate strings using standard functions.

```
#include <stdio.h>
#include <string.h>
int main() {
    char name[20] = "Alice";
    printf("Name: %s\n", name);
    return 0;
}

```

### **9. File Handling**
- **Definition:** Learn how to read and write files in C.

```
#include <stdio.h>
int main() {
    FILE *file = fopen("test.txt", "w");
    fprintf(file, "Hello, File!\n");
    fclose(file);
    return 0;
}

```
------



### **2. Introduction to C Language**

- **What is C?**
    
    - Developed by Dennis Ritchie in the early 1970s.
    - Portable and suitable for low-level programming tasks.
    - Basis for many modern programming languages like C++, Java, and Python.
- **Characteristics:**
    
    - Procedural language.
    - Supports modular programming.
    - Efficient memory management.
    - Rich set of libraries and functions.
- **Practical Use:**
    
    - Operating Systems (e.g., UNIX).
    - Embedded systems, databases, and desktop applications.


### **3. Basic Syntax and Structure**

- **Structure of a C Program:**
    
    1. **Preprocessor Directives:** Includes libraries like `#include <stdio.h>`.
    2. **Main Function:** Entry point (`int main()`).
    3. **Statements:** Instructions for the compiler.
    4. **Return Statement:** Ends the program.

- **Example:**
```
#include <stdio.h>
int main() {
    printf("Hello, C!\n");
    return 0;
}

```

### **4. Data Types and Variables**

- **Common Data Types:**
    
    - `int`: Integer values.
    - `float`: Decimal numbers.
    - `char`: Single characters.
    - `double`: Double-precision floating-point numbers.


- **Declaration and Initialization:**
```
int age = 25;
float weight = 60.5;
char grade = 'A';

```

### **5. Control Flow Statements**

- **Decision Making:**
    
    - `if`, `else`, `else if` for conditions.
```
if (score >= 90) {
    printf("Grade A\n");
} else {
    printf("Below Grade A\n");
}

```
**Loops:**

- `for`, `while`, `do-while` to repeat actions.


### **6. Functions**

- **Advantages:**
    
    - Code reusability and readability.
- **Example of a Function:**
```
int multiply(int a, int b) {
    return a * b;
}

```

### **7. Pointers**

- **Definition:** A pointer is a variable that holds the address of another variable.
```
int x = 10;
int *ptr = &x;

```

### **8. Arrays and Strings**

- **Arrays:** Fixed-size collections of similar data.
- **Strings:** Arrays of characters.
### **9. File Handling**

- **Modes:**
    
    - `r`: Read.
    - `w`: Write.
    - `a`: Append.
- **Example:**
```
FILE *file = fopen("data.txt", "w");
```