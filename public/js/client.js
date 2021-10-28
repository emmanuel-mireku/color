const gradientElements = ['degree', 'red1', 'blue1', 'green1', 'alpha1', 'percent1', 'red2', 'blue2', 'green2', 'alpha2', 'percent2'];
const rgbElements = ['rgb-red', 'rgb-green', 'rgb-blue'];

// generate a random number for the color values
const randomNumber = () => Math.floor((Math.random() * 255) + 1);

// change the color of the gradient values and update the backgrounds of all the elements that are of gradients
const changeGradientColor = () => {
    let gradientDegree = document.getElementById("degree").querySelector("input").value;
    let gradientRed1 = document.getElementById("red1").querySelector("input").value;
    let gradientBlue1 = document.getElementById("blue1").querySelector("input").value;
    let gradientGreen1 = document.getElementById("green1").querySelector("input").value;
    let gradientAlpha1 = document.getElementById("alpha1").querySelector("input").value;
    let gradientPercent1 = document.getElementById("percent1").querySelector("input").value;
    let gradientRed2 = document.getElementById("red2").querySelector("input").value;
    let gradientBlue2 = document.getElementById("blue2").querySelector("input").value;
    let gradientGreen2 = document.getElementById("green2").querySelector("input").value;
    let gradientAlpha2 = document.getElementById("alpha2").querySelector("input").value;
    let gradientPercent2 = document.getElementById("percent2").querySelector("input").value;
    let color = `linear-gradient(${gradientDegree}deg, rgba(${gradientRed1}, ${gradientGreen1}, ${gradientBlue1}, ${gradientAlpha1}) ${gradientPercent1}%, rgba(${gradientRed2}, ${gradientGreen2}, ${gradientBlue2}, ${gradientAlpha2}) ${gradientPercent2}%)`;
    document.getElementById("gradient-modal").style.backgroundImage = color;
    document.getElementById("gradient").style.backgroundImage = color;
    document.getElementById("gradient-name").innerText = `background-image: ${color}`;
};

// change the color of the rgb values and update the backgrounds of all the elements that are of rgb
const changeRGBColor = () => {
    let red = document.getElementById("rgb-red").querySelector("input").value;
    let green = document.getElementById("rgb-green").querySelector("input").value;
    let blue = document.getElementById("rgb-blue").querySelector("input").value;
    let color = `rgb(${red}, ${blue}, ${green})`;
    document.getElementById("rgb-modal").style.backgroundColor = color;
    document.getElementById("rgb").style.backgroundColor = color;
    document.getElementById("rgb-code").innerText = `background-color: ${color}`;
}


// Call all the changeGradientColor whenever the input value is changed
for (let i = 0; i < gradientElements.length; i++) {
    document.getElementById(gradientElements[i]).querySelector("input").addEventListener('input', changeGradientColor);
    document.getElementById(gradientElements[i]).querySelector("input").addEventListener('input', () => {
        document.getElementById(gradientElements[i]).querySelector("p span").innerHTML = document.getElementById(gradientElements[i]).querySelector("input").value;
    });
}

// Call all the changeGradientColor whenever the input value is changed
for (let i = 0; i < rgbElements.length; i++) {
    document.getElementById(rgbElements[i]).querySelector("input").addEventListener("input", changeRGBColor);
    document.getElementById(rgbElements[i]).querySelector("input").addEventListener("input", () => {
        document.getElementById(rgbElements[i]).querySelector("p span").innerHTML = document.getElementById(rgbElements[i]).querySelector("input").value;
    });

    // use the values on the input to send a request to get the appropriate color name for the rgb
    document.getElementById(rgbElements[i]).querySelector("input").addEventListener("change", () => {
        let red = document.getElementById("rgb-red").querySelector("input").value;
        let green = document.getElementById("rgb-green").querySelector("input").value;
        let blue = document.getElementById("rgb-blue").querySelector("input").value;
        let color = `rgb(${red}, ${blue}, ${green})`;
        fetch('/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify({
                c: color
            })
        }).then(response => {
            return response.json();
        }).then(data => {
            document.getElementById("rgb-name").innerText = data.name;
        }).catch(error => {
            console.error("Error:", error);
        })
    });
}


