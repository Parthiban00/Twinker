const express = require('express');
const app = express();
const cors=require('cors');
const mongoose = require('./database/mongoose');
const fast2sms = require('fast-two-sms')
const List= require ('./database/models/list');
const Task= require ('./database/models/task');
const Tokens=require('./database/models/tokens');
const Register= require ('./database/models/register-user');
const Restaurant = require('./database/models/restaurant');
const MainMenu = require('./database/models/main-menu');
const Products = require('./database/models/products');
const Cart = require('./database/models/Cart');
const DeliveryLocation = require('./database/models/delivery-location');
const OrderDetails = require('./database/models/order-details');
const Coupons = require('./database/models/coupons');
app.use(express.json());
// ---------------------------------new--------------
const port = process.env.PORT || 5000;





app.use(cors());
app.use(express.urlencoded({extended:false}))



app.use((req,res,next)=> {

    res.header("Access-Control-Allow-Orgin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/lists',(req,res)=>{

    List.find({})
    .then(lists=>res.send(lists))
    .catch((error)=>console.log(error));
});

app.post('/lists',(req,res)=>{

    (new List ({'title': req.body.title}))
    .save()
    .then((list)=> res.send(list))
    .catch((error)=>console.log(error));

})

app.get('/lists/:listId',(req,res)=>{
    List.find({_id:req.params.listId})
    .then((list)=> res.send(list))
    .catch((error)=>console.log(error));
});

app.patch('/lists/:listId', (req,res)=>{
List.findOneAndUpdate({'_id': req.params.listId}, {$set: req.body})
.then((list)=> res.send(list))
.catch((error)=>console.log(error));

}),

app.delete('/lists/:listId', (req,res)=>{
    const deleteTasks=(list)=>{
        Task.deleteMany({_listId:list.id})
        .then(()=>list)
        .catch((error)=> cosole.log(error));
    };
    const list=List.findByIdAndDelete(req.params.listId)
    .then((list)=> deleteTasks(list))
    .catch((error)=>console.log(error))
    res.send(list);
});


/* http://localhost:3000/lists/:listId/tasks/:taskId */

app.post('/lists/:listId/tasks', (req,res)=>{

    (new Task({'_listId': req.params.listId, 'title': req.body.title}))
    .save()
    .then((task)=>res.send(task))
    .catch((error)=>console.log(error));
});

app.get('/lists/:listId/tasks',(req,res)=>{
    Task.find({_listId: req.params.listId})
    .then((tasks)=>res.send(tasks))
    .catch((error)=>console.log(error));
});

app.get('/lists/:listId/tasks/:taskId',(req,res)=>{
    Task.find({_listId: req.params.listId, _id:req.params.taskId})
    .then((tasks)=>res.send(tasks))
    .catch((error)=>console.log(error));
});

app.patch('/lists/:listId/tasks/:taskId', (req,res)=>{
    Task.findOneAndUpdate({_id: req.params.taskId, _listId:req.params.listId}, {$set: req.body})
    .then((tasks)=> res.send(tasks))
    .catch((error)=>console.log(error));

    }),

app.delete('/lists/:listId/tasks/:taskId', (req,res)=>{
        Task.findOneAndDelete({_id: req.params.taskId, _listId:req.params.listId})
        .then((tasks)=> res.send(tasks))
        .catch((error)=>console.log(error));

        }),

        //-------------------------------------------------------------------login----------------------------------------------------






        app.post('/userregisters',(req,res)=>{
            console.log("enters backend");
if(req.body.UserType=='D'){

}
else{


            (new Register ({'FirstName': req.body.FirstName,'LastName':req.body.LastName,'Address':req.body.Address,'MobileNo':req.body.MobileNo,'Password':req.body.Password,'Email':req.body.Email,'Address1':req.body.Address1,'Address2':req.body.Address2,'Address3':req.body.Address3,'UserType':req.body.UserType,'ActiveYn':req.body.ActiveYn,'DeleteYn':req.body.DeleteYn}))
            .save()
            .then((userregisters)=> res.send(userregisters))
            .catch((error)=>console.log(error));
          }
        })


        app.get('/userregisters',(req,res)=>{

            Register.find({})
            .then(userregisters=>res.send(userregisters))
            .catch((error)=>console.log(error));
        });

        app.get('/userregisters/:MobileNo/:Password/:ActiveYn',(req,res)=>{
            console.log("user login get ");
            Register.find({MobileNo:req.params.MobileNo,Password:req.params.Password,ActiveYn:true})
            .then((userregisters)=> res.send(userregisters))
            .catch((error)=>console.log(error));
        });

        app.post('/restaurants',(req,res)=>{

console.log("save restaurant");
            (new Restaurant ({'RestaurantName': req.body.RestaurantName,'RestaurantNickName':req.body.RestaurantNickName,'Address':req.body.Address,'MobileNo':req.body.MobileNo,'Password':req.body.Password,'Email':req.body.Email,'RestaurantType':req.body.RestaurantType,'RestaurantStatus':req.body.RestaurantStatus,'OrderStatus':req.body.OrderStatus,'DineinStatus':req.body.DineinStatus,'AvailableDays':req.body.AvailableDays,'OpenTime':req.body.OpenHr,'CloseTime':req.body.CloseHr,'UserType':req.body.UserType,'ActiveYn':req.body.ActiveYn,'DeleteYn':req.body.DeleteYn,'Latitude':req.body.Latitude,'Longitude':req.body.Longitude,'Distance':req.body.Distance,'Offer':req.body.Offer,'AvailableStatus':req.body.AvailableStatus,'OfferDescription':req.body.OfferDescription,'UserId':req.body.UserId,'Sort':req.body.Sort,'Type':req.body.Type}))
            .save()
            .then((restaurants)=> res.send(restaurants))
            .catch((error)=>console.log(error));

        });

        app.post('/tokens',(req,res)=>{

          console.log("save tokens");
                      (new Tokens ({'Token': req.body.Token}))
                      .save()
                      .then((tokens)=> res.send(tokens))
                      .catch((error)=>console.log(error));

                  });

                  app.get('/tokens/:Token',(req,res)=>{

                    console.log('get tokens');

                      Tokens.find({'Token':req.params.Token})
                      .then(tokens=>res.send(tokens))
                      .catch((error)=>console.log(error));
                  });


        app.get('/restaurants',(req,res)=>{

          console.log('get restaurants entered');

            Restaurant.find({'ActiveYn':true,'DeleteYn':false})
            .then(restaurants=>res.send(restaurants))
            .catch((error)=>console.log(error));
        });


        app.get('/restaurants/:ActiveYn/:Type',(req,res)=>{

          console.log('get restaurants entered');

          if(req.params.ActiveYn=="true" || req.params.ActiveYn=="false" ){
            Restaurant.find({'ActiveYn':true,'DeleteYn':false,'ActiveYn':req.params.ActiveYn,'Type':req.params.Type})
            .then(restaurants=>res.send(restaurants))
            .catch((error)=>console.log(error));
          }
          else{
            console.log('hi '+req.params.ActiveYn);

            Restaurant.find({UserId:req.params.ActiveYn})
            .then(restaurants=>res.send(restaurants))
            .catch((error)=>console.log(error));
          }


        });

        app.get('/restaurants/:restId',(req,res)=>{
            console.log('get rest');

            Restaurant.find({_id:req.params.restId,ActiveYn:true,DeleteYn:false})
            .then(restaurants=>res.send(restaurants))
            .catch((error)=>console.log(error));
        });


        app.post('/restaurants/:restId/mainmenus',(req,res)=>{


            (new MainMenu ({'RestaurantId': req.params.restId,'MenuName':req.body.MenuName,'AvailableTime':req.body.AvailableTime,'AvailableStatus':req.body.AvailableStatus,'AvailableDays':req.body.AvailableDays,'ActiveYn':req.body.ActiveYn,'DeleteYn':req.body.DeleteYn}))
            .save()
            .then((mainmenus)=> res.send(mainmenus))
            .catch((error)=>console.log(error));

        });

        app.get('/restaurants/:restId/:activeYn/mainmenus',(req,res)=>{

            MainMenu.find({RestaurantId: req.params.restId,ActiveYn:req.params.activeYn})
            .then(mainmenus=>res.send(mainmenus))
            .catch((error)=>console.log(error));
        });

        app.post('/restaurants/:restId/mainmenus/:menuId/products',(req,res)=>{


            (new Products ({'RestaurantId': req.params.restId,'MenuId':req.params.menuId,'ProductName':req.body.ProductName,'Price':req.body.Price,'Size':req.body.Size,'Description':req.body.Description,'AvailableTime':req.body.AvailableTime,'AvailableStatus':req.body.AvailableStatus,'AvailableDays':req.body.AvailableDays,'ActiveYn':req.body.ActiveYn,'DeleteYn':req.body.DeleteYn,'Offer':req.body.Offer,'OfferPrice':req.body.OfferPrice,'OfferDescription':req.body.OfferDescription,'Commission':req.body.Commission,'Suggestion':req.body.Suggestion,'Sort':req.body.Sort,'ItemCount':req.body.ItemCount}))
            .save()
            .then((Products)=> res.send(Products))
            .catch((error)=>console.log(error));

        });

        app.get('/restaurants/:restId/mainmenus/products',(req,res)=>{

            Products.find({RestaurantId: req.params.restId})
            .then(Products=>res.send(Products))
            .catch((error)=>console.log(error));
        });


        app.patch('/products/:productId', (req,res)=>{
            Products.findOneAndUpdate({_id: req.params.productId}, {$set: req.body})
            .then((products)=> res.send(products))
            .catch((error)=>console.log(error));

            }),

            app.get('/carts/:UserId/:MenuId/:ProductId/:Status/:ActiveYn',(req,res)=>{


                Cart.find({UserId:req.params.UserId,MenuId:req.params.MenuId,ProductId:req.params.ProductId,Status:req.params.Status,ActiveYn:req.params.ActiveYn})
                .then(carts=>res.send(carts))
                .catch((error)=>console.log(error));
            });


            app.get('/carts/:UserId/:Status/:ActiveYn',(req,res)=>{


                Cart.find({UserId:req.params.UserId,Status:req.params.Status,ActiveYn:req.params.ActiveYn})
                .then(carts=>res.send(carts))
                .catch((error)=>console.log(error));
            });

            app.post('/carts',(req,res)=>{


                (new Cart ({'RestaurantId': req.body.RestaurantId,'RestaurantName':req.body.RestaurantName,'MenuId':req.body.MenuId,'MenuName':req.body.MenuName,'ProductId':req.body.ProductId,'ProductName':req.body.ProductName,'Price':req.body.Price,'ItemCount':req.body.ItemCount,'Amount':req.body.Amount,'UserId':req.body.UserId,'UserName':req.body.UserName,'MobileNo':req.body.MobileNo,'Address':req.body.Address,'CreatedDate':req.body.CreatedDate,'CreatedBy':req.body.CreatedBy,'Status':req.body.Status,'ActiveYn':req.body.ActiveYn,'DeleteYn':req.body.DeleteYn,'ActualPrice':req.body.ActualPrice,'Offer':req.body.Offer,'OfferDescription':req.body.OfferDescription,'Commission':req.body.Commission,'ActualAmount':req.body.ActualAmount,'Description':req.body.Description}))
                .save()
                .then((carts)=> res.send(carts))
                .catch((error)=>console.log(error));

            });

            app.patch('/carts/:RestaurantId/:MenuId/:ProductId/:Status/:ActiveYn/:UserId', (req,res)=>{
                Cart.findOneAndUpdate({RestaurantId: req.params.RestaurantId,MenuId:req.params.MenuId,ProductId:req.params.ProductId,Status:req.params.Status,ActiveYn:req.params.ActiveYn,UserId:req.params.UserId}, {$set: req.body})
                .then((carts)=> res.send(carts))
                .catch((error)=>console.log(error));

                }),

                app.patch('/carts/:RestaurantId/:MenuId/:ProductId/:CartItemId/:Status/:ActiveYn/:UserId', (req,res)=>{

                    Cart.findOneAndUpdate({RestaurantId: req.params.RestaurantId,MenuId:req.params.MenuId,ProductId:req.params.ProductId,_id:req.params.CartItemId,Status:req.params.Status,ActiveYn:req.params.ActiveYn,UserId:req.params.UserId}, {$set: {ItemCount:req.body.ItemCount,Amount:req.body.Amount,ActualAmount:req.body.ActualAmount}})
                    .then((carts)=> res.send(carts))
                    .catch((error)=>console.log(error));

                    }),





                app.patch('/carts', (req,res)=>{

                    Cart.updateMany({Status: 'Cart',ActiveYn:true,DeleteYn:false}, {$set: {Status:req.body.Status,ActiveYn:req.body.ActiveYn,DeleteYn:req.body.DeleteYn}})
                    .then((carts)=> res.send(carts))
                    .catch((error)=>console.log(error));

                    }),

                    app.get('/carts',(req,res)=>{


                        Cart.find({Status:'Cart'})
                        .then(carts=>res.send(carts))
                        .catch((error)=>console.log(error));
                    });


                    app.patch('/carts/:RestaurantId/:MenuId/:ProductId/:UserId/:Status', (req,res)=>{
                        console.log('hic art dfasfas');
                        Cart.findOneAndUpdate({RestaurantId: req.params.RestaurantId,MenuId:req.params.MenuId,ProductId:req.params.ProductId,UserId:req.params.UserId,Status:req.params.Status}, {$set: {Status:'Removed',ItemCount:0,ActiveYn:false,DeleteYn:true}})
                        .then((carts)=> res.send(carts))
                        .catch((error)=>console.log(error));

                        }),


                        app.patch('/carts/:RestaurantId/:MenuId/:ProductId/:CartItemId/:UserId/:ActiveYn/:DeleteYn/:Status', (req,res)=>{
                            console.log('hic art dfasfas1111111111');
                            Cart.findOneAndUpdate({RestaurantId: req.params.RestaurantId,MenuId:req.params.MenuId,ProductId:req.params.ProductId,_id:req.params.CartItemId,UserId:req.params.UserId,ActiveYn:req.params.ActiveYn,Status:req.params.Status}, {$set: {Status:'Removed',ItemCount:0,ActiveYn:false,DeleteYn:true}})
                            .then((carts)=> res.send(carts))
                            .catch((error)=>console.log(error));

                            }),

                        app.post('/deliverylocations',(req,res)=>{


                            (new DeliveryLocation ({'UserId': req.body.UserId,'UserName':req.body.UserName,'MobileNo':req.body.MobileNo,'Address':req.body.Address,'ActiveYn':req.body.ActiveYn,'DeleteYn':req.body.DeleteYn,'Recent':req.body.Recent,'UserType':req.body.UserType}))
                            .save()
                            .then((deliverylocations)=> res.send(deliverylocations))
                            .catch((error)=>console.log(error));

                        });


                        app.get('/deliverylocations/:UserId/:ActiveYn',(req,res)=>{


                            DeliveryLocation.find({UserId:req.params.UserId,ActiveYn:req.params.ActiveYn})
                            .then(deliverylocations=>res.send(deliverylocations))
                            .catch((error)=>console.log(error));
                        });


                        app.patch('/deliverylocations/:UserId/:id/:ActiveYn', (req,res)=>{
                            DeliveryLocation.findOneAndUpdate({UserId:req.params.UserId,_id:req.params.id,ActiveYn:req.params.ActiveYn}, {$set: {Recent:'No',ActiveYn:false,DeleteYn:true}})
                            .then((deliverylocations)=> res.send(deliverylocations))
                            .catch((error)=>console.log(error));

                            }),

                            app.post('/orderdetails',(req,res)=>{


                                (new OrderDetails ({'OrderId': req.body.OrderId,'UserId':req.body.UserId,'UserName':req.body.UserName,'RestaurantId':req.body.RestaurantId,'RestaurantName':req.body.RestaurantName,'ItemTotal':req.body.ItemTotal,'DeliveryPartnerFee':req.body.DeliveryPartnerFee,'TaxesAndCharges':req.body.TaxesAndCharges,'TotalAmount':req.body.TotalAmount,'ActiveYn':req.body.ActiveYn,'DeleteYn':req.body.DeleteYn,'Status':req.body.Status,'CreatedDate':req.body.CreatedDate,'CreatedBy':req.body.CreatedBy,'ItemCount':req.body.ItemCount,'MobileNo':req.body.MobileNo,'Address':req.body.Address,'ItemDetails':req.body.ItemDetails,'DeliveryPartnerStatus':req.body.DeliveryPartnerStatus,'ActualAmount':req.body.ActualAmount,'CreatedTime':req.body.CreatedTime,'Discount':req.body.Discount,'DiscountDescritpion':req.body.DiscountDescritpion,'DiscountCode':req.body.DiscountCode}))
                                .save()
                                .then((orderdetails)=> res.send(orderdetails))
                                .catch((error)=>console.log(error));

                            });

                            app.get('/orderdetails/:UserId/:Status/:ActiveYn',(req,res)=>{


                                OrderDetails.find({UserId:req.params.UserId,ActiveYn:req.params.ActiveYn,Status:req.params.Status})
                                .then(orderdetails=>res.send(orderdetails))
                                .catch((error)=>console.log(error));
                            });

                            app.get('/restaurants/orders/:userId/:activeYn',(req,res)=>{
                                console.log('hi '+req.params.userId);

                                Restaurant.find({UserId:req.params.userId})
                                .then(restaurants=>res.send(restaurants))
                                .catch((error)=>console.log(error));
                            });

                            app.get('/orderdetails/:RestaurantId/:ActiveYn',(req,res)=>{


                                OrderDetails.find({RestaurantId:req.params.RestaurantId,ActiveYn:req.params.ActiveYn})
                                .then(orderdetails=>res.send(orderdetails))
                                .catch((error)=>console.log(error));
                            });



                            app.patch('/orderdetails/:_id/:RestaurantId', (req,res)=>{



                                OrderDetails.findOneAndUpdate({RestaurantId: req.params.RestaurantId,_id:req.params._id}, {$set: {Status:req.body.Status}})
                                .then((orderdetails)=> res.send(orderdetails))
                                .catch((error)=>console.log(error));

                                }),



                                app.patch('/orders/orderdetails/:_id/:RestaurantId', (req,res)=>{



                                  OrderDetails.findOneAndUpdate({RestaurantId: req.params.RestaurantId,_id:req.params._id}, {$set: {Status:req.body.Status}})
                                  .then((orderdetails)=> res.send(orderdetails))
                                  .catch((error)=>console.log(error));

                                  }),

                                app.get('/orderdetails/:ActiveYn/',(req,res)=>{


                                    OrderDetails.find({ActiveYn:req.params.ActiveYn})
                                    .then(orderdetails=>res.send(orderdetails))
                                    .catch((error)=>console.log(error));
                                });

                                app.get('/orderdetails',(req,res)=>{

                                  console.log("get all orders from order details");
                                  OrderDetails.find({})
                                 .then(orderdetails=>res.send(orderdetails))
                                  .catch((error)=>console.log(error));
                             });

//                                 app.get('/orderdetails/:ActiveYn/:UserId/:DeleteYn',(req,res)=>{

// console.log("get accepted order by delivery partner");
//                                   OrderDetails.find({ActiveYn:req.params.ActiveYn,_id:req.params.UserId})
//                                   .then(orderdetails=>res.send(orderdetails))
//                                   .catch((error)=>console.log(error));
//                               });

                                app.patch('/orderdetails/:_id/:RestaurantId/:ActiveYn/:DeleteYn/', (req,res)=>{

console.log('update accepted by delivery partner');
if(req.body.DeliveryPartnerStatus=='Completed'){
  OrderDetails.findOneAndUpdate({RestaurantId: req.params.RestaurantId,_id:req.params._id,ActiveYn:req.params.ActiveYn,DeleteYn:req.params.DeleteYn,DeliveryPartnerStatus:req.body.PreviousStatus}, {$set: {DeliveryPartnerStatus:req.body.DeliveryPartnerStatus,DeliveryPartnerDetails:req.body.DeliveryPartnerDetails,Status:'Completed'}})
  .then((orderdetails)=> res.send(orderdetails))
    .catch((error)=>console.log(error));

}
else{
  OrderDetails.findOneAndUpdate({RestaurantId: req.params.RestaurantId,_id:req.params._id,ActiveYn:req.params.ActiveYn,DeleteYn:req.params.DeleteYn,DeliveryPartnerStatus:req.body.PreviousStatus}, {$set: {DeliveryPartnerStatus:req.body.DeliveryPartnerStatus,DeliveryPartnerDetails:req.body.DeliveryPartnerDetails}})
  .then((orderdetails)=> res.send(orderdetails))
    .catch((error)=>console.log(error));
}



                                    }),


                                    // -------------------------------sms----------------------------------


                                    app.post('/sendMessage', (req,res)=>{

                                      var options = {authorization : 'eu4WQRvGTkypH5U1IJNzEislmfXc3b6S2t9P0rADnoOgZ8L7hq7ramfGJ1NWkQobOKjqVwY4pHZCn3Su' , message : req.body.message ,  numbers : [req.body.number]}
                                  fast2sms.sendMessage(options).then(response=>{
                                      console.log(response)
                                    })



                                  })

                                  app.get('/orderdetails/:ActiveYn/:DeleteYn/:RestId/:CreatedDate/',(req,res)=>{

                                    console.log("get all orders from order details 11111");
                                    OrderDetails.find({ActiveYn:req.params.ActiveYn,DeleteYn:req.params.DeleteYn,RestaurantId:req.params.RestId,CreatedDate:req.params.CreatedDate})
                                    .then(orderdetails=>res.send(orderdetails))
                                    .catch((error)=>console.log(error));
                                });




                                 app.get('/delivery/orderdetails/:ActiveYn/:DeleteYn/:CreatedDate/',(req,res)=>{
                                   console.log("delivery get filtered orders");

                                   console.log("get all orders from order details 11111");
                                   OrderDetails.find({ActiveYn:req.params.ActiveYn,DeleteYn:req.params.DeleteYn,CreatedDate:req.params.CreatedDate})
                                  .then(orderdetails=>res.send(orderdetails))
                                  .catch((error)=>console.log(error));
                               });

                              //   app.get('/orderdetails/:ActiveYn/:DeleteYn:/:CreatedDate/:UserId/',(req,res)=>{


                              //     OrderDetails.find({ActiveYn:req.params.ActiveYn,DeleteYn:req.params.DeleteYn,CreatedDate:req.params.CreatedDate,CreatedBy:req.params.UserId})
                              //     .then(orderdetails=>res.send(orderdetails))
                              //     .catch((error)=>console.log(error));
                              // });


                              app.get('/restaurants/:restId/mainmenus/products/:suggestion',(req,res)=>{
console.log("suggestion entered");
                                Products.find({RestaurantId: req.params.restId,Suggestion:req.params.suggestion})
                                .then(Products=>res.send(Products))
                                .catch((error)=>console.log(error));
                            });


                            app.get('/coupons/:Code/:ActiveYn/:ValidTo',(req,res)=>{
                              console.log("coupons entered");
                                                              Coupons.find({ActiveYn: true,DeleteYn:false,Code:req.params.Code,'ValidTo':req.params.ValidTo})
                                                              .then(Coupons=>res.send(Coupons))
                                                              .catch((error)=>console.log(error));
                                                          });

                                                          app.get('/coupons/:ActiveYn',(req,res)=>{
                                                            console.log("coupons entered");
                                                                                            Coupons.find({ActiveYn: true,DeleteYn:false})
                                                                                            .then(Coupons=>res.send(Coupons))
                                                                                            .catch((error)=>console.log(error));
                                                                                        });

                                                          app.post('/coupons',(req,res)=>{


                                                            (new Coupons ({'Code':req.body.Code,'CodeDescription':req.body.CodeDescription,'ValidFrom':req.body.ValidFrom,'ValidTo':req.body.ValidTo,'ActiveYn':req.body.ActiveYn,'DeleteYn':req.body.DeleteYn,'Discount':req.body.Discount}))
                                                            .save()
                                                            .then((Coupons)=> res.send(Coupons))
                                                            .catch((error)=>console.log(error));

                                                        });


 //app.listen(3000, () => console.log("Server is connected on port 3000"));
app.listen(port, () => console.log("Server is connected on port "+port));
