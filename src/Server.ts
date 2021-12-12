import 'reflect-metadata';
import App from './App';

new App().listen(process.env.LISTEN_PATH || '');