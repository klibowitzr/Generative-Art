var x1, x2, x3, x4, y1, y2, y3, y4, c;

var stop,
    restart,
    save_btn,
    line_btn,
    curve_btn,
    bezier_btn,
    square_btn,
    rectangle_btn,
    circle_btn,
    ellipse_btn,
    triangle_btn,
    quad_btn,
    round_rect_btn;

var increment_slider,
    alpha_slider;

var increment,
    alpha_value;

var solid_color_picker,
    lerp1_color_picker,
    lerp2_color_picker,
    lerpv21_color_picker,
    lerpv22_color_picker,
    lerpv31_color_picker,
    lerpv32_color_picker,
    background_colorPicker;

var xoffset = 0;
var lerp_round = 0;
var lerp_bkg = 0;
var colormode = "solid";
var shapemode = "line";
var bkg = 0;
var stroke_color;

increment = .001;
alpha_value = 20;

function setup() {
    if (isMobileDevice()) {
        c = createCanvas(displayWidth * pixelDensity(), displayWidth * pixelDensity() - 100);
        c.parent("sketch");
    } else {
        c = createCanvas(windowWidth / 2, windowHeight * 2 / 3);
        c.parent("sketch");
    }
    background(bkg);
    noFill();

    stop = createButton("stop");
    stop.parent("sys_buttons");
    stop.mousePressed(function() {
        noLoop();
    });

    restart = createButton("restart");
    restart.parent("sys_buttons");
    restart.mousePressed(function() {
        xoffset = random(50000);
        clear();
        background(bkg);
        loop();
        draw();
    });

    save_btn = createButton("save");
    save_btn.parent("sys_buttons");
    save_btn.mousePressed(function() {
        noLoop();
        save();
    });

    increment_slider = createSlider(.001, .02, .005, .001);
    increment_slider.parent("slider1");
    increment_slider.class("slider");
    increment_slider.input(function() {
        increment = increment_slider.value();
        draw();
        document.getElementById("time_increment_val").innerHTML = increment_slider.value();
    });

    document.getElementById("time_increment_val").innerHTML = increment_slider.value();

    alpha_slider = createSlider(0, 255, 20, 1);
    alpha_slider.parent("slider2");
    alpha_slider.class("slider");
    alpha_slider.input(function() {
        alpha_value = alpha_slider.value();
        stroke_color.setAlpha(alpha_value);
        stroke(stroke_color);
        draw();
        document.getElementById("alpha_slider_value").innerHTML = alpha_slider.value();
    })
    document.getElementById("alpha_slider_value").innerHTML = alpha_slider.value();

    solid_color_picker = createColorPicker(color(random(255), random(255), random(255)));
    solid_color_picker.parent("solid_color_picker");
    solid_color_picker.class("wide_color_picker");
    solid_color_picker.input(function() {
        colormode = "solid";
        stroke_color = solid_color_picker.color();
        stroke_color.setAlpha(alpha_value);
        stroke(stroke_color);
    });

    lerp1_color_picker = createColorPicker(color(255, 255, 255));
    lerp1_color_picker.parent("lerp_color_pickers");
    lerp1_color_picker.class("narrow_color_picker");
    lerp1_color_picker.changed(function() {
        clear();
        lerp_round = 0;
        colormode = "lerp";
        loop();
    });

    lerp2_color_picker = createColorPicker(color(255, 255, 255));
    lerp2_color_picker.parent("lerp_color_pickers");
    lerp2_color_picker.class("narrow_color_picker");
    lerp2_color_picker.changed(function() {
        clear();
        lerp_round = 0;
        colormode = "lerp";
        loop();
    });

    lerpv21_color_picker = createColorPicker(color(255, 255, 255));
    lerpv21_color_picker.parent("lerpv2_color_pickers");
    lerpv21_color_picker.class("narrow_color_picker");
    lerpv21_color_picker.changed(function() {
        clear();
        lerp_round = 0;
        colormode = "lerpv2";
        loop();
    });

    lerpv22_color_picker = createColorPicker(color(255, 255, 255));
    lerpv22_color_picker.parent("lerpv2_color_pickers");
    lerpv22_color_picker.class("narrow_color_picker");
    lerpv22_color_picker.changed(function() {
        clear();
        lerp_round = 0;
        colormode = "lerpv2";
        loop();
    });

    lerpv31_color_picker = createColorPicker(color(255, 255, 255));
    lerpv31_color_picker.parent("lerpv3_color_pickers");
    lerpv31_color_picker.class("narrow_color_picker");
    lerpv31_color_picker.changed(function() {
        clear();
        lerp_round = 0;
        colormode = "lerpv3";
        loop();
    });

    lerpv32_color_picker = createColorPicker(color(255, 255, 255));
    lerpv32_color_picker.parent("lerpv3_color_pickers");
    lerpv32_color_picker.class("narrow_color_picker");
    lerpv32_color_picker.changed(function() {
        clear();
        lerp_round = 0;
        colormode = "lerpv3";
        loop();
    });

    background_colorPicker = createColorPicker(color(0, 0, 0));
    background_colorPicker.parent("background_colorPicker");
    background_colorPicker.class("narrow_color_picker");
    background_colorPicker.changed(function() {
        bkg = background_colorPicker.color();
        background(bkg);
        loop();
    });

    bkg = background_colorPicker.color();

    line_btn = createButton("LINE");
    line_btn.class("button");
    line_btn.parent("shapes_col1");
    line_btn.mousePressed(function() {
        clear();
        background(bkg);
        shapemode = "line";
        loop();
    });

    curve_btn = createButton("CURVE");
    curve_btn.class("button");
    curve_btn.parent("shapes_col1");
    curve_btn.mousePressed(function() {
        clear();
        background(bkg);
        shapemode = "curve";
        loop();
    });

    bezier_btn = createButton("BEZIER");
    bezier_btn.class("button");
    bezier_btn.parent("shapes_col1");
    bezier_btn.mousePressed(function() {
        clear();
        background(bkg);
        shapemode = "bezier";
        loop();
    });

    square_btn = createButton("SQUARE");
    square_btn.class("button");
    square_btn.parent("shapes_col1");
    square_btn.mousePressed(function() {
        clear();
        background(bkg);
        shapemode = "square";
        loop();
    });

    rectangle_btn = createButton("RECTANGLE");
    rectangle_btn.class("button");
    rectangle_btn.parent("shapes_col1");
    rectangle_btn.mousePressed(function() {
        clear();
        background(bkg);
        shapemode = "rectangle";
        loop();
    });

    quad_btn = createButton("QUAD");
    quad_btn.class("button");
    quad_btn.parent("shapes_col2");
    quad_btn.mousePressed(function() {
        clear();
        background(bkg);
        shapemode = "quad";
        loop();
    });

    circle_btn = createButton("CIRCLE");
    circle_btn.class("button");
    circle_btn.parent("shapes_col2");
    circle_btn.mousePressed(function() {
        clear();
        background(bkg);
        shapemode = "circle";
        loop();
    });

    ellipse_btn = createButton("ELLIPSE");
    ellipse_btn.class("button");
    ellipse_btn.parent("shapes_col2");
    ellipse_btn.mousePressed(function() {
        clear();
        background(bkg);
        shapemode = "ellipse";
        loop();
    });

    triangle_btn = createButton("TRIANGLE");
    triangle_btn.class("button");
    triangle_btn.parent("shapes_col2");
    triangle_btn.mousePressed(function() {
        clear();
        background(bkg);
        shapemode = "triangle";
        loop();
    });

    round_rect_btn = createButton("ROUNDED <br> RECTANGLE");
    round_rect_btn.class("button");
    round_rect_btn.parent("shapes_col2");
    round_rect_btn.mousePressed(function() {
        clear();
        background(bkg);
        shapemode = "round_rect";
        loop();
    });

    stroke_color = solid_color_picker.color();
    stroke_color.setAlpha(alpha_value);
    stroke(stroke_color);
}

