import async_handler from "express-async-handler";
import Case from "../models/caseModel.js";
import levelcase from "../models/levelcaseMoodel.js";



//@desc  get Cases
//@Action get /api/case/
//@access protected
export const GetAllcases = async_handler(async (req, res)=>{

    const cases= await Case.find({});
    res.json(cases);
})



//@desc  get Cases by type case
//@Action get /api/case/:idrl
//@access protected
export const GetCasesByTl = async_handler(async (req, res)=>{

    const idRl=req.params.idtl;
    const cases= await (await Case.find({typeofcase:idRl})).filter(el=>el.dateArch!=null);
    res.json(cases);
})

//@desc  get Cases by Client
//@Action get /api/case/:idcl
//@access protected
export const GetClientCases = async_handler(async (req, res)=>{

    const idCl=req.params.idcl;
    const cases= await (await Case.find({client:idCl})).filter(el=>el.dateArch!=null);
    res.json(cases);
})


//@desc  Add Cases For Client
//@Action get /api/case/create
//@access protected
export const GetAddCases = async_handler(async (req, res)=>{

  const {
     _numDC,
     _idType,
     _Idclient,
     _nameConcure
  }= req.body;


  const caseC = new Case({
      NumDC:_numDC,
      nameConcure:_nameConcure,
      typeofcase: _idType,
      client:_Idclient
  });

  const createClient= await caseC.save();

  res.json(createClient);
})


//@desc  Add level for case
//@Action get /api/case/level/create
//@access protected
export const GetAddLevelCases = async_handler(async (req, res)=>{

    const {
       _numDT,
       _AdressT,
       _dateCt,
       _level,
       _NomAvocat,
     _case
    }= req.body;
  
  
    const levelcaseC = new levelcase({
        NumDt:_numDT,
        AdressT:_AdressT,
        dateCt: _dateCt,
        NomAvocat:_NomAvocat,
        case:_case,
        level:_level
    });

  
    const createLevelCase= await levelcaseC.save();
  
    res.json(createLevelCase);
  })
  
  
  