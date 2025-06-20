## Node.js & Express.js Cheatsheet for Real-World Problem Solving

---

### 📆 Node.js Core

#### 🔹 Modules
```js
// CommonJS
const fs = require('fs');
module.exports = { myFunc };

// ES Modules
import fs from 'fs';
export const myFunc = () => {};
```

#### 🔹 File System
```js
fs.readFile('file.txt', 'utf8', (err, data) => {});
fs.writeFileSync('file.txt', 'Hello World');
```

#### 🔹 Path & Env
```js
const path = require('path');
const env = process.env.NODE_ENV || 'development';
require('dotenv').config();
```

#### 🔹 Events / Streams / Buffers
```js
const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.on('event', () => console.log('Fired'));
emitter.emit('event');
```

---

### ⚙️ Express.js Essentials

#### 🔹 Setup
```js
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

#### 🔹 Basic Routes
```js
app.get('/api/data', (req, res) => res.json({ msg: 'OK' }));
app.post('/api/data', (req, res) => res.send(req.body));
app.put('/api/data/:id', (req, res) => res.send(`Updated ${req.params.id}`));
app.delete('/api/data/:id', (req, res) => res.send(`Deleted ${req.params.id}`));
```

#### 🔹 Route Params / Query / Body
```js
const { id } = req.params;
const { search } = req.query;
const { name, email } = req.body;
```

#### 🔹 Middleware
```js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
```

---

### 🛡️ Real-World Concerns

#### 🔹 Error Handling
```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message });
});
```

#### 🔹 404 Handling
```js
app.use((req, res) => res.status(404).json({ message: 'Not Found' }));
```

#### 🔹 Async/Await in Routes
```js
app.get('/async', async (req, res, next) => {
  try {
    const data = await fetchData();
    res.json(data);
  } catch (err) {
    next(err);
  }
});
```

#### 🔹 API Rate Limiting
```js
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per minute
  message: 'Too many requests, please try again later.'
});

app.use('/api/coupon', limiter);
```

---

### 🧐 Useful Patterns

#### 🔹 Service / Controller Layer
```js
// service.js
exports.getUserById = async (id) => await UserModel.findById(id);

// controller.js
const userService = require('./service');
exports.getUser = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
```

#### 🔹 JWT Auth
```js
const jwt = require('jsonwebtoken');
const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
const payload = jwt.verify(token, process.env.JWT_SECRET);
```

#### 🔹 Validation (express-validator)
```js
const { body, validationResult } = require('express-validator');
app.post('/signup', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
});
```

---

### 🔄 Real World Integration

#### 🔹 MongoDB with Mongoose
```js
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
const User = mongoose.model('User', new mongoose.Schema({ name: String }));
```

#### 🔹 RESTful API Best Practices
- Use nouns for resources: `/api/users`, `/api/orders/:id`
- Use correct HTTP methods: GET, POST, PUT, DELETE
- Consistent error structure: `{ message: "error" }`
- Input validation and sanitization

---

### 🪠 CLI & Utilities
```bash
npm init -y
npm i express dotenv cors mongoose
npm i -D nodemon
nodemon app.js
```

---

### 🔪 Testing & Debugging
```bash
npm i -D jest supertest
```
```js
const request = require('supertest');
const app = require('./app');
test('GET /api/health', async () => {
  const res = await request(app).get('/api/health');
  expect(res.statusCode).toBe(200);
});
```

