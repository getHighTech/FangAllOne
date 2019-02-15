import { observable, action, computed } from "mobx";
import { api } from "../../api";
// import { auth } from "../../api";
// import { AUTH } from "../../constants/API";
import { UPDATE } from './../../constants/API';

export class HomeBannerStore{
    @observable img=[]
    @observable name='zsx'
    @action getImg(value:any){
        
        return this.img = value;
    }
    @computed get userId(){
        return window.localStorage.getItem('fang_userId');

    }
    @computed get token(){
        return window.localStorage.getItem('fang_token');
    }
    @action async upload(cb:Function=(msg:any)=>{}){
        console.log('1232131231231231232312312');
        
        let img = this.img;
        console.log(img);
        console.log(this.userId);
        
        api('home_banners',UPDATE,{id:this.userId},{
            images:img
        }).then((rlt:any)=>{
            console.log(rlt);
            
            
        })
        
        
    }
}

const homeBannerStore = new HomeBannerStore()

export default homeBannerStore;