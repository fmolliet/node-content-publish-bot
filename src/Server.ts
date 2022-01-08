import 'reflect-metadata';
import App from './App';


const prompts = require('prompts');

(async () => {
  const response = await prompts({
    type: 'text',
    name: 'canal',
    message: 'Qual canal você gostaria de postar?'
  });
  new App(response.canal).listen(process.env.LISTEN_PATH || '');

})();
