import { LIST, SHOW, SHOW_ID } from './../constants/API';
import { observable, action, computed, toJS } from "mobx";
import { api } from "./../api";


interface IQueryOptional{
    sort: Array<string>;
    page: number;
    pagesize: number;
}

export class DataContainer {
    @observable title = "";
    @observable dataSource = [];
    @observable columns = [];
    @observable belongsColumns = [];
    @observable hasManyColumn = [];
    @observable singleDataSource = {};
    @observable sourceName = "users";
    @observable loading = true;
    @observable loadingOne = true;
    @observable actionLoading = true;
    @observable page=1;
    @observable pagesize = 25;
    @observable sortDirection = 'DESC';//倒序还是逆序
    @observable sortColumn = "id";
    @observable condition = {}

    @computed get list(){
        return this.dataSource.slice() as Array<any>;
    }

    @computed get one(){
        return toJS(this.singleDataSource) as any;
    }

    @action setCondition(condition:any){
        return this.condition = condition;
    }

    @action setTitle(title:string){
        return this.title = title;
    }

    @action setSourceName(sourceName:string){
        return this.sourceName = sourceName;
    }


    @action getList(optional:IQueryOptional={sort: ['id', 'DESC'], page: 1, pagesize: 25},  cb: (msg: any)=> {}){
        cb('正在加载');
        if(!optional){
            optional = {sort: ['id', 'DESC'], page: 1, pagesize: 25}
        }
        const { page, pagesize, sort } = optional;

        if(!sort){
            optional.sort = ['id', 'DESC'];
        }
        if(page>0 && pagesize >0){
            this.page = page;
            this.pagesize = pagesize;
        }else{
            optional.page = this.page;
            optional.pagesize = this.pagesize;
        }
        
        return api(this.sourceName as any, LIST, toJS(this.condition), optional).then((rlt:any)=>{

            if(rlt.status === 203){
                this.loading = false;
                return cb( rlt.data);
            }
            this.dataSource = rlt.data;
            this.loading = false;
            cb('加载完毕!');


        }).catch((err:any)=>{
            console.error(err);
            
            this.loading = false;
            cb(err.error);
        });
    }

    @action sort(sortColumn:string, sortDirection:string, cb: (msg: any)=> {}){
        this.loading = true;
        return this.getList({sort: [sortColumn, sortDirection], page: this.page, pagesize:  this.pagesize}, cb);
    }

    @action getOne(optional:any,  cb: (msg: any)=> {}){
        return api(this.sourceName as any, SHOW, this.condition, optional).then((rlt:any)=>{
            this.singleDataSource = rlt.data;
            this.loading = false;

        }).catch((err:any)=>{
            this.loading = false;
            cb(err);
        });
    }

   @action getOneById(id:number, optional:any,  cb: (msg: any)=> {}){
    return api(this.sourceName as any, SHOW_ID, id, optional).then((rlt:any)=>{
        this.singleDataSource = rlt.data;
        this.loading = false;

    }).catch((err:any)=>{
        this.loading = false;
        cb(err);
    });
   }

    @action search(){

    }

   

    @action betweenCreatedTime(time:TimeRanges){

    }

    @action betweenUpdatedTime(time:TimeRanges){

    }

    @action updateSingleSource(condition:any, params:any){

    }

    @action updateDataSource(condition:any, params: any){

    }
    @action destoryDataSource(condition:any, params: any){

    }
    @action destorySingleSource(condition:any, params:any){

    }
}


const dataContainer = new DataContainer();


export default dataContainer;