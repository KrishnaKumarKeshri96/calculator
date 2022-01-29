let buttons = document.querySelector("div>div");
let h1 = document.querySelector("h2");
let btns = document.querySelectorAll("button");
let d = true;
//Disabling Button
Disable(btns);
function Disable(btns) {
  for (let i = 0; i < btns.length; i++) {
    if (
      btns[i].innerText == "+" ||
      btns[i].innerText == "x" ||
      btns[i].innerText == "÷" ||
      btns[i].innerText == "clear" ||
      btns[i].innerText == "="
    )
      btns[i].disabled = true;
  }
}

//Appended using Event Deligation

buttons.onclick = (e) => {
  let inn = e.target.innerText;

  if (inn == "=") {
    let char = "";
    let h = h1.innerText;

    let arr = [];
    for (let i = 0; i < h.length; i++) {
      if (h[i] !== "+" && h[i] !== "-" && h[i] !== "x" && h[i] !== "÷") {
        char += h[i];
      } else {
        if (char !== "") {
          arr.push(Number(char), h[i]);
          char = "";
        } else {
          arr.push(h[i]);
        }
      }
    }

    if (char !== "") {
      arr.push(Number(char));
    }
    Calculation(arr);
  } else {
    if (inn == "clear") {
      let btns = document.querySelectorAll("button");
      Disable(btns);
      h1.innerText = "";
      d = false;
    } else {
      if (h1.innerText == "Error") {
        h1.innerText = inn;
      } else {
        h1.innerText += inn;
      }

      d = true;
    }
  }

  if (h1.innerText == "-") e.target.disabled = true;

  if (String(Number(h1.innerText)) !== "NaN" && d) {
    for (let i = 0; i < btns.length; i++) {
      if (
        btns[i].innerText == "+" ||
        btns[i].innerText == "x" ||
        btns[i].innerText == "÷" ||
        btns[i].innerText == "clear" ||
        btns[i].innerText == "=" ||
        btns[i].innerText == "-"
      )
        btns[i].disabled = false;
    }
  }
};

function Calculation(arr) {
  console.log("arr:", arr);

  let first =
    typeof arr[0] == "number" ? arr[0] : Number(String(arr[0] + arr[1]));
  let output = first;
  let i = first == arr[0] ? 1 : 2;

  while (i < arr.length - 1) {
    if (arr[i] == "+") {
      // typeof arr[i + 1];
      console.log(" typeof arr[i + 1];:", typeof arr[i + 1]);
      output += arr[i + 1];
      i += 2;
    }
    if (arr[i] == "-") {
      output -= arr[i + 1];
      i += 2;
    }
    if (arr[i] == "x") {
      output *= arr[i + 1];
      i += 2;
    }
    if (arr[i] == "÷") {
      output /= arr[i + 1];
      i += 2;
    }
  }
  if (String(output) == "NaN") {
    h1.innerText = "Error";
  } else {
    h1.innerText = output;
  }
}
