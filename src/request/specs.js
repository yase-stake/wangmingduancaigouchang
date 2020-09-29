import $axios from "@/common/http"


/**
 * 添加规格
 * @param {*} data  添加的数据
 */
export async function getSpecs(page=1,size=10) {
    let res = await $axios.get("/specslist", {
        params:{size,page}
    })
    console.log(res)
    if (res.code == 200 && res.list) {
        return res.list
    } else {
        return [];
    }


}



export async function addSpecs(data) {
    return await $axios.post("/specsadd", data)

}




export async function editSpecs(data) {
    return await $axios.post("/specsedit", data)
    console.log(res)
}


/**
 * 
 * @param {*} id 
 */
export async function delSpecs(id) {
    return await $axios.post("/specsdelete", { id })
    // console.log(res)
}


export async function getTotal() {
    let res = await $axios.get('/specscount')
    return res.list[0].total
}
