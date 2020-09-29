import { getRole } from "@/request/role";
import router from "@/router"
let taglist = localStorage.getItem('taglist') ? JSON.parse(localStorage.getItem('taglist')) : "";
export default {
    namespaced:true,
    state: {
      taglist: taglist  //角色列表
      
    },
    getters: {
        taglist:state=>state.taglist
    },
    mutations: { 
        SET_TAGS(state, route) {
            //判断是否存在，存在则不添加
            let isExist = state.taglist.some(val => {
             return val.path==route.fullPath
            })
            if (!isExist) {
                  state.taglist.push({
                name: route.meta.title,
                path:route.fullPath
            })
            }
            localStorage.setItem('taglist',JSON.stringify(state.taglist))
        },
        DEL_TAGS(state, {index,isActive}) {
            if (isActive) {
              
            state.taglist.splice(index,1)
                if (state.taglist.length) {
                    if (index == 0) {
                        router.push(state.taglist[index].path)
                    } else {
                        router.push(state.taglist[index-1].path)
                    }
               

            }else{
                router.push('/')
            }
            }else{state.taglist.splice(index,1)}
            
           
            
        },
        DEL_ALL(state) {
            state.taglist = [];
            router.push("/")
            localStorage.removeItem('taglist')
        },
        DEL_OTHER_ALL(state, path) {
          
            state.taglist = state.taglist.filter(val => val.path == path)
            localStorage.setItem('taglist',JSON.stringify(state.taglist))
        }
     
    },
    actions: {
        
    }
};