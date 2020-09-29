import $axios from "@/common/http"


/**
 * 添加规格
 * @param {*} data  添加的数据
 */
export async function getFxGoods(fid,sid) {
    let res = await $axios.get("/goodslist", {
        params: {
            fid,
            sid
        }
    })
    console.log(res)
    if (res.code == 200 && res.list) {
        return res.list
    } else {
        return [];
    }


}



export async function addGoods(data) {
    return await $axios.post("/goodsadd", data)

}




export async function editGoods(data) {
    return await $axios.post("/goodsedit", data)
    console.log(res)
}


/**
 * 
 * @param {*} id 
 */
export async function delGoods(id) {
    return await $axios.post("/goodsdelete", { id })
    // console.log(res)
}


export async function getTotal() {
    let res = await $axios.get('/goodscount')
    return res.list[0].total
}
