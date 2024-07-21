'use strict';

const geolib = require('geolib')
module.exports = {
  async bootstrap({ strapi }) {
    const  category  = require("./api/category/controllers/category")
    // generic subscribe for generic handling
    strapi.db.lifecycles.subscribe(async(event) => {
      if (event.action === 'afterCreate' && event.model.collectionName === 'orders') {
      const data = event.params.data
      const order = await strapi.db.query('api::order.order').findOne({
        where: { createdAt:data?.createdAt },
        populate:{  services: true, // Ensure this is the correct relation name
        service_carts: true // Ensure this is the correct relation name
      }
      })
      const providers = await strapi.db.query('api::provider.provider').findMany({
        populate:{orders:true,categories:{
          fields: ['*'],
        }}
      })
      // console.log("the created order was ",order)
      // Calculate distances from providers to the order
      const providersWithDistances = await Promise.all(
        providers.map(async (provider) => {
          if (
            provider?.googleMapLocation?.coordinate?.latitude &&
            provider?.googleMapLocation?.coordinate?.longitude &&
            order?.googleMapLocation?.coordinate?.latitude &&
            order?.googleMapLocation?.coordinate?.longitude
          ) {
            const distance = geolib.getDistance(
              {
                latitude: provider?.googleMapLocation?.coordinate?.latitude,
                longitude: provider?.googleMapLocation?.coordinate?.longitude,
              },
              {
                latitude: order?.googleMapLocation.coordinate?.latitude,
                longitude: order?.googleMapLocation?.coordinate?.longitude,
              }
            );
            return { provider, distance };
          }
          return { provider, distance: null };
        })
      );
      

    // Filter providers within a maximum distance
    const maxDistance =  50000; // Maximum distance in meters
    const nearbyProviders = providersWithDistances.filter(({ distance }) => distance <= maxDistance);

    nearbyProviders.sort((a, b) => a.distance - b.distance);
    if (nearbyProviders.length > 0) {
      // console.log("neare provider are",providersWithDistances)
     const filteredNearestproviders =  nearbyProviders.map((nearProvider)=>{
        const MatchedCategories = nearProvider?.provider?.categories?.filter((category)=>{
          return Number(category?.id)  === Number(order?.category_id)
        })
       return MatchedCategories?.length > 0 ? nearProvider : null
      })
      filteredNearestproviders?.map(async(SelectedProvider)=>{
        try {
          if(SelectedProvider?.provider){

            // console.log("the nearest provider is and sending notifcatio nto  ",SelectedProvider?.provider)
            await  sendPushNotification(SelectedProvider?.provider?.expoPushNotificationToken, "🎉 طلب جديد في انتظارك",
            "عزيزي مقدم الخدمة، لديك طلب جديد في فئة مشترك فيها. قم بالتحقق والاستعداد لتقديم أفضل خدمة لعملائك"
            );
            console.log("push notifacation was sent to ",SelectedProvider?.provider?.expoPushNotificationToken)
          }
        } catch (error) {
          console.log("error sending notifcation to the users ",error)
        }
      })
    }
      }
    });
  }
}

async function sendPushNotification(expoPushToken,title,body) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: title,
    body: body,
    data: { someData: 'goes here' },
    icon: "../public/icon4.png", // Replace "your_icon_name_here" with the actual name of your icon file

  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

//category 
// user categories 
//order data