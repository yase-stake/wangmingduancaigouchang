import $axios from "@/common/http"


/**
 * 添加管理员
 * @param {*} data  添加的数据
 */
export async function getUser(page=1,size=10) {
    let res = await $axios.get("/userlist", {
        params:{size,page}
    })
    console.log(res)
    if (res.code == 200 && res.list) {
        return res.list
    } else {
        return [];
    }


}



export async function addUser(data) {
    return await $axios.post("/useradd", data)

}




export async function editUser(data) {
    return await $axios.post("/useredit", data)
    console.log(res)
}


/**
 * 添加管理员
 * @param {*} id  删除的用户uid
 */
export async function delUser(uid) {
    return await $axios.post("/userdelete", { uid })
    // console.log(res)
}


export async function getTotal() {
    let res = await $axios.get('/usercount')
    return res.list[0].total
}



//登录
export function Login(data) {
   return $axios.post('/userlogin',data)
   
}