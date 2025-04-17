
const Product=require('../model/Product');

exports.addProduct=async(req,res)=>{
    try{
        const newProd=new Product({...req.body,addedBy:req.user.id});
        await newProd.save();
        res.status(200).json({msg:"product added with success",newProd});
    }catch(error){
        res.status(400).json(error);
    }
};

//voir tous les products 
exports.getAllProd = async (req, res) => {
    try {
      const listProd = await Product.find();
      res.status(200).json({ msg: "Liste de tous les produits", listProd });
    } catch (error) {
      res.status(400).json(error);
    }
  };
  //chercher un produit par son id 
  exports.getOneProd = async (req, res) => {
    try {
     const {id}=req.params;
     const prodToGet=await Product.findById(id);
     if(!prodToGet){
        return res.status(404).json({msg:"c ant find product"})
     }res.status(200).json({ msg: "PRODUIT RECHERCHE :",prodToGet });

    } catch (error) {
      res.status(400).json(error);
    }
  };


  exports.getMyProd = async (req, res) => {
    try {
      const myProdList = await Product.find({ addedBy: req.user._id });
      res.status(200).json({ msg: "my products list  :", myProdList });

    } catch (error) {
      res.status(400).json(error);
    }
  };
  
  //editer un produit  ou update par son createur 
  exports.editProd = async (req, res) => {
    try {
      const { id } = req.params;
     
  
      // D'abord, récupérer le produit
      const prod = await Product.findById(id);
      if (!prod) {
        return res.status(404).json({ msg: "Produit non trouvé" });
      }
  
      // Vérifier que l'utilisateur est le créateur
      if (prod.addedBy.toString() !== req.user._id.toString()) {
        return res.status(400).json({ msg: "Vous n'avez pas le droit de modifier ce produit" });
      }
  
      // Ensuite, mettre à jour
      const updatedProd = await Product.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json({ msg: "Produit modifié avec succès", updatedProd });
  
    } catch (error) {
      res.status(400).json(error);
    }
  };
  
//supprimer un produit 
exports.deleteProd = async (req, res) => {
    try {
      const { id } = req.params;
      const prod = await Product.findById(id);
  
      if (!prod) {
        return res.status(404).json({ msg: "Produit non trouvé" });
      }
  
      if (prod.addedBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ msg: "Vous n'avez pas le droit de supprimer ce produit" });
      }
  
      await Product.findByIdAndDelete(id);
      res.status(200).json({ msg: "Produit supprimé avec succès", prod });
  
    } catch (error) {
      res.status(400).json(error);
    }
  };
