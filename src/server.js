// ValidateEnv();

const App = require('./app');
const AuthRoute = require('./routes/auth.route');
const ItemRoute = require('./routes/item.route');

const app = new App([new AuthRoute(), new ItemRoute()]);

app.listen();
