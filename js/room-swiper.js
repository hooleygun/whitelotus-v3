var swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    //dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  }
});

var rooms = document.getElementsByClassName("room-info-container");
var roomsId = [];
var roomsDots = document.getElementsByClassName("rooms-dot");

rooms_base();

function rooms_base(){

    for (i = 0; i < rooms.length; i++){
        roomsId.push(rooms[i].id);
    };

    currentRoom("room-index-1")
}

function currentRoom(n){
    showRoom(currentRoomId = "room-index-" + String(n));
}

function showRoom(m){
    for (i = 0; i < roomsDots.length; i++){
        roomsDots[i].className = roomsDots[i].className.replace("active","");
    }
    for(i = 0; i < rooms.length; i++){
        if (i + 1 == Number(m.slice(-1))){
            rooms[i].style.display = "block";
            roomsDots[i].className += " active";
        }
        else {
            rooms[i].style.display = "none";
        }
    };
}