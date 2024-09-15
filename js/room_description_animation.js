function roomDescriptionAnimation(roomIndex) {
  let descriptionBox = document.getElementById("room-txt-container-"+roomIndex);
  let downUpIcon = document.getElementById("description-donwup-icon-"+roomIndex);
  if (descriptionBox.style.transform != 'translateY(10px)') { //translateY(0%)
    descriptionBox.style.transform = 'translateY(10px)'; //translateY(0%)
    downUpIcon.style.transform = 'rotate(180deg)';
  } else {
    descriptionBox.style.transform = 'translateY(-95%)';
    downUpIcon.style.transform = 'rotate(0deg)';
  }
}