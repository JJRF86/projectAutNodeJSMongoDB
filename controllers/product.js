'use strict'

const Product = require('../models/product');

function getProduct(request,response){
  console.log('Controller - Product - getProduct');
  let productId = request.params.productId;

  Product.findById(productId,(err,product)=>{
    if(err) return response.status(500).send({message:`Error al realizar la peticion: ${err}`});
    if(!product) return response.status(404).send({message:'El producto no existe'});

    return response.status(200).send({product});
  });
}

function getProducts(request,response){
  console.log('Controller - Product - getProducts');

  Product.find({},(err,products)=>{
    if(err) return response.status(500).send({message:`Error al realizar la peticion: ${err}`});
    if(!products) return response.status(404).send({message:'El producto no existe'});

    return response.status(200).send({products});
  });
}

function saveProduct(request,response){
  console.log('Controller - Product - saveProduct');

  let product = new Product();

  product.name = request.body.name;
  product.picture = request.body.picture;
  product.price = request.body.price;
  product.category = request.body.category;
  product.description = request.body.description;

  product.save((err,productStore)=>{
    if(err)
      return response.status(500).send({message:`Error al guardar en la base de datos: ${err}`});

    return response.status(200).send({product:productStore});
  });
}

function updateProduct(request,response){
  console.log('Controller - Product - updateProduct');

  let productId = request.params.productId;
  let productUpdate = request.body;

  Product.findByIdAndUpdate(productId,productUpdate,(err,productUpdated)=>{
    if(err) return response.status(500).send({message:`Error al actualizar el producto: ${err}`});

    response.status(200).send({product:productUpdated});
  });
}

function deleteProduct(request,response){
  console.log('Controller - Product - deleteProduct');

  let productId = request.params.productId;

  Product.findById(productId,(err,product)=>{
    if(err) return response.status(500).send({message:`Error al eliminar el producto: ${err}`});

    product.remove(err => {
      if(err) return response.status(500).send({message:`Error al eliminar el producto: ${err}`});
      response.status(200).send({message:'El producto ha sido eliminado'});
    });
  });
}

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct
}