const randomizeRGB = () => {
    // change the rgb input values to random values.
    let red = document.getElementById("rgb-red").querySelector("input").value = randomNumber().toString();
    let green = document.getElementById("rgb-green").querySelector("input").value = randomNumber().toString();
    let blue = document.getElementById("rgb-blue").querySelector("input").value = randomNumber().toString();

    // update the rgb number on the input
    document.getElementById("rgb-red").querySelector("p span").innerHTML = red;
    document.getElementById("rgb-green").querySelector("p span").innerHTML = green;
    document.getElementById("rgb-blue").querySelector("p span").innerHTML = blue;

    // set the color to be sent for the request to get the name and also to be used to update the backgrounds of all rgb elements
    let color = `rgb(${red}, ${blue}, ${green})`;

    // change the color background of all rgb elements
    document.getElementById("rgb-modal").style.backgroundColor = color;
    document.getElementById("rgb").style.backgroundColor = color;
    document.getElementById("rgb-code").innerText = `background-color: ${color}`;

    // fetch the color and update the name of the color.
    fetch('/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json;charset=utf-8'},
        body: JSON.stringify({
            c: color
        })
    }).then(response => {
        return response.json();
    }).then(data => {
        document.getElementById("rgb-name").innerText = data.name;
    });
}


const randomizeGradient = () => {
    // change the gradient input values to random values.
    let gradientDegree = document.getElementById("degree").querySelector("input").value = Math.floor((Math.random() * 360) + 1).toString();
    let gradientRed1 = document.getElementById("red1").querySelector("input").value = randomNumber().toString();
    let gradientBlue1 = document.getElementById("blue1").querySelector("input").value = randomNumber().toString();
    let gradientGreen1 = document.getElementById("green1").querySelector("input").value = randomNumber().toString();
    let gradientAlpha1 = document.getElementById("alpha1").querySelector("input").value = Math.random().toFixed(2);
    let gradientPercent1 = document.getElementById("percent1").querySelector("input").value = Math.floor((Math.random() * 100) + 1).toString();
    let gradientRed2 = document.getElementById("red2").querySelector("input").value = randomNumber().toString();
    let gradientBlue2 = document.getElementById("blue2").querySelector("input").value = randomNumber().toString();
    let gradientGreen2 = document.getElementById("green2").querySelector("input").value = randomNumber().toString();
    let gradientAlpha2 = document.getElementById("alpha2").querySelector("input").value = Math.random().toFixed(2);
    let gradientPercent2 = document.getElementById("percent2").querySelector("input").value = "100";

    // set the color to be sent for the request to get the name and also to be used to update the backgrounds of all rgb elements
    let color = `linear-gradient(${gradientDegree}deg, rgba(${gradientRed1}, ${gradientGreen1}, ${gradientBlue1}, ${gradientAlpha1}) ${gradientPercent1}%, rgba(${gradientRed2}, ${gradientGreen2}, ${gradientBlue2}, ${gradientAlpha2}) ${gradientPercent2}%)`;

    // change the color background of all rgb elements
    document.getElementById("gradient-modal").style.backgroundImage = color;
    document.getElementById("gradient").style.backgroundImage = color;
    document.getElementById("gradient-name").innerText = `background-image: ${color}`;

    // update the gradient number on the input
    document.getElementById("degree").querySelector("p span").innerHTML = gradientDegree;
    document.getElementById("red1").querySelector("p span").innerHTML = gradientRed1;
    document.getElementById("blue1").querySelector("p span").innerHTML = gradientBlue1;
    document.getElementById("green1").querySelector("p span").innerHTML = gradientGreen1;
    document.getElementById("alpha1").querySelector("p span").innerHTML = gradientAlpha1;
    document.getElementById("percent1").querySelector("p span").innerHTML = gradientPercent1;
    document.getElementById("red2").querySelector("p span").innerHTML = gradientRed2;
    document.getElementById("blue2").querySelector("p span").innerHTML = gradientGreen2;
    document.getElementById("green2").querySelector("p span").innerHTML = gradientBlue2;
    document.getElementById("alpha2").querySelector("p span").innerHTML = gradientAlpha2;
    document.getElementById("percent2").querySelector("p span").innerHTML = gradientPercent2;
}

// generate random colors whenever clicked.
document.getElementById("randomize-rgb").addEventListener("click", randomizeRGB, false);
document.getElementById("randomize-gradient").addEventListener("click", randomizeGradient, false);


$(document).ready(function () {
    $(".title").lettering();
});





