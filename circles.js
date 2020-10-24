var c,
    ctx,
    width,
    height,
    minR,
    maxR,
    totalCircles,
    createCircleAttempts;

var toggle_canvas,
    change_color,
    lerp_colors,
    no_color,
    random_color,
    black_lines,
    white_lines,
    gradient_selection_picker,
    lerp_selection_picker1,
    lerp_selection_picker2,
    random_gradient,
    chosen_gradient,
    line_color;

var circles = [];
var iter = 1;
var backgroundColor = 1;
var colorselection;

var r = 255 * Math.random() | 0;
var g = 255 * Math.random() | 0;
var b = 255 * Math.random() | 0;

var circles = [];
var iter = 1;
var colorselection;
var ranColor1, ranColor2, ranColor3;
var bkg = 255;

line_color = 0;

function setup() {
    colorselection = "gradient";
    strokeWeight(2);
    minR = 2;
    maxR = 100;

    ranColor1 = color(random(255), random(255), random(255));
    if (isMobileDevice()) {
        c = createCanvas(displayWidth * pixelDensity(), displayWidth * pixelDensity() - 100);
        c.parent("sketch");
    } else {
        c = createCanvas(windowHeight * (2 / 3), windowHeight * (2 / 3));
        c.parent("sketch");

    }


    background(bkg);

    slider = createSlider(1, 2000, 500, 1);
    slider.parent("sliders");
    slider.class("slider");
    slider.input(function() {
        document.getElementById("slider_value").innerHTML = slider.value();
        totalCircles = slider.value();
        createCircleAttempts = slider.value();
        circles.length = 0;
        clear();
        background(bkg);
        redraw();
    });

    document.getElementById("slider_value").innerHTML = slider.value();

    gradient_selection_picker = createColorPicker(ranColor1);
    gradient_selection_picker.class("colorpickers");
    gradient_selection_picker.parent("gradient_color_picker");
    gradient_selection_picker.changed(function() {
        colorselection = "gradient"
        circles.length = 0;
        clear();
        background(bkg);
        redraw();
    });

    lerp_selection_picker1 = createColorPicker("#FFFFFF");
    // lerp_selection_picker1.size(100,25);
    lerp_selection_picker1.parent("lerp_color_div");
    lerp_selection_picker1.class("colorpickers");
    lerp_selection_picker1.changed(function() {
        colorselection = "lerp";
        circles.length = 0;
        clear();
        background(bkg);
        redraw();
    });

    lerp_selection_picker2 = createColorPicker("#FFFFFF");
    // lerp_selection_picker2.size(100,25);
    lerp_selection_picker2.parent("lerp_color_div");
    lerp_selection_picker2.class("colorpickers");
    lerp_selection_picker2.changed(function() {
        colorselection = "lerp";
        circles.length = 0;
        clear();
        background(bkg);
        redraw();
    });

    toggle_canvas = createButton("Toggle Canvas Color");
    toggle_canvas.parent("buttons_no_color_picker");
    toggle_canvas.class("buttons");
    toggle_canvas.mousePressed(function() {
        toggle_bkg();
        circles.length = 0;
        redraw();
    })

    random_gradient = createButton("Random Gradient");
    random_gradient.parent("buttons_no_color_picker");
    random_gradient.class("buttons");
    random_gradient.mousePressed(function() {
        colorselection = "gradient";
        gradient_selection_picker.remove();
        gradient_selection_picker = createColorPicker(color(random(255), random(255), random(255)));
        gradient_selection_picker.size(200, 25);
        gradient_selection_picker.parent("gradient_color_picker");
        gradient_selection_picker.class("colorpickers");
        gradient_selection_picker.changed(function() {
            colorselection = "gradient"
            circles.length = 0;
            clear();
            background(bkg);
            redraw();
        });
        circles.length = 0;
        clear();
        background(bkg);
        redraw();
    });


    random_color = createButton("Random Colors");
    random_color.parent("buttons_no_color_picker");
    random_color.class("buttons");
    random_color.mousePressed(function() {
        colorselection = "random";
        circles.length = 0;
        clear();
        background(bkg);
        redraw();
    });

    no_color = createButton("No Color");
    no_color.parent("buttons_no_color_picker");
    no_color.class("buttons");
    no_color.mousePressed(function() {
        colorselection = "none";
        circles.length = 0;
        clear();
        background(bkg);
        redraw();
    });

    black_lines = createButton("black outline");
    black_lines.parent("outline_buttons");
    black_lines.class("buttons");
    black_lines.mousePressed(function() {
        line_color = 0;
        circles.length = 0;
        clear();
        background(bkg);
        redraw();
    });

    white_lines = createButton("white outline");
    white_lines.parent("outline_buttons");
    white_lines.class("buttons");
    white_lines.mousePressed(function() {
        line_color = 255;
        circles.length = 0;
        clear();
        background(bkg);
        redraw();
    });
}

function createAndDrawCircle() {
    var newCircle;
    var safe = false;
    var color1, color2;

    for (var tries = 0; tries < createCircleAttempts; tries++) {
        newCircle = {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height),
            radius: minR
        }
        if (collision(newCircle)) {
            continue;
        } else {
            safe = true;
            break;
        }
    }
    if (!safe) {
        return;
    }

    for (var radiusSize = minR; radiusSize < maxR; radiusSize++) {
        newCircle.radius = radiusSize;
        if (collision(newCircle)) {
            newCircle.radius--;
            break;
        }
    }
    circles.push(newCircle);
    stroke(line_color);
    if (colorselection == "gradient") {
        if (random() > .5) {
            let lerp = color(255, 255, 255);
            color1 = lerpColor(lerp, gradient_selection_picker.color(), random());
        } else {
            let lerp = color(0, 0, 0);
            color1 = lerpColor(lerp, gradient_selection_picker.color(), random());
        }
        fill(color1);
    } else if (colorselection == "none") {
        fill(bkg);
    } else if (colorselection == "lerp") {
        fill(lerpColor(lerp_selection_picker1.color(), lerp_selection_picker2.color(), random()))
    } else if (colorselection == "random") {
        fill(color(random(255), random(255), random(255)));
    }
    circle(newCircle.x, newCircle.y, 2 * newCircle.radius);
}

function collision(circle) {
    for (var i = 0; i < circles.length; i++) {
        var otherCircle = circles[i];
        var a = circle.radius + otherCircle.radius;
        var x = circle.x - otherCircle.x;
        var y = circle.y - otherCircle.y;

        if (a >= Math.sqrt((x * x) + (y * y))) {
            return true;
        }
    }
    if (circle.x + circle.radius >= width || circle.x - circle.radius <= 0) {
        return true;
    }
    if (circle.y + circle.radius >= height || circle.y - circle.radius <= 0) {
        return true;
    }

    return false;
}

function draw() {
    totalCircles = slider.value();
    createCircleAttempts = slider.value();
    for (var i = 0; i < totalCircles; i++) {
        // iter++;
        createAndDrawCircle();
    }
    noLoop();
}

function toggle_bkg() {
    if (bkg == 255) {
        bkg = 0;
        background(bkg);
    } else {
        bkg = 255;
        background(bkg);
    }
}

function windowResized() {

    if (isMobileDevice()) {
        resizeCanvas(displayWidth * pixelDensity(), displayWidth * pixelDensity());
    } else {
        resizeCanvas(windowHeight * (2 / 3), windowHeight * (2 / 3));

    }
    background(bkg);
    circles.length = 0;
    draw();
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};
