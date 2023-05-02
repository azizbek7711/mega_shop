let el = e => document.querySelector(e);

function userMenuOpen(){
    el('.user-menu').classList.add('show')
}
function userMenuClose(){
    el('.user-menu').classList.remove('show')
    el('.user-menu').classList.add('hide')
    setTimeout(() =>{
        el('.user-menu').classList.remove('hide')
    }, 300)
}