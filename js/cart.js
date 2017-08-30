/*
* @Author: anchen
* @Date:   2017-08-23 21:47:24
* @Last Modified by:   anchen
* @Last Modified time: 2017-08-24 22:01:58
*/

new Vue({
    el:"#app",
    data:{
        totalMoney:0,
        producList:[],
        checkAllFlag: false,
        delFlag:false,
        curProduct: ''
    },
    filters:{
        formatMoney: function (value) {
            return value.toFixed(2);
        }
    },
    mounted:function (){
        this.$nextTick(function () {
            this.cartView();
        });
    },
    methods:{
        cartView:function (){
            var _this = this;
            this.$http.get("data/cart.json",{"id":123}).then(function (res) {
                _this.producList = res.body.result.list;
               // _this.totalMoney = res.body.result.totalMoney;
            });
        },
        countChange:function (product,way) {
            if(way>0){
                product.count++;
            }else{
                product.count--;
                if(product.count <1){
                    product.count = 0;
                }
            }
            this.totalPrice();
        },
        selectedProduct:function (item) {
            if(typeof item.checked == 'undefined'){
                //vue.set(item,"checked",true);
                this.$set(item,"checked",true);
            }else{
                item.checked = !item.checked;
            }
            this.totalPrice();
        },
        checkAll:function (flag) {
            this.checkAllFlag = flag;
            var _this = this;
            this.producList.forEach(function (item,index) {
                if(typeof item.checked == 'undefined'){
                    //vue.set(item,"checked",true);
                    _this.$set(item,"checked",_this.checkAllFlag);
                }else{
                    item.checked = _this.checkAllFlag;
                }
            });
            this.totalPrice();
        },
        totalPrice:function(){
            var _this = this;
            this.totalMoney = 0;
            this.producList.forEach(function (item,index) {
                if(item.checked){
                    _this.totalMoney += item.price*item.count;
                }
            });
        },
        delConfirm:function (item) {
            this.delFlag = true;
            this.curProduct = item;
        },
        delProduct:function () {
            var index = this.producList.indexOf(this.curProduct);
            this.producList.splice(index,1);
            this.delFlag = false;
        }
    }
});