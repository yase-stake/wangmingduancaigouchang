import $axios from "@/common/http"


/**
 * 添加菜单
 * @param {*} data  添加的数据
 */
export async function getCategory() {
    let res = await $axios.get("catelist?istree=1")
   
    if (res.code == 200 && res.list) {
        return res.list
    } else {
        return [];
    }


}



export async function addCategory(data) {
    return await $axios.post("/cateadd", data)

}




export async function editCategory(data) {
    return await $axios.post("/cateedit", data)
 
}


/**
 * 添加菜单
 * @param {*} id  删除的数据
 */
export async function delCategory(id) {
    return await $axios.post("/catedelete", { id })
  
}