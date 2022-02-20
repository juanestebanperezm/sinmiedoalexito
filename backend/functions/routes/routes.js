const {Router}=require("express")
const router=Router();
const {db}=require("../config/auth")
const cors=require("cors")

router.use(cors())

//Los datos van a almacenarse en la nube, una vez se ejecuta la peticion
router.post("/api/newperson",async(req,res)=>{
    try
    {
        await db.collection("persons").
        add(
            {
                name:req.body.name,
                dayOfBirth:req.body.dayOfBirth,
                country:req.body.country,
                vehicle:req.body.vehicle,
                age:req.body.age
            }
            
            );
    return res.status(200).send("Eso es todo! la rompiste");
    }
    catch(error){
        console.log(error);
        return res.status(400).send(error)
    }
});

//Consulta todos los datos una vez han sido almacenados en la Database de GCP
router.get('/api/readallpersons',async (req,res)=>{
    try{
        let consulta=db.collection("persons")
        let respuesta=[]
        await consulta.get().then(querySnapShot=>{
            let documentos=querySnapShot.docs
            for(let doc of documentos){
                const selectedItem={
                    name:doc.data().name,
                    dayOfBirth:doc.data().dayOfBirth,
                    country:doc.data().country,
                    vehicle:doc.data().vehicle,
                    age:doc.data().age

                };
                respuesta.push(selectedItem)    
            }
        });

        return res.status(200).send(respuesta)
    }
    catch{
        console.log(error)
        return res.status(400).send(error)
    }
})


//Consulta total de paises
router.get('/api/avgcountry',async (req,res)=>{
    try{
        let consulta=db.collection("persons")
        let arr=[]
        await consulta.get().then(querySnapShot=>{
            let documentos=querySnapShot.docs
            for(let doc of documentos){
                const selectedItem={
                    country:doc.data().country,
                };
                arr.push(selectedItem)
                
            }
        });
        let Array2 = Object.values(arr.reduce((c, {country}) => {
            c[country] = c[country] || {pais: country,total: 0};
            c[country].total++;
            return c;
          }, {}));
        return res.status(200).send(Array2)
    }
    catch{
        console.log(error)
        return res.status(400).send(error)
    }
})


//Total de Vehiculos 
router.get('/api/avgcar',async (req,res)=>{
    try{
        let consulta=db.collection("persons")
        let arr=[]
        await consulta.get().then(querySnapShot=>{
            let documentos=querySnapShot.docs
            for(let doc of documentos){
                const selectedItem={
                    vehicle:doc.data().vehicle,
                };
                arr.push(selectedItem) 
            }
        });
        let Array2 = Object.values(arr.reduce((c, {vehicle}) => {
            c[vehicle] = c[vehicle] || {pais: vehicle,total: 0};
            c[vehicle].total++;
            return c;
          }, {}));
        return res.status(200).send(Array2)
    }
    catch{
        console.log(error)
        return res.status(400).send(error)
    }
})


//Ahora toda la colada con ese voleo de datos
router.get("/api/total",async(req,res)=>{
    try{
        let consulta=db.collection("persons")
        let respuesta=[]
        await consulta.get().then(querySnapShot=>{
            let documentos=querySnapShot.docs
            for(let doc of documentos){
                const selectedItem={
                    name:doc.data().name,
                    dayOfBirth:doc.data().dayOfBirth,
                    country:doc.data().country,
                    vehicle:doc.data().vehicle,
                    age:doc.data().age

                };
                respuesta.push(selectedItem)    
            }
        });

        total={
            
        "total":respuesta.map(e=>e.name).length,
        "ageAvg":respuesta.map(e=>e.age).reduce( (f,x)=>f+x,0 )/respuesta.map(z=>z.age).length,
        "ages":{"<18":respuesta.map(k=>k.ages<18).length,
        "19-29":respuesta.map(j=>j.ages>=19 && j.ages<=29).length,
        "30-45":respuesta.map(e=>e.ages>=30&&e.ages<=29).length,
        "46-70":respuesta.map(z=>z.ages>=46&&z.ages<=70).length,
        ">70":respuesta.map(i=>i.ages>=70).length}
        
    }
        return res.status(200).send(total)
    }
    catch{
        console.log(error)
        return res.status(400).send(error)
    }
})






module.exports=router;