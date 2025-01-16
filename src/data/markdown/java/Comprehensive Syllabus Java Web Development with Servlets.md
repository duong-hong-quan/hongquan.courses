### **1. About mentor - Duong Hong Quan**
 
- **Education:** A graduate of **FPT University, Ho Chi Minh City** - **K17**, earning a **Bachelor's degree with distinction** and a **GPA of 3.5/4.0**.
- **Current Role:** Working as a **Junior Fullstack Developer**, gaining hands-on experience in both frontend and backend development.
- **Further Studies:** Currently pursuing a **Master's degree in Software Engineering** at **FSB (FPT School of Business & Technology)** to deepen technical expertise and advance professional development.
### **2. Introduction to Java Web Development**

#### **Definition**

- **Java Servlets:** Java classes that handle HTTP requests and responses on a web server. Servlets extend server functionality to enable dynamic content generation, acting as the backbone for web applications.

#### **Benefits of Servlets:**

1. Platform Independence.
2. High Performance due to efficient multithreading.
3. Extensive integration with Java libraries and frameworks.

#### **Servlet Life Cycle:**

1. **Initialization (`init()`):** Called when the servlet is first loaded.
2. **Service (`service()`):** Handles client requests.
3. **Destruction (`destroy()`):** Cleans up resources when the servlet is unloaded.

#### **Basic Servlet Example:**

```
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class HelloServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<h1>Hello, World!</h1>");
    }
}

```

### **3. Structure of a Java Web Application**

#### **Typical Directory Structure:**

```
MyWebApp/
├── WEB-INF/
│   ├── web.xml
│   ├── classes/
│   │   └── com/example/HelloServlet.class
│   └── lib/
├── index.html

```
#### **Key Components:**

1. **HTML Files:** Static web pages.
2. **WEB-INF/web.xml:** Deployment descriptor.
3. **Classes Directory:** Contains compiled servlets.
4. **Lib Directory:** Stores third-party libraries.

---

### **4. Handling HTTP Requests and Responses**

#### **HTTP Methods Supported by Servlets:**

1. **GET:** Retrieve data.
2. **POST:** Submit data to the server.
3. **PUT:** Update resources.
4. **DELETE:** Remove resources.

#### **Example: Handling GET and POST Requests**
```
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class RequestResponseServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<h1>GET Request Received</h1>");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String name = request.getParameter("name");
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println("<h1>Hello, " + name + "</h1>");
    }
}

```

### **5. Servlet Configuration**

#### **Using web.xml**

- **Definition:** Specifies servlet mappings and initialization parameters.

#### **Example:**
```
<web-app>
    <servlet>
        <servlet-name>HelloServlet</servlet-name>
        <servlet-class>com.example.HelloServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>HelloServlet</servlet-name>
        <url-pattern>/hello</url-pattern>
    </servlet-mapping>
</web-app>

```
#### **Annotation-Based Configuration**

- **Example:**
```
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

@WebServlet("/hello")
public class HelloServlet extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.getWriter().println("Hello, World!");
    }
}

```
### **6. Session Management**

#### **Definition:**

- Mechanism to maintain user state across multiple requests.

#### **Techniques:**

1. **Cookies**
2. **URL Rewriting**
3. **HttpSession**

#### **HttpSession Example:**
```
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class SessionServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession();
        session.setAttribute("username", "JohnDoe");
        response.getWriter().println("Session Created!");
    }
}

```
### **7. Servlet Filters**

#### **Definition:**

- Pre-process and post-process requests and responses.

#### **Example Filter:**
```
import java.io.*;
import javax.servlet.*;

public class LoggingFilter implements Filter {
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        System.out.println("Request received!");
        chain.doFilter(request, response);
    }
}

```

#### **Filter Configuration in web.xml:**

```
<filter>
    <filter-name>LoggingFilter</filter-name>
    <filter-class>com.example.LoggingFilter</filter-class>
</filter>
<filter-mapping>
    <filter-name>LoggingFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>

```

### **8. Database Connectivity with Servlets**

#### **JDBC Integration:**

1. Load the JDBC driver.
2. Establish a connection.
3. Execute queries.

#### **Example:**
```
import java.io.*;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class DatabaseServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/mydb", "user", "password");

            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery("SELECT * FROM users");

            while (rs.next()) {
                response.getWriter().println("User: " + rs.getString("name"));
            }

            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

```

### **9. Best Practices**

1. **Thread Safety:** Avoid using instance variables.
2. **Resource Management:** Use `try-with-resources` for closing connections.
3. **Security:** Validate and sanitize user inputs.
4. **Scalability:** Use session tracking and load balancing effectively.

---

### **10. Advanced Topics**

#### **10.1 Asynchronous Servlets**

- Process long-running tasks asynchronously.
```
@WebServlet(asyncSupported = true)
public class AsyncServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
        AsyncContext asyncContext = request.startAsync();
        asyncContext.start(() -> {
            try {
                Thread.sleep(5000); // Simulate long task
                response.getWriter().println("Task Completed");
                asyncContext.complete();
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }
}

```


#### **10.2 Servlet Listeners**

- Track events like application start or session creation.
```
import javax.servlet.*;

public class AppListener implements ServletContextListener {
    public void contextInitialized(ServletContextEvent sce) {
        System.out.println("Application started");
    }
}

```

#### **10.3 File Upload**

```
@WebServlet("/upload")
@MultipartConfig
public class FileUploadServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Part filePart = request.getPart("file");
        String fileName = filePart.getSubmittedFileName();
        filePart.write("uploads/" + fileName);
        response.getWriter().println("File uploaded: " + fileName);
    }
}

```