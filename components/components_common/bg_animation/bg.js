export const component = {
  prerender: false,
  render,
  parentDomID: "bg_box_",
};

function render() {
  document.getElementById(component.parentDomID + 1).style.backgroundImage =
    "URL(../../../media/background/0001.png";
  setTimeout(() => tick_background(2, 2), 250);
}

function tick_background(value, parent) {
  let zeros = 4 - value.toString().length;
  let imgString = "";
  console.log(zeros);
  while (zeros > 0) {
    imgString += "0";
    zeros--;
  }
  imgString += value.toString();
  imgString += ".png";
  imgString = "../../../media/background/" + imgString;
  console.log(imgString);
  console.log(document.getElementById(component.parentDomID + parent));
  document.getElementById(
    component.parentDomID + parent
  ).style.backgroundImage = `URL(${imgString})`;

  value += 2;
  if (parent === 1) {
    setTimeout(
      () =>
        (document.getElementById(component.parentDomID + 2).style.display =
          "none"),
      150
    );
    document.getElementById(component.parentDomID + 1).style.display = "flex";
    parent = 2;
  } else {
    setTimeout(
      () =>
        (document.getElementById(component.parentDomID + 1).style.display =
          "none"),
      150
    );
    document.getElementById(component.parentDomID + 2).style.display = "flex";
    parent = 1;
  }
  if (value < 361) {
    setTimeout(() => tick_background(value, parent), 150);
  } else {
    setTimeout(tick_background(1, 1), 150);
  }
}
