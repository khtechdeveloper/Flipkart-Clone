const Transaction = require('../models/Transaction');
// const PaymentController = require('../controller/PaymentController')
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)

async function doPayment(req,res){
  try{
    console.log(req.body,'body')
    let totalPrice=0;
    let {products, data}=req.body;
    for(let i=0; i<products.length;i++){
      totalPrice+=products[i].originalPrice
    }
    let lineItems=products.map((product)=>({
      price_data:{
        currency: 'inr',
        product_data: {
          name: product.bookTitle,
          
        },
        unit_amount: parseInt(product.originalPrice)*100,
      },
        quantity: 1
      
    }))
    const session= await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:5173/payment/success',
      cancel_url: 'http://localhost:5173/payment/failure',

    })
    if(session){
      let transaction= new Transaction(data);
      transaction.products=products;
      transaction.transactionId=session.id;
      transaction.totalPrice=totalPrice;
      await transaction.save();
      res.status(200).send({success: true, data: session.url, transactionId: session.id})
    }else{
      res.status(500).send({success: false})
    }
  }catch(err){
    console.log(err)

  } 
}

async function getTransactionForAdmin(req, res){
  try{
    let transaction=await Transaction.find({});
    console.log(transaction, 'trasactions');
    res.status(200).send({success: true, data: transaction})
  }catch(err){
    res.status(500).send({success: false})
  }
  
}

async function updateTransaction(req, res) {
  try{
    let transactionId=req.params.transactionId;
    console.log(transactionId, 'transactionId')
    let transaction= await Transaction.findOne({transactionId: transactionId})
    transaction.status='Completed'
    await transaction.save();
    res.status(200).send({success: true, data: transaction})
  }catch(err){
    res.status(500).send({success: false})
  }
}
module.exports ={
  doPayment,
  getTransactionForAdmin,
  updateTransaction
}