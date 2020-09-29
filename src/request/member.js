import $axios from "@/common/http"



export async function getMember() {
    let res = await $axios.get("/memberlist")
    console.log(res)
    if (res.code == 200 && res.list) {
        return res.list
    } else {
        return [];
    }


}



export async function addMember(data) {
    return await $axios.post("/memberadd", data)

}




export async function editMember(data) {
    return await $axios.post("/memberedit", data)
    console.log(res)
}


/**
 * 添加菜单
 * @param {*} id  删除的数据
 */
export async function delMember(id) {
    return await $axios.post("/memberdelete", { id })
    // console.log(res)
}