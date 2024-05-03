const $ = document.querySelector.bind(document);

const currentUserAPI = "http://localhost:3000/currentUser";
const cartAPI = "http://localhost:3000/carts";
const storageAPI = "http://localhost:3000/storage";
function getCurrentUser(callback) {
    fetch(currentUserAPI)
        .then(res => res.json())
        .then(callback);
}

getCurrentUser(user => {
    if (user.id != null) {
        let link_taikhoan = document.querySelector("#link_taikhoan");
        link_taikhoan.href = "user.html";
        link_taikhoan.innerHTML = 
        `
        <i class="bi bi-person-circle pe-2"></i>
        Xin chào ${user.username}
        `
    }
})
//-----------------------Log out -----------------------
const logoutBtn = $("#logout");
logoutBtn.addEventListener("click", event => {
    fetch(currentUserAPI, {
        method: 'PUT',
        body: JSON.stringify({
            id:null,
            username: "",
            role:""
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    window.location.href = "index.html";
})

//---------------------- Gio hang -----------------------
let cartDiv = $("#cart");

let storage = []
function getStorage() {
    fetch(storageAPI)
    .then(res => res.json())
    .then(res => storage = [...res])
}
getStorage()

//storage.then(item => console.log(item))

const currentUserID = fetch(currentUserAPI)
    .then(res => res.json())
    .then (user => user.id)

currentUserID.then(userid => {
    function getCart(callback) {
        fetch(`${cartAPI}/${userid}`)
            .then(res => res.json())
            .then(callback)
    }

    getCart(cart => {
        danhSachSP = cart.danhSachSP;
        console.log(storage)
        danhSachSP.forEach(item => {
            let sanPham = document.createElement("div");
            let masp = item.masp;
            let soluong = item.soluong;
            let tensp, imgURL;
            // for (let i = 0; i < storage.length; i++) {
            //     if (storage[i])
            // }
            storage.forEach(sp => {
                if (sp.masp === masp) {
                    tensp = sp.name;
                    imgURL = sp.photo1;
                }
            })
            sanPham.className = "container_fluid sp_container"
            sanPham.innerHTML = 
                `
                    
                        <div class="spImg_container"><img src="${imgURL}"></div>
                        <div class="spInfo_container">
                            ${tensp}
                            ${soluong}
                        </div>
                    
                `
            cartDiv.appendChild(sanPham)
        })
    })
})





