
//show window to create room
const ctn_create_room = document.getElementById('create-room');
const btn_room = document.getElementById('btn-room');
btn_room.addEventListener('click', ()=>{
    ctn_create_room.classList.remove('invisible');
});
//show window to enter the room
const ctn_enter_room = document.getElementById('join-room');
const btn_join_room = document.getElementById('btn-join-room');
btn_join_room.addEventListener('click', ()=>{
    ctn_enter_room.classList.remove('invisible');
});
//close the window
const btn_close_popUp = document.getElementsByClassName('btn-close-pop-up');
btn_close_popUp[0].addEventListener('click', ()=>{
    ctn_create_room.classList.add('invisible');
});
btn_close_popUp[1].addEventListener('click', ()=>{
    ctn_enter_room.classList.add('invisible');
});