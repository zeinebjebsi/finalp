const express=require('express');
const { addProduct, getAllProd, getOneProd, getMyProd, editProd, deleteProd } = require('../controllers/product.controller');
const isAuth = require('../middlewares/isAuth');



const router=express.Router();

//test product route
//router.get('/test',(req,res)=>{
  //  res.send('La route /api/product/test fonctionne ✅');
//
// });

router.post('/addProd', isAuth, addProduct );

router.get('/allProd', getAllProd );
router.get('/myProd',isAuth,getMyProd);
router.get('/:id',getOneProd  );
router.put('/:id',isAuth,editProd  );
router.delete('/:id',isAuth,deleteProd);
module.exports=router;