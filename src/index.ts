import express from 'express';
import path from 'path';
import routes from './routes';

const app = express();

app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('assets'));
app.set('views', path.resolve(__dirname, 'views'));

app.use(routes);
app.listen(3333);