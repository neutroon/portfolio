function clear() {
  namee.value = "";
}

// toggle side bar
let sidBarBtn = document.getElementById("sidBarBtn");
let sidBar = document.getElementById("sidBar")
let main = document.getElementById("main");
//close
document.getElementById("mainDiv").addEventListener('click', function () {
  sidBarBtn.style.marginLeft = "0px";
  sidBarBtn.style.transform = "rotate(45deg)";
  sidBar.style.width = "0px";
});
//open
function openSidBar() {
  if (sidBar.style.width == "300px") {
    sidBarBtn.style.marginLeft = "0px";
    sidBarBtn.style.transform = "rotate(45deg)";
    sidBar.style.width = "0px";
  } else {
    sidBarBtn.style.marginLeft = "270px";
    sidBarBtn.style.transform = "rotate(225deg)";
    sidBar.style.width = "300px";
  }
}

// format input fields (prevent form add " and transfer it to ')
let inputs = document.querySelectorAll('.form-control');
inputs.forEach(input => {

  input.onkeyup = function () {
    regEx = /"+/g;
    let newValue = input.value.replaceAll(/"/g, "'");
    input.value = newValue;
    console.log(input.value);
  }
})


