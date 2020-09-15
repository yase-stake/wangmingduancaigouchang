import $axios from "@/common/http"
 

/**
 * 添加菜单
 * @param {*} data  添加的数据
 */
export async function getMenu() {
    let res = await $axios.get("menulist?istree=1")
    console.log(res)
    if (res.code == 200 && res.list) {
        return res.list
    } else {
        return [];
    }


}



export async function addMenu(data) {
    return await  $axios.post("/menuadd", data)

}


 

export async function editMenu(data) {
    let res = await $axios.post("/menuedit", data)
    console.log(res)
}


export async function delMenu(data) {
    let res = await $axios.post("/menudelete", data)
    console.log(res)
}