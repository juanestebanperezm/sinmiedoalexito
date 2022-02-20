//Auth con poca seguridad, es mejor usar variables de entorno pero por rapidez decidi implementar esto
/*
Por cierto decidi usar un proyecto propio de firebase y cloudstorage ya que tuve
problemas al hacer un auth al que me proporcionaron, lo importante es que hice los
endpoints solicitados :P

https://www.youtube.com/watch?v=Y_Xm72p6ruY


*/
const admin = require('firebase-admin');
const serviceAcc=require("../credentials.json")
admin.initializeApp({
    credential:admin.credential.cert(serviceAcc),
    databaseURL:"https://web-cat-test-default-rtdb.firebaseio.com"
});

const db = admin.firestore()

module.exports = {
  db,
};