require.config({
  baseUrl: "/",
  paths: {
    "jquery": "libs/jquery/jquery-3.2.1",
    "header": "js/modules/header",
    "nav": "js/modules/nav",
    "footer": "js/modules/footer",
    "zoom": "libs/jquery-plugins/jquery.elevateZoom-3.0.8.min",
    "fly": "libs/jquery-plugins/jquery.fly.min",
    "swiper": "libs/swiper/dist/js/swiper.min",
    "url" : "js/modules/url",
    "template" : "libs/art-template/template-web"
  },
  shim:{
    zoom:{
      deps:['jquery']
    },
    
    fly:{
      deps:['jquery']
    }
  }
})