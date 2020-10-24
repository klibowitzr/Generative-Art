var angle_slider,
    branch_prob_slider,
    level_slider,
    growth_slider,
    scale_slider,
    a_var_slider,
    flower_prob_slider;

var angle,
    branch_prob,
    max_iter,
    scale_,
    growth,
    a_variance,
    flower_prob;

var c,
    colorPicker1,
    colorPicker2,
    random_tree,
    random_color_btn,
    creative_mode,
    regular_mode,
    bckg_radio,
    canvas_radio,
    line_radio;

var branch1,
    branch2,
    len,
    ranColor1,
    ranColor2;

var iter = 0;
var background_color = "white";
var canvas_color = "gray";
var stroke_color = "white";
var init_stroke = 15;
var random_colors = false;
var mode = "creative";

function setup() {
    if (isMobileDevice()) {
        c = createCanvas(displayWidth * pixelDensity(), displayWidth * pixelDensity());
        c.parent("sketch");
    } else {
        c = createCanvas(windowHeight * (2 / 3), windowHeight * (2 / 3));
        c.parent("sketch");

    }

    colorPicker1 = createColorPicker(color(random(255), random(255), random(255)));
    colorPicker1.class("colorpickers");
    colorPicker1.parent("colorpickers_container");
    colorPicker2 = createColorPicker(color(random(255), random(255), random(255)));
    colorPicker2.class("colorpickers")
    colorPicker2.parent("colorpickers_container");

    canvas_radio = createRadio();
    canvas_radio.option('black');
    canvas_radio.option('white');
    canvas_radio.option('gray');
    canvas_radio.parent("canvas_radios");
    canvas_radio.value('gray');

    line_radio = createRadio();
    line_radio.option('black');
    line_radio.option('white');
    line_radio.option('gray');
    line_radio.parent("line_radios");
    line_radio.value('white');

    random_tree = createButton("Random Tree");
    random_tree.parent("buttons_div2");
    random_tree.class("buttons");
    random_tree.mouseClicked(generateRandomTree);

    random_color_btn = createButton("Random Lerp");
    random_color_btn.parent("buttons_div2");
    random_color_btn.class("buttons");
    random_color_btn.mouseClicked(function() {
        random_colors = true;
        ranColor1 = color(random(255), random(255), random(255));
        ranColor2 = color(random(255), random(255), random(255));
        colorPicker1.remove();
        colorPicker2.remove();
        colorPicker1 = createColorPicker(ranColor1);
        colorPicker1.class("colorpickers");
        colorPicker1.parent("colorpickers_container");
        colorPicker2 = createColorPicker(ranColor2);
        colorPicker2.parent("colorpickers_container");
        colorPicker2.class("colorpickers");

        colorPicker1.input(function() {
            setUIValues();
            redraw();
        });
        colorPicker2.input(function() {
            setUIValues();
            redraw();
        });
        redraw();
    });

    regular_mode = createButton("Regular Mode");
    regular_mode.parent("buttons_div");
    regular_mode.class("buttons");
    regular_mode.mouseClicked(function() {
        mode = "regular";
        branch_prob_slider.attribute("disabled", true);
        branch_prob_slider.attribute("style", "opacity:0.25");
        growth_slider.attribute("disabled", true);
        growth_slider.attribute("style", "opacity:0.25");
        a_var_slider.attribute("disabled", true);
        a_var_slider.attribute("style", "opacity:0.25");
        flower_prob_slider.attribute("disabled", true);
        flower_prob_slider.attribute("style", "opacity:0.25");
        random_color_btn.attribute("disabled", true);
        random_color_btn.attribute("style", "opacity:0.25");
        colorPicker1.attribute("disabled", true);
        colorPicker2.attribute("disabled", true);
        document.getElementById("colorpickers_container").style.opacity = "0.25";
        creative_mode.attribute("style", "opacity:1");
        creative_mode.removeAttribute("disabled");
        regular_mode.attribute("style", "opacity:.25");
        regular_mode.attribute("disabled", true);
        document.getElementById("branch_prob_label").style.opacity = .25;
        document.getElementById("growth_label").style.opacity = .25;
        document.getElementById("a_var_label").style.opacity = .25;
        document.getElementById("flower_prob_label").style.opacity = .25;
        redraw();
    });

    creative_mode = createButton("Creative Mode");
    creative_mode.parent("buttons_div");
    creative_mode.class("buttons");
    creative_mode.mouseClicked(function() {
        mode = "creative";
        branch_prob_slider.removeAttribute("disabled");
        branch_prob_slider.attribute("style", "opacity:.7");
        growth_slider.removeAttribute("disabled");
        growth_slider.attribute("style", "opacity:.7");
        a_var_slider.removeAttribute("disabled");
        a_var_slider.attribute("style", "opacity:.7");
        flower_prob_slider.removeAttribute("disabled");
        flower_prob_slider.attribute("style", "opacity:.7");
        random_color_btn.removeAttribute("disabled");
        random_color_btn.attribute("style", "opacity:1");
        colorPicker1.removeAttribute("disabled");
        colorPicker2.removeAttribute("disabled");
        document.getElementById("colorpickers_container").style.opacity = "1";
        creative_mode.attribute("style", "opacity:.25");
        creative_mode.attribute("disabled", true);
        regular_mode.attribute("style", "opacity:1");
        regular_mode.removeAttribute("disabled");
        document.getElementById("branch_prob_label").style.opacity = 1;
        document.getElementById("growth_label").style.opacity = 1;
        document.getElementById("a_var_label").style.opacity = 1;
        document.getElementById("flower_prob_label").style.opacity = 1;

        redraw()
    });

    creative_mode.attribute("style", "opacity:.25");
    creative_mode.attribute("disabled", true);

    angle_slider = createSlider(0, PI / 2, PI / 6, .01);
    branch_prob_slider = createSlider(.5, 1, 1, .01);
    level_slider = createSlider(1, 15, 7, 1);
    scale_slider = createSlider(10, 300, 125, 1)
    growth_slider = createSlider(0, 1, .75, .01);
    a_var_slider = createSlider(0, 45, 15, .1);
    flower_prob_slider = createSlider(0, 1, .75, .01);

    angle_slider.parent("slider1");
    angle_slider.class("sliders");
    branch_prob_slider.parent("slider2");
    branch_prob_slider.class("sliders");
    level_slider.parent("slider3");
    level_slider.class("sliders");
    scale_slider.parent("slider4");
    scale_slider.class("sliders");
    growth_slider.parent("slider5");
    growth_slider.class("sliders");
    a_var_slider.parent("slider6");
    a_var_slider.class("sliders");
    flower_prob_slider.parent("slider7");
    flower_prob_slider.class("sliders");

    level_slider.input(function() {
        redraw();
    });
    angle_slider.input(function() {
        redraw();
    });
    branch_prob_slider.input(function() {
        redraw();
    });
    scale_slider.input(function() {
        redraw();
    });
    growth_slider.input(function() {
        redraw();
    });
    a_var_slider.input(function() {
        redraw();
    });
    flower_prob_slider.input(function() {
        redraw();
    });
    canvas_radio.input(function() {
        redraw();
    });
    line_radio.input(function() {
        redraw();
    });
    colorPicker1.input(function() {
        setUIValues();
        redraw();
    });
    colorPicker2.input(function() {
        setUIValues();
        redraw();
    });

    strokeWeight(init_stroke);
    strokeCap(ROUND);
}

