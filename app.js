let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let fileupload = require('express-fileupload');
let cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc')

const options = {
    definition:  {
        openapi: '3.0.0',
        info: {
            title: 'Articles API',
            version: '1.0.0'
        }
    },
    apis: ['./routes/*.js']

}
const swaggerSpec = swaggerJSDoc(options)

let indexRouter = require('./routes/index')(__dirname);

let app = express();
app.use(cors())
app.use(fileupload())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

module.exports = app;