function draw() {
    if (colormode == "lerp") {
        if (lerp_round < 1) {
            stroke_color = lerpColor(lerp1_color_picker.color(), lerp2_color_picker.color(), lerp_round);
        } else if (lerp_round > 1 && lerp_round <= 2) {
            stroke_color = lerpColor(lerp2_color_picker.color(), lerp1_color_picker.color(), lerp_round - 1);
        } else {
            lerp_round = 0;
            stroke_color = lerpColor(lerp1_color_picker.color(), lerp2_color_picker.color(), lerp_round);
        }

        lerp_round += increment;
        stroke_color.setAlpha(alpha_value);
        stroke(stroke_color);
    } else if (colormode == "lerpv2") {
        stroke_color = lerpColor(lerpv21_color_picker.color(), lerpv22_color_picker.color(), noise(xoffset));
        stroke_color.setAlpha(alpha_value);
        stroke(stroke_color);
    } else if (colormode == "lerpv3") {
        stroke_color = lerpColor(lerpv31_color_picker.color(), lerpv32_color_picker.color(), random());
        stroke_color.setAlpha(alpha_value);
        stroke(stroke_color);
    }
    if (shapemode == "curve") {
        x1 = width * noise(xoffset + 40);
        y1 = width * noise(xoffset + 60);
        x2 = width * noise(xoffset + 80);
        y2 = width * noise(xoffset + 100);
        x3 = height * noise(xoffset + 120);
        y3 = height * noise(xoffset + 140);
        x4 = height * noise(xoffset + 160);
        y4 = height * noise(xoffset + 180);
        curve(x1, y1, x2, y2, x3, y3, x4, y4);
    } else if (shapemode == "line") {
        x1 = width * noise(xoffset + 40);
        y1 = width * noise(xoffset + 60);
        x2 = width * noise(xoffset + 80);
        y2 = width * noise(xoffset + 100);
        line(x1, y1, x2, y2);
    } else if (shapemode == "bezier") {
        x1 = width * noise(xoffset + 40);
        y1 = width * noise(xoffset + 60);
        x2 = width * noise(xoffset + 80);
        y2 = width * noise(xoffset + 100);
        x3 = height * noise(xoffset + 120);
        y3 = height * noise(xoffset + 140);
        x4 = height * noise(xoffset + 160);
        y4 = height * noise(xoffset + 180);
        bezier(x1, y1, x2, y2, x3, y3, x4, y4);
    } else if (shapemode == "ellipse") {
        x1 = width * noise(xoffset + 40);
        y1 = width * noise(xoffset + 60);
        x2 = width * noise(xoffset + 80);
        y2 = width * noise(xoffset + 100);
        ellipse(x1, y1, x2, y2);
    } else if (shapemode == "circle") {
        x1 = width * noise(xoffset + 40);
        y1 = width * noise(xoffset + 60);
        x2 = width * noise(xoffset + 80);
        circle(x1, y1, x2 / 2);
    } else if (shapemode == "quad") {
        x1 = width * noise(xoffset + 40);
        y1 = width * noise(xoffset + 60);
        x2 = width * noise(xoffset + 80);
        y2 = width * noise(xoffset + 100);
        x3 = height * noise(xoffset + 120);
        y3 = height * noise(xoffset + 140);
        x4 = height * noise(xoffset + 160);
        y4 = height * noise(xoffset + 180);
        quad(x1, y1, x2, y2, x3, y3, x4, y4);
    } else if (shapemode == "square") {
        x1 = width * noise(xoffset + 40);
        y1 = width * noise(xoffset + 60);
        x2 = width * noise(xoffset + 80);
        square(x1, y1, x2 / 4);
    } else if (shapemode == "rectangle") {
        x1 = width * noise(xoffset + 40);
        y1 = width * noise(xoffset + 60);
        x2 = width * noise(xoffset + 80);
        y2 = width * noise(xoffset + 100);
        rect(x1, y1, x2 / 3, y2 / 3);
    } else if (shapemode == "round_rect") {
        x1 = width * noise(xoffset + 40);
        y1 = width * noise(xoffset + 60);
        x2 = width * noise(xoffset + 80);
        y2 = width * noise(xoffset + 100);
        x3 = height * noise(xoffset + 120);
        y3 = height * noise(xoffset + 140);
        x4 = height * noise(xoffset + 160);
        y4 = height * noise(xoffset + 180);
        rect(x1, y1, x2 / 2, y2 / 2, x3, y3, x4, y4);
    } else if (shapemode == "triangle") {
        x1 = width * noise(xoffset + 40);
        y1 = width * noise(xoffset + 60);
        x2 = width * noise(xoffset + 80);
        y2 = width * noise(xoffset + 100);
        x3 = height * noise(xoffset + 120);
        y3 = height * noise(xoffset + 140);
        triangle(x1, y1, x2, y2, x3, y3);
    }

    xoffset += increment;
}

function windowResized() {
    clear();
    background(bkg);
    if (isMobileDevice()) {
        resizeCanvas(displayWidth * pixelDensity(), displayWidth * pixelDensity());
    } else {
        resizeCanvas(windowWidth / 2, windowHeight * (2 / 3));
    }
    clear();
    background(bkg);
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};
