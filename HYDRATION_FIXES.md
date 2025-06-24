# Hydration Fixes Guide

This document outlines the hydration issues that were fixed and best practices to prevent them in the future.

## 🔧 **Issues Fixed**

### 1. **useIsMobile Hook**
**Problem**: Returned `undefined` initially, causing server/client mismatch
**Solution**: 
- Set default state to `false` to match server rendering
- Use `useBrowserAPI` utility for safe browser API access

### 2. **Redux Provider**
**Problem**: Showed "Loading..." on server, different content on client
**Solution**: 
- Always render Provider, but hide children during SSR
- Use `visibility: hidden` instead of conditional rendering

### 3. **Protected Route**
**Problem**: Different authentication states between server and client
**Solution**: 
- Add client-side detection before redirecting
- Show loading state during SSR

### 4. **Auth Initialization**
**Problem**: localStorage access during SSR
**Solution**: 
- Only access localStorage on client side
- Use `useClient` hook for detection

## 🛠️ **New Utilities Created**

### `useClient()` Hook
```typescript
import { useClient } from '@/hooks/use-client';

function MyComponent() {
  const isClient = useClient();
  
  if (!isClient) {
    return <div>Loading...</div>; // Server-side fallback
  }
  
  return <div>Client-side content</div>;
}
```

### `useBrowserAPI()` Hook
```typescript
import { useBrowserAPI } from '@/hooks/use-client';

function MyComponent() {
  const windowWidth = useBrowserAPI(
    () => window.innerWidth,
    1024 // Default value for SSR
  );
  
  return <div>Width: {windowWidth}</div>;
}
```

### `useLocalStorage()` Hook
```typescript
import { useLocalStorage } from '@/hooks/use-client';

function MyComponent() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  );
}
```

## 📋 **Best Practices**

### 1. **Consistent Initial State**
```typescript
// ❌ Bad - Different server/client states
const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

// ✅ Good - Consistent initial state
const [isMobile, setIsMobile] = useState<boolean>(false);
```

### 2. **Client-Side Detection**
```typescript
// ❌ Bad - Direct browser API access
const width = window.innerWidth;

// ✅ Good - Safe browser API access
const width = useBrowserAPI(() => window.innerWidth, 1024);
```

### 3. **Conditional Rendering**
```typescript
// ❌ Bad - Different content on server/client
if (!isClient) return <div>Loading...</div>;
return <Provider>{children}</Provider>;

// ✅ Good - Same structure, different visibility
return (
  <Provider>
    {isClient ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
  </Provider>
);
```

### 4. **localStorage Access**
```typescript
// ❌ Bad - Direct localStorage access
const token = localStorage.getItem('token');

// ✅ Good - Safe localStorage access
const [token, setToken] = useLocalStorage('token', null);
```

## 🚨 **Common Hydration Issues**

### 1. **Date/Time Rendering**
```typescript
// ❌ Bad - Different times on server/client
const now = new Date().toLocaleString();

// ✅ Good - Client-side only
const [now, setNow] = useState('');
useEffect(() => {
  setNow(new Date().toLocaleString());
}, []);
```

### 2. **Random Values**
```typescript
// ❌ Bad - Different random values
const randomId = Math.random().toString();

// ✅ Good - Stable or client-side only
const [randomId, setRandomId] = useState('');
useEffect(() => {
  setRandomId(Math.random().toString());
}, []);
```

### 3. **Browser APIs**
```typescript
// ❌ Bad - Direct browser API access
const userAgent = navigator.userAgent;

// ✅ Good - Safe browser API access
const userAgent = useBrowserAPI(() => navigator.userAgent, '');
```

## 🔍 **Debugging Hydration Issues**

### 1. **Check Console Warnings**
Look for warnings like:
- "Hydration failed because the server rendered HTML didn't match the client"
- "Text content does not match server-rendered HTML"

### 2. **Use React DevTools**
- Check component tree differences
- Look for state mismatches

### 3. **Add Debug Logging**
```typescript
useEffect(() => {
  console.log('Client-side mounted');
}, []);

console.log('Rendering with state:', { isClient, data });
```

### 4. **Test with Different Data**
- Test with empty data
- Test with loading states
- Test with error states

## 📝 **Testing Checklist**

- [ ] Component renders same content on server and client
- [ ] No direct browser API access during SSR
- [ ] Consistent initial state values
- [ ] Proper loading states during hydration
- [ ] No localStorage/sessionStorage access during SSR
- [ ] Date/time values handled properly
- [ ] Random values generated client-side only
- [ ] Conditional rendering uses same DOM structure

## 🎯 **Key Takeaways**

1. **Always provide consistent initial states** that match server rendering
2. **Use the `useClient()` hook** for client-side detection
3. **Avoid direct browser API access** during SSR
4. **Use utility hooks** for safe browser API access
5. **Test hydration** with different data states
6. **Monitor console warnings** for hydration issues 