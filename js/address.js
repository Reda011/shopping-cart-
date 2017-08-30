new Vue({
    el:".container",
    data:{
        addressList:[],
        limitNum:3,
        limit: true,
        currentIndex:0,
        mask:false,
        confirm:'',
        modify:false,
        name:'',
        address:'',
        tel:'',
        delFlag:false,
        shippingMethod:1
    },
    mounted: function () {
        this.$nextTick(function () {
            this.getAddressList();
        });
    },
    computed:{
        filterAddress:function () {
            return this.addressList.slice(0,this.limitNum);
        }
    },
    methods:{
        getAddressList:function () {
           this.$http.get('data/address.json').then((res) =>{
                this.addressList = res.body.result;
           });
        },
        loadMore:function (flag) {
           if(flag){
               this.limitNum = this.addressList.length;
           }else{
               this.limitNum = 3;
           };
           this.limit = !this.limit;
        },
        setDefault:function (addressId) {
            this.addressList.forEach(function (address,index) {
                if(address.addressId == addressId){
                    address.isDefault = true;
                }else{
                    address.isDefault = false;
                }
            })
        },
        modifyConfirm:function (address) {
            this.mask = true;
            this.modify = true;
            this.confirm = address;
        },
        saveModify:function () {
            var index = this.addressList.indexOf(this.confirm);
            if(this.name != ""){
                this.addressList[index].userName = this.name;
            };
            if(this.address !=""){
                this.addressList[index].streetName = this.address;
            };
            if(this.tel !=""){
                this.addressList[index].tel = this.tel;
            };
            this.mask = false;
            this.modify = false;
        },
        delConfirm:function (address) {
            this.delFlag = true;
            this.mask = true;
            this.confirm = address;
        },
        delAddress:function () {
            var index = this.addressList.indexOf(this.confirm);
            this.addressList.splice(index,1);
            this.delFlag = false;
            this.mask = false;
        }
    }
});