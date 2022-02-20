const cors = require('cors');
const express = require('express');
const app = express();
const functions = require('firebase-functions');
const rateLimit = require('express-rate-limit')

//Tiempo establecido para bloquear peticiones x un intervalo de tiempo cuando el usuario intenta excederse
app.use(
    rateLimit({
        /*Aqui use tiempo establecido en minutos,
        para usar segundos es 0.02*60*1000 o 1200 que es el 2% de 60.000*/
        windowsMs:0.02*60*1000,
        max:1,
        message:"Solo una peticion x segundo :)",
        headers:true
    })
);


//Routes llamada
app.use(require("./routes/routes"));

//Cors
app.use(cors({origin:true}));



exports.app = functions.https.onRequest(app);