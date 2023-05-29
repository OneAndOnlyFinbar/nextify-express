# Nextify Express

This module allows for react/next based file routing.

# Instalation

```bash
# NPM
npm install nextify-express
# Yarn
yarn add nextify-express
```

```js
// CommonJS
const nextify = require('nextify-express');
// ES6
import nextify from 'nextify-express';
```

### Usage Examples

`index.js`

```js
const express = require('express');
const nextify = require('nextify-express');

const app = express();
nextify(app, './routes');

app.listen(3000)
  .then(() => {
    console.log('Server is listening on port 3000');
  });
```

`./routes/index.js`
```js
module.exports.get = (req, res) => {
  res.send('GET /');
};

module.exports.delete = (req, res) => {
  res.send('DELETE /');
};
```

`./routes/users/index.js`
```js
module.exports.get = (req, res) => {
  res.send('GET /users');
};
```

`./routes/users/[id].js`
```js
module.exports.get = (req, res) => {
  res.send(`GET /users/${req.params.id}`);
};
```

`./routes/users/[id]/posts.js`
```js
module.exports.get = (req, res) => {
  res.send(`GET /users/${req.params.id}/posts`);
};
```

# Coverage

- [x] Basic routing
- [x] Dynamic routing
- [x] Nested routing
- [ ] Error handling
- [ ] Per-Route Configs
- [ ] Middleware