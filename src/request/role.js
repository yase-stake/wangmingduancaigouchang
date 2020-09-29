import $axios from "@/common/http"


/**
 * 添加菜单
 * @param {*} data  添加的数据
 */
export async function getRole() {
    let res = await $axios.get("/rolelist")
    console.log(res)
    if (res.code == 200 && res.list) {
        return res.list
    } else {
        return [];
    }


}



export async function addRole(data) {
    return await $axios.post("/roleadd", data)

}




export async function editRole(data) {
    return await $axios.post("/roleedit", data)
    console.log(res)
}


/**
 * 添加菜单
 * @param {*} id  删除的数据
 */
export async function delRole(id) {
    return await $axios.post("/roledelete", { id })
    // console.log(res)
}