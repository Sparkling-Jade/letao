$(function () {
    var letao = new Letao();
   
    letao.mainScroll();

    letao.getclassFication();

    letao.getBrand();
    
    letao.getBrandData(1);

})
var Letao = function () {

}

Letao.prototype = {

    
    mainScroll:function(){
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    
    },

     getclassFication:function(){
         
         $.ajax({
             url:'/category/queryTopCategory',
             success:function (data) {  
                 // console.log(data);
                 var html=template('categoryTmp',data);
                  $('.category-left ul').html(html);
             }

         })
     },

    getBrand:function(){
       
        var that=this;
         
        $('.category-left ul').on('tap','li a',function(){
             var id=$(this).data('id');
             that.getBrandData(id);
             $(this).parent().addClass('active').siblings().removeClass('active');
        })
    },

    getBrandData:function(id){

           $.ajax({
                url:"/category/querySecondCategory",
                data:{'id':id},
                success:function (data) {  
                    var html=template('brandTmp',data);

                    $('.category-right .mui-row').html(html);
         
                }
           })
    }
   
}