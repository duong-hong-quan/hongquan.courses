# NET API Project Structure with 3 Layers

### **About mentor - Duong Hong Quan**
 
- **Education:** A graduate of **FPT University, Ho Chi Minh City** - **K17**, earning a **Bachelor's degree with distinction** and a **GPA of 3.5/4.0**.
- **Current Role:** Working as a **Junior Fullstack Developer**, gaining hands-on experience in both frontend and backend development.
- **Further Studies:** Currently pursuing a **Master's degree in Software Engineering** at **FSB (FPT School of Business & Technology)** to deepen technical expertise and advance professional development.


In this document, we will outline the steps and structure for initializing a .NET API solution with a 3-layer architecture. The solution consists of the following layers:

1. **owner.ProjectName.API**: This layer contains the API controllers and entry points for your application.
2. **owner.ProjectName.Services**: This layer contains the service interfaces and their implementations, which handle the business logic.
3. **owner.ProjectName.DAL**: This layer contains the data access layer (DAL), which interacts with the database through Entity Framework Core.

### Solution Structure

The solution will consist of the following projects:
```
Solution: owner.ProjectName
|
|-- owner.ProjectName.API
|-- owner.ProjectName.Services
|-- owner.ProjectName.DAL

```

### Step-by-Step Setup

### 1. **Create the Solution and Projects**

You can create the solution and projects from the command line using the following commands ( or u can create on UI):
```
dotnet new sln -n owner.ProjectName
dotnet new webapi -n owner.ProjectName.API
dotnet new classlib -n owner.ProjectName.Services
dotnet new classlib -n owner.ProjectName.DAL

```

Now, add the projects to the solution ( or u can create on UI):
```
dotnet sln owner.ProjectName.sln add owner.ProjectName.API/owner.ProjectName.API.csproj
dotnet sln owner.ProjectName.sln add owner.ProjectName.Services/owner.ProjectName.Services.csproj
dotnet sln owner.ProjectName.sln add owner.ProjectName.DAL/owner.ProjectName.DAL.csproj

```

### 2. **Add Dependencies Between Projects**

To set up the correct dependencies, you need to reference the `Services` and `DAL` projects in `API`  ( or u can create on UI)::
```
dotnet add owner.ProjectName.API/owner.ProjectName.API.csproj reference owner.ProjectName.Services/owner.ProjectName.Services.csproj
dotnet add owner.ProjectName.Services/owner.ProjectName.Services.csproj reference owner.ProjectName.DAL/owner.ProjectName.DAL.csproj

```

### 3. **Setup DAL Layer**

#### Add Entity Framework Packages

In the `owner.ProjectName.DAL` project, add the required EF Core packages  ( or u can create on UI):   
```
dotnet add owner.ProjectName.DAL package Microsoft.EntityFrameworkCore
dotnet add owner.ProjectName.DAL package Microsoft.EntityFrameworkCore.SqlServer
dotnet add owner.ProjectName.DAL package Microsoft.EntityFrameworkCore.Design
dotnet add owner.ProjectName.DAL package Microsoft.EntityFrameworkCore.Tools

```

#### Create `DbContext`

In the `owner.ProjectName.DAL` project, create a class `AppDbContext.cs` that will inherit from `DbContext`.
```
using Microsoft.EntityFrameworkCore;

namespace owner.ProjectName.DAL
{
    public class AppDbContext : DbContext
    {
        // Constructor
        public AppDbContext() { }

        // DbSet properties for your entities
        public DbSet<YourEntity> YourEntities { get; set; }

        // Configuring the DB context and connection string
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Your_Connection_String_Here");
        }
    }
}

```

ere:

- `YourEntity` should be replaced with the actual entity classes that represent your tables in the database.
- The `OnConfiguring` method is where you set the connection string for the database.

### 4. **Create Interfaces and Implementations**

#### In the `owner.ProjectName.Services` Project:

Create an interface `IYourService.cs`:
```
namespace owner.ProjectName.Services
{
    public interface IYourService
    {
        Task<IEnumerable<YourEntity>> GetAllEntities();
        // Other service methods
    }
}

```

Create a class `YourService.cs` that implements the interface:

```
namespace owner.ProjectName.Services
{
    public class YourService : IYourService
    {
        private readonly IYourRepository _repository;

        public YourService(IYourRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<YourEntity>> GetAllEntities()
        {
            return await _repository.GetAllEntitiesAsync();
        }
    }
}

```

#### In the `owner.ProjectName.DAL` Project:

Create an interface `IYourRepository.cs`:
```
namespace owner.ProjectName.DAL
{
    public interface IYourRepository
    {
        Task<IEnumerable<YourEntity>> GetAllEntitiesAsync();
        // Other repository methods
    }
}

```
Create a class `YourRepository.cs` that implements the interface:

```
namespace owner.ProjectName.DAL
{
    public class YourRepository : IYourRepository
    {
        private readonly AppDbContext _context;

        public YourRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<YourEntity>> GetAllEntitiesAsync()
        {
            return await _context.YourEntities.ToListAsync();
        }
    }
}

```


### 5. **Configure Dependency Injection in Program.cs**

In the `owner.ProjectName.API` project, open the `Program.cs` file and configure dependency injection to resolve the services and repositories:

```
using owner.ProjectName.Services;
using owner.ProjectName.DAL;

var builder = WebApplication.CreateBuilder(args);

// Register services and repositories with DI
builder.Services.AddScoped<IYourService, YourService>();
builder.Services.AddScoped<IYourRepository, YourRepository>();

// Add DBContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add controllers and configure other services
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseAuthorization();
app.MapControllers();

app.Run();

```

### 6. **Setting up Connection String**

In the `appsettings.json` file of the `owner.ProjectName.API` project, set the connection string:
```
{
  "ConnectionStrings": {
    "DefaultConnection": "Your_Connection_String_Here"
  }
}

```
### 7. **Migration and Database Update**

To use Entity Framework Core migrations to create the database schema, follow these steps:

1. Open a terminal or command prompt.
2. Navigate to the `owner.ProjectName.DAL` project.
3. Run the following commands to add the migration and update the database:

```
dotnet ef migrations add InitialCreate -p owner.ProjectName.DAL -s owner.ProjectName.API
dotnet ef database update -p owner.ProjectName.DAL -s owner.ProjectName.API

```

Here:

- `add migration "nameFile"` will create the initial migration for your database schema based on the `DbContext`.
- `update-database` will apply the migration to the actual database.

### 8. **API Controllers**

Finally, in the `owner.ProjectName.API` project, create a controller to interact with the service layer.


```
using owner.ProjectName.Services;
using Microsoft.AspNetCore.Mvc;

namespace owner.ProjectName.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class YourEntitiesController : ControllerBase
    {
        private readonly IYourService _yourService;

        public YourEntitiesController(IYourService yourService)
        {
            _yourService = yourService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var entities = await _yourService.GetAllEntities();
            return Ok(entities);
        }
    }
}

```


### Conclusion

You now have a 3-layer .NET API solution:

- **API Layer (owner.ProjectName.API)**: Handles HTTP requests and interacts with the service layer.
- **Service Layer (owner.ProjectName.Services)**: Contains business logic and interfaces.
- **Data Access Layer (owner.ProjectName.DAL)**: Manages database interactions using Entity Framework Core.