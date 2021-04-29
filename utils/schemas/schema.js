const Joi = require('@hapi/joi');


const productTagSchema = Joi.array().items(Joi.string().max(10));
const productIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);

// const productIdSchema = Joi.object({
//   productId: Joi.string().pattern(new RegExp('^[0-9a-fA-F]{24}$'))
// })
const productColorSchema = Joi.array().items(Joi.object({
    hex_value: Joi.string().required(),
    colour_name: Joi.string().required()
  }));

const createUserSchema = {
    brand: Joi.string().max(50).required(),
    name: Joi.string().max(50).required(),
    price: Joi.number().min(0).max(1000000),
    price_sign: Joi.string().max(50).required(),
    currency: Joi.string().max(50).required(),    
    image_link: Joi.string().required(),    
    product_link: Joi.string().required(),    
    website_link: Joi.string().required(),        
    description: Joi.string().required(),        
    rating: Joi.any(),        
    category: Joi.string().required(),        
    product_type: Joi.string().required(),    
    tag_list: productTagSchema,
    created_at: Joi.date(),
    updated_at: Joi.date(),
    product_api_url: Joi.string().required(), 
    api_featured_image: Joi.string().required(),
    product_colors: productColorSchema
}

const updateProductSchema = {
    brand: Joi.string().max(50).required(),
    name: Joi.string().max(50).required(),
    price: Joi.number().min(0).max(1000000),
    price_sign: Joi.string().max(50).required(),
    currency: Joi.string().max(50).required(),    
    image_link: Joi.string().required(),    
    product_link: Joi.string().required(),    
    website_link: Joi.string().required(),        
    description: Joi.string().required(),        
    rating: Joi.any(),        
    category: Joi.string().required(),        
    product_type: Joi.string().required(),    
    tag_list: productTagSchema,
    created_at: Joi.date(),
    updated_at: Joi.date(),
    product_api_url: Joi.string().required(), 
    api_featured_image: Joi.string().required(),
    product_colors: productColorSchema
}


module.exports = {
  productIdSchema,
  productTagSchema,
  createProductSchema,
  updateProductSchema,
}