function draw() {
    getUIValues();
    stroke(line_radio.value());
    background(canvas_radio.value());
    len = scale_slider.value();
    translate(width / 2, height);
    setUIValues();
    branch(len);
    random_colors = false;
    noLoop();
}

function branch(len) {
    if (mode == "creative") {
        line(0, 0, 0, -len);
        translate(0, -len);
        var branch1 = random() < branch_prob;
        var branch2 = random() < branch_prob;
        if (iter < max_iter) {
            iter++;
            strokeWeight(12 * Math.pow((max_iter - iter + 1) / max_iter, 2));
            if (branch1) {
                len = scale_ * growth / iter * (random() + random());
                push();
                rotate(angle + radians(random(a_variance)));
                branch(len);
                pop();
            }
            if (branch2) {
                len = scale_ * growth / iter * (random() + random());
                push();
                rotate(-angle - radians(random(a_variance)));
                branch(len);
                pop();
            }
            if (flower_prob != 0 && ((!branch1 && !branch2) || flower_prob > random()) && iter > 2) {
                push()
                scale(1 / iter);
                flower();
                pop();
            }
            iter--;
        }
        if (iter == max_iter && random() < flower_prob && flower_prob > 0.01) {
            push()
            scale(1 / iter);
            flower();
            pop();
        }
    } else if (mode == "regular") {
        line(0, 0, 0, -len);
        translate(0, -len);
        if (iter < max_iter) {
            iter++;
            strokeWeight(12 * Math.pow((max_iter - iter + 1) / max_iter, 2));
            len = len * 0.67;
            push();
            rotate(angle);
            branch(len);
            pop();
            push();
            rotate(-angle);
            branch(len);
            pop();
            iter--;
        }
    }
}

