const express = require('express');
const path = require('path');
const app = express()
const cors = require('cors')
const GlobalError = require('./Controllers/GlobalError');
const AppError = require('./Utils/AppError');
const productRouter = require('./Routes/productRouter');
const CategoryRouter = require('./Routes/CategoryRouter');
const BrandRouter = require('./Routes/BrandRouter');
const UserRouter = require('./Routes/UserRouter');
const cartRouter = require('./Routes/CartRoutes');
const shipaddressRouter = require('./Routes/ShipAddress');
const OrderRouter = require('./Routes/OrderRouter');
const AdminRouter = require('./Routes/AdminRouter');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');


dotenv.config({path:'./Config.env'})

app.use(express.json())
.use(cookieParser());
app.use(cors())


app.use(express.static(path.resolve(__dirname, 'build')));

// Catch-all route




app.use('/admin/', AdminRouter)
app.use('/users/',UserRouter)
app.use('/carts/',cartRouter)
app.use('/address/',shipaddressRouter)
app.use('/products/',productRouter)
app.use('/category/',CategoryRouter)
app.use('/brand/',BrandRouter)
app.use('/order/',OrderRouter)


///Paymentssss

const stripe = require('stripe')(process.env.StripeKey)



const calculateOrderAmount = (items) => {

    let totalprice

    if (items) {
        totalprice = items.totalprice * 100
      }
     
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return totalprice;
  };



app.post("/create-payment-intent",async(req,res)=>{

    const {items} = req.body

    const amount = calculateOrderAmount(items);
    


    const paymentIntent = await stripe.paymentIntents.create({
        amount:amount,
        currency: "usd",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
        },
      });
    
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
})

////webhook

const endpointSecret = "whsec_82670cdfd350f433df83b1d79a7a6f0ee92da66bc962ef265d3132bc43cfa654";

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});



// app.all('*',(req,res,next)=>{
//     next(new AppError('invalid route',404))
// })

app.get('*', (req, res) => {
  // Serve the main HTML file from the 'build' directory
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});




app.use(GlobalError)


module.exports = app