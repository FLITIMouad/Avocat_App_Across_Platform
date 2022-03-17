import async_handler from "express-async-handler";
import Client from "../models/clientModel.js";
import { addEdit } from "./editController.js";

export const getAllclient = async_handler(async (req, res) => {
  
  const result = await Client.find({dateArch:null});
  res.json(result);
});

export const getClientByid = async_handler(async (req, res) => {
  const query = req.params.id;
  const result = await Client.findById(query);
  res.json(result);
});

export const addClient = async_handler(async (req, res) => {
    try{
        const {
            _name,
            _adress,
            _cin,
            _tel1,
            _tel2,
            _tel3,
            _email,
            _physiqueClient,
            _ville,
          } = req.body;
      // console.log(req.body)  
        
            const client = new Client({
                name: _name,
                adress: _adress,
                cin: _cin,
                tel1: _tel1,
                tel2: _tel2 ? _tel2 : null,
                tel3: _tel3 ? _tel3 : null,
                email: _email? _email :null,
                physiqueClient: _physiqueClient,
                dateArch: null,
                ville: _ville
              });
          
         const createClient=   await client.save()
         const obEdit = {user:req.sd._id,Element:createClient._id,ActionEdit:"add",TypeElement:"client"}
         await addEdit(obEdit);
             res.status(201).json(createClient);
    
    }
    catch(err){
       
    res.status(409).json(String(err.message).includes("duplicate")? "Exists" : err)
    }
 
  
});

export const EditClient = async_handler(async (req, res) => {
    try{
        const {
            _id,
            _name,
            _adress,
            _cin,
            _tel1,
            _tel2,
            _tel3,
            _dateArch,
            _email,
            _physiqueClient,
            _ville,
          } =  req.body;
      
            const client =await Client.findById(_id) ;
            
    
            if(!client) {throw new Error("not exists client") }

               client.name=_name ? _name :client.name;
               client.adress=_adress ? _adress :client.adress;
               client.cin=_cin ? _cin : client.cin;
               client.tel1=_tel1 ? _tel1 :client.tel1;
               client.tel2=_tel2 ? _tel2 :client.tel2;
               client.tel3=_tel3 ? _tel3 :client.tel3 ;
               client.dateArch=_dateArch ? _dateArch : (client.dateArch ? client.dateArch :null);
               client.email=_email ? _email :client.email;
               client.physiqueClient=_physiqueClient ? _physiqueClient :client.physiqueClient;
               client.ville=_ville ? _ville :client.ville;
             const editclient =   await client.save()
           
             const obEdit = {user:req.sd._id,Element:client._id,ActionEdit:"edit",TypeElement:"client"}
             await addEdit(obEdit);
    
             res.json(editclient)
    }catch (err){
        const er=String(err.message);
        res.status(409).json(er.includes("duplicate") ? "Exists" : (er.includes("not exists client") ? er : er))
    }
   

    
  });

