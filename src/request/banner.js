import $axios from "@/common/http"


/**
 * 添加菜单
 * @param {*} data  添加的数据
 */
export async function getBanner() {
    let res = await $axios.get("bannerlist")
   
    if (res.code == 200 && res.list) {
        return res.list
    } else {
        return [];
    }


}



export async function addBanner(data) {
    return await $axios.post("/banneradd", data)

}




export async function editBanner(data) {
    return await $axios.post("/banneredit", data)
 
}


/**
 * 添加
 * @param {*} id  删除的数据
 */
export async function delBanner(id) {
    return await $axios.post("/bannerdelete", { id })
  
}