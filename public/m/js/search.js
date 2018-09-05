$(function(){
    var letao=new Letao;
    letao.addHistory();
    letao.queryHistory();
    letao.removeHistory();
    letao.clearHistory();
})

var Letao=function(){

}

Letao.prototype={
   
    addHistory:function(){
        var that=this;
       $('.btn-search').on('tap',function(){
            //alert(111);
            var search=$('.input-search').val();
            $('.input-search').val('');
            if (!search.trim()) {
                alert('请输入你想要的宝贝'); 
                return;
            }
            
            var searchObj={
                'id':1,
                'search':search
         }

        // console.log(searchObj);
         
          var historyList=JSON.parse(localStorage.getItem('historyList')) || [];

          historyList=historyList.reverse();
           
           if (historyList.length>0) {
               searchObj.id=historyList[historyList.length-1].id+1;
           }
        
           historyList.push(searchObj);    

           localStorage.setItem('historyList',JSON.stringify(historyList));
       
            that.queryHistory();
       })
    },

    queryHistory:function(){
        var historyList=JSON.parse(localStorage.getItem('historyList')) || [];

        var html=template('historyTmp',{'rows':historyList});
         $('.search-history .content ul').html(html);
    },

    removeHistory:function () { 
        var that=this;
        $('.search-history .content ul').on('tap','.btn-delete',function(){
           // console.log(this);
           var id=$(this).data('id');
           // console.log(id);

           var historyList=JSON.parse(localStorage.getItem('historyList')) || [];
           
            for(var i=0;i<historyList.length;i++){
               if(historyList[i].id == id){
                   // console.log(historyList[i]);
                   historyList.splice(i,1);  
                    // console.log(historyList);
                       
               }
            }
            localStorage.setItem('historyList',JSON.stringify(historyList));

            that.queryHistory();
        })
     },

     clearHistory:function(){

          var that=this
         $('.btn-clear').on('tap',function(){
            localStorage.removeItem('historyList');

            that.queryHistory();
         })
     }
} 