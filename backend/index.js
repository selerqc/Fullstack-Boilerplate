import app from './src/app.js'
import config from './src/config/config.js'

app.listen(config.PORT, config.HOST, () => {

  console.log(`Server is running on port http://${config.HOST}:${config.PORT}/api/`);
});