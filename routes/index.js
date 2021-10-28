const express = require('express');
const axios = require('axios').default;
const colorNames = require('color-names');

const router = express.Router();


const rGBAGenerator = () => {
    let red = Math.floor(Math.random() * 255) + 1;
    let green = Math.floor(Math.random() * 255) + 1;
    let blue = Math.floor(Math.random() * 255) + 1;
    let alpha = Math.random().toFixed(2);
    let color = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
    return {
        r: red,
        g: green,
        b: blue,
        a: alpha,
        rgba: color
    }
};


const rGBAtoHex = (rgb) => {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ?
        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
};

const gradientGenerator = () => {
    let color1 = rGBAGenerator();
    let color2 = rGBAGenerator();
    let degree = Math.floor(Math.random() * 360) + 1;
    let percent1 = Math.floor(Math.random() * 70) + 1;
    let percent2 = 100;
    let linearGradient = `linear-gradient(${degree}deg, ${color1.rgba} ${percent1}%, ${color2.rgba} ${percent2}%)`;
    return {
        col1: color1,
        col2: color2,
        deg: degree,
        p1: percent1,
        p2: percent2,
        gradient: linearGradient
    }
}


router.get('/', (req, res) => {
    let randomColor = rGBAGenerator();
    // console.log(`#${rGBAtoHex(rGBAGenerator().rgba)}`);
    // console.log(colorNames[`#${rGBAtoHex(rGBAGenerator().rgba)}`]);
    // console.log(colorNames[`#${rGBAtoHex(rGBAGenerator().rgba)}`]);
    // console.log(colorNames["#685558"]);
    let randomColorHex = rGBAtoHex(randomColor.rgba);
    let randomGradient = gradientGenerator();
    axios.get(`http://thecolorapi.com/id?hex=${randomColorHex}`)
        .then(response => {
            return res.render('index', {
                rgbRed: response.data.rgb.r,
                rgbGreen: response.data.rgb.g,
                rgbBlue: response.data.rgb.b,
                rgbVal: response.data.rgb.value,
                hexValue: response.data.hex.clean,
                gradient: gradientGenerator(),
                colorName: response.data.name.value,
                randomColorGenerator: rGBAGenerator()
            });
        })
});





router.post('/', (req, res) => {
    if (colorNames[`#${rGBAtoHex(req.body.c)}`] !== undefined){
        return res.json({name: colorNames[`#${rGBAtoHex(req.body.c)}`]})
    } else{
        axios.get(`http://thecolorapi.com/id?rgb=${req.body.c}`)
            .then(response => {
                return res.json({name: response.data.name.value});
            }).catch(error => {
            console.error("Error:", error)
        });
    }

});


module.exports = router;