function getUIValues() {
    angle = angle_slider.value();
    branch_prob = branch_prob_slider.value();
    max_iter = level_slider.value();
    scale_ = scale_slider.value();
    growth = growth_slider.value();
    a_variance = a_var_slider.value();
    flower_prob = flower_prob_slider.value();
}

function setUIValues() {
    document.getElementById('angle_s_val').innerHTML = Math.ceil(degrees(angle)) + '\xB0';
    document.getElementById('branch_prob_s_val').innerHTML = Math.ceil((branch_prob * 100)) + '%';
    document.getElementById('level_s_val').innerHTML = max_iter;
    document.getElementById('scale_s_value').innerHTML = scale_;
    document.getElementById('growth_s_val').innerHTML = Math.ceil((growth * 100)) + '%';
    document.getElementById('a_s_value').innerHTML = Math.ceil(a_variance) + '\xB0';
    document.getElementById('flower_s_value').innerHTML = Math.ceil((flower_prob * 100)) + '%';
}

function generateRandomTree() {
    if (mode == "creative") {
        angle_slider.value(radians(random(0, 90)));
        branch_prob_slider.value(random(.5, 1));
        level_slider.value(Math.trunc(random(1, 15)));
        scale_slider.value(Math.trunc(random(10, 300)));
        growth_slider.value(random());
        a_var_slider.value(Math.trunc(random(0, 45)));
        flower_prob_slider.value(random(.3, 1));
        redraw();
    } else if (mode == "regular") {
        angle_slider.value(radians(random(0, 90)));
        level_slider.value(Math.trunc(random(1, 15)));
        scale_slider.value(Math.trunc(random(10, 300)));
        redraw();
    }
}

function flower() {
    noStroke();
    if (random_colors == true) {
        let color1 = ranColor1;
        let color2 = ranColor2;
        fill(lerpColor(color1, color2, random()));
    } else {
        let color1 = colorPicker1.color();
        let color2 = colorPicker2.color();
        fill(lerpColor(color1, color2, random()));
    }
    var petalwidth = random(10, 40);
    var petalheight = random(25, 70);
    var petalAmt = random(3, 7);
    for (let i = 0; i < petalAmt; i++) {
        ellipse(0, 15, petalwidth, petalheight);
        rotate(PI / (petalAmt / 2));
    }
    fill(247, 240, 160);
    ellipse(0, 0, 10);
}

function windowResized() {
    if (isMobileDevice()) {
        resizeCanvas(displayWidth * pixelDensity(), displayWidth * pixelDensity());
    } else {
        resizeCanvas(windowHeight * (2 / 3), windowHeight * (2 / 3));

    }
    clear();
    background(canvas_radio.value());
    stroke(line_radio.value());
    draw();
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};
