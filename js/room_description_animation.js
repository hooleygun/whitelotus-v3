function roomDescriptionAnimation(roomIndex) {
  let descriptionBox = document.getElementById("room-txt-container-"+roomIndex);
  let downUpIcon = document.getElementById("description-donwup-icon-"+roomIndex);
  if (descriptionBox.style.transform != 'translateY(10px)') {
    descriptionBox.style.transform = 'translateY(10px)';
    downUpIcon.style.transform = 'rotate(180deg)';
  } else {
    descriptionBox.style.transform = 'translateY(-100%)';
    downUpIcon.style.transform = 'rotate(0deg)';
  }
}