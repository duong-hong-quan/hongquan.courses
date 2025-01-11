### **About mentor - Duong Hong Quan**
 
- **Education:** A graduate of **FPT University, Ho Chi Minh City** - **K17**, earning a **Bachelor's degree with distinction** and a **GPA of 3.5/4.0**.
- **Current Role:** Working as a **Junior Fullstack Developer**, gaining hands-on experience in both frontend and backend development.
- **Further Studies:** Currently pursuing a **Master's degree in Software Engineering** at **FSB (FPT School of Business & Technology)** to deepen technical expertise and advance professional development.
### **1. Introduction to ReactJS and Tailwind CSS**

#### **1.1 What is ReactJS?**

- **Definition:** A JavaScript library for building user interfaces, maintained by Facebook. It uses a component-based architecture to create reusable and efficient UI elements.
- **Key Features:**
    - Virtual DOM for efficient updates.
    - Declarative syntax for designing views.
    - Component-based development.

#### **1.2 What is Tailwind CSS?**

- **Definition:** A utility-first CSS framework designed to create custom UI designs without writing traditional CSS.
- **Key Features:**
    - Utility classes for rapid design.
    - Responsive design out-of-the-box.
    - Extensible via configuration files.

---

### **2. Setting Up the Development Environment**

#### **2.1 Prerequisites:**

1. Install **Node.js** and **npm**.
2. Install **React** using `create-react-app` or **Vite** for a faster development experience.

#### **2.2 Creating a React Application:**

```
npx create-react-app my-app
cd my-app
npm start

```
#### **2.3 Installing Tailwind CSS:**

1. Install Tailwind via npm:
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init

```
2. Configure Tailwind in `tailwind.config.js`:

```
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};

```

3. Add Tailwind directives in `src/index.css`:

```
@tailwind base;
@tailwind components;
@tailwind utilities;

```
### **3. Structure of a React Application with Tailwind**

#### **3.1 Typical Directory Structure:**
```
my-app/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── About.jsx
│   ├── App.js
│   ├── index.js
│   └── index.css
├── public/
└── tailwind.config.js

```

### **4. ReactJS Fundamentals**

#### **4.1 JSX (JavaScript XML):**

- Allows writing HTML-like syntax within JavaScript.
- **Example:**

```
const App = () => {
  return <h1 className="text-3xl font-bold">Hello, React!</h1>;
};
export default App;

```

#### **4.2 Components:**

- **Functional Components:** Stateless components built using functions.
- **Example:**
```
const Greeting = ({ name }) => <p className="text-blue-500">Hello, {name}!</p>;
export default Greeting;

```
#### **4.3 Props and State:**

- **Props:** Pass data to child components.
- **State:** Manage dynamic data within a component.
- **Example:**
```
import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4">
      <p className="text-lg">Count: {count}</p>
      <button onClick={() => setCount(count + 1)} className="btn-primary">
        Increment
      </button>
    </div>
  );
};

export default Counter;

```

### **5. Styling with Tailwind CSS**

#### **5.1 Utility Classes:**

- Use pre-defined classes for styling directly in JSX.
- **Example:**

```
const Button = () => {
  return <button className="bg-blue-500 text-white px-4 py-2 rounded">Click Me</button>;
};

```

#### **5.2 Responsive Design:**

- Use responsive prefixes (`sm`, `md`, `lg`, `xl`) for breakpoints.
- **Example:**
```
const ResponsiveBox = () => {
  return <div className="p-4 md:p-8 lg:p-12 bg-gray-200">Responsive Box</div>;
};

```
#### **5.3 Customizing Tailwind:**

- Modify the `tailwind.config.js` file to add custom themes or extend existing utilities.
- **Example:**
```
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: '#1DA1F2',
      },
    },
  },
};

```

### **6. Advanced React Concepts**

#### **6.1 React Router:**

- Manage navigation between pages.
- **Example:**
```
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};
export default App;

```


#### **6.2 React Context API:**

- Share state across components without prop drilling.
- **Example:**

```
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

const App = () => {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Main />
    </ThemeContext.Provider>
  );
};

const Main = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className={`p-4 ${theme === "light" ? "bg-white" : "bg-gray-800 text-white"}`}>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
    </div>
  );
};

export default App;

```


### **7. Integrating React and Tailwind**

#### **7.1 Building a Navbar:**

```
const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <ul className="flex space-x-4">
        <li><a href="/" className="hover:underline">Home</a></li>
        <li><a href="/about" className="hover:underline">About</a></li>
      </ul>
    </nav>
  );
};
export default Navbar;

```

#### **7.2 Creating a Card Component:**

```
const Card = ({ title, description }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-gray-700 text-base">{description}</p>
    </div>
  );
};
export default Card;

```


### **8. Building a Full Application**

#### **8.1 Features:**

1. Navbar and Footer.
2. Responsive pages using Tailwind.
3. State management using React Context.
4. Dynamic components styled with Tailwind.

#### **Example Structure:**

```
const App = () => {
  return (
    <div className="font-sans">
      <Navbar />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

```

### **9. Best Practices**

1. **Component Reusability:** Break UI into reusable components.
2. **Performance Optimization:** Use React's `useMemo` and `React.memo`.
3. **Tailwind Consistency:** Define a design system in `tailwind.config.js`.
4. **Accessibility:** Ensure components are accessible using ARIA attributes.

### **10. Advanced Topics**

#### **10.1 Tailwind Plugins:**

- Extend functionality with plugins like `@tailwindcss/forms` or `@tailwindcss/typography`.
- **Example:**


```
npm install @tailwindcss/forms

```


```
module.exports = {
  plugins: [require('@tailwindcss/forms')],
};

```
#### **10.2 State Management with Redux:**

- **Example:**
```
import { createStore } from "redux";
import { Provider, useDispatch, useSelector } from "react-redux";

const reducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT": return { count: state.count + 1 };
    default: return state;
  }
};

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <Counter />
  </Provider>
);

const Counter = () => {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
    </div>
  );
};

export default App;

```

#### **10.3 Deploying React Applications:**

- Use platforms like **Netlify**, **Vercel**, or **GitHub Pages**.
- **Example for Netlify Deployment:**


```
npm run build
netlify deploy --prod

```

