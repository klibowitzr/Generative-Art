var c,
    ctx,
    width,
    height,
    step,
    num_of_lines,
    r, g, b,
    colorselection,
    distribution,
    outlineStyle;

var step_slider,
    line_slider,
    toggle_bkg_btn,
    gradient_btn,
    no_color_btn,
    random_colors_btn,
    random_gradient_btn,
    scattered_gradient_btn,
    even_distro_btn,
    center_distro_btn,
    right_distro_btn,
    left_distro_btn,
    whoville_distro_btn,
    black_lines_btn,
    white_lines_btn,
    no_lines_btn,
    gradient_color_picker,
    lerp1_color_picker,
    lerp2_color_picker;

var lines = [];
var bkg = 0;
var lineWidth = 2;
var line_color = 255;

function setup() {

    if (isMobileDevice()) {
        c = createCanvas(displayWidth * pixelDensity(), displayWidth * pixelDensity() - 100);
        c.parent("sketch");
    } else {
        c = createCanvas(windowHeight * (2 / 3), windowHeight * (2 / 3));
        c.parent("sketch");

    }
    c.background(bkg);

    strokeWeight(2);
    colorselection = "gradient";
    distribution = "center";
    stroke(line_color);

    step_slider = createSlider(1, 100, 50, 1);
    step_slider.parent("step_slider");
    step_slider.class("slider");
    step_slider.input(function() {
        document.getElementById("step_value").innerHTML = step_slider.value();
        redrawlines();
    });

    step = step_slider.value();
    document.getElementById("step_value").innerHTML = step_slider.value();

    line_slider = createSlider(1, 500, 100, 1);
    line_slider.parent("line_slider");
    line_slider.class("slider");
    line_slider.input(function() {
        document.getElementById("line_value").innerHTML = line_slider.value();
        redrawlines();
    })
    num_of_lines = line_slider.value();
    document.getElementById("line_value").innerHTML = line_slider.value();

    lerp1_color_picker = createColorPicker(color(255, 255, 255));
    lerp1_color_picker.parent("picker2");
    lerp1_color_picker.class("colorpickers");
    lerp1_color_picker.input(function() {
        colorselection = "lerp";
        draw_lines();
    });

    lerp2_color_picker = createColorPicker(color(255, 255, 255));
    lerp2_color_picker.parent("picker3");
    lerp2_color_picker.class("colorpickers");
    lerp2_color_picker.input(function() {
        colorselection = "lerp";
        draw_lines();
    });

    toggle_bkg_btn = createButton("Toggle Canvas");
    toggle_bkg_btn.parent("toggle_cnvs_btn");
    toggle_bkg_btn.class("button");
    toggle_bkg_btn.mousePressed(function() {
        if (bkg == 0) {
            bkg = 255;
            background(bkg);
            draw_lines();
        } else {
            bkg = 0;
            background(bkg);
            draw_lines();
        }
    });

    even_distro_btn = createButton("Even");
    even_distro_btn.parent("distro_selection_btns");
    even_distro_btn.class("button");
    even_distro_btn.mousePressed(function() {
        distribution = "normal";
        redrawlines();
    });

    left_distro_btn = createButton("Left");
    left_distro_btn.parent("distro_selection_btns");
    left_distro_btn.class("button");
    left_distro_btn.mousePressed(function() {
        distribution = "left";
        redrawlines();
    });

    center_distro_btn = createButton("Center");
    center_distro_btn.parent("distro_selection_btns");
    center_distro_btn.class("button");
    center_distro_btn.mousePressed(function() {
        distribution = "center";
        redrawlines();
    });

    right_distro_btn = createButton("Right");
    right_distro_btn.parent("distro_selection_btns");
    right_distro_btn.class("button");
    right_distro_btn.mousePressed(function() {
        distribution = "right";
        redrawlines();
    });

    whoville_distro_btn = createButton("whoville");
    whoville_distro_btn.parent("distro_selection_btns");
    whoville_distro_btn.class("button");
    whoville_distro_btn.mousePressed(function() {
        distribution = "whoville";
        redrawlines();
    });

    black_lines_btn = createButton("Black Outline");
    black_lines_btn.parent("line_clr_ctrl");
    black_lines_btn.class("button");
    black_lines_btn.mousePressed(function() {
        line_color = 0;
        stroke(line_color);
        draw_lines();
    });

    white_lines_btn = createButton("White Outline");
    white_lines_btn.parent("line_clr_ctrl");
    white_lines_btn.class("button");
    white_lines_btn.mousePressed(function() {
        line_color = 255;
        stroke(line_color);
        draw_lines();
    });

    no_lines_btn = createButton("No Outline");
    no_lines_btn.parent("line_clr_ctrl");
    no_lines_btn.class("button");
    no_lines_btn.mousePressed(function() {
        noStroke();
        background(bkg);
        draw_lines();
    });

    random_colors_btn = createButton("random colors");
    random_colors_btn.parent("clr_btns");
    random_colors_btn.class("button");
    random_colors_btn.mousePressed(function() {
        colorselection = "random";
        draw_lines();
    });

    random_gradient_btn = createButton("random gradient");
    random_gradient_btn.parent("clr_btns");
    random_gradient_btn.class("button");
    random_gradient_btn.mousePressed(function() {
        colorselection = "gradient";
        gradient_color_picker.remove();
        gradient_color_picker = createColorPicker(color(random(255), random(255), random(255)));
        gradient_color_picker.parent("picker1");
        gradient_color_picker.class("colorpickers");
        gradient_color_picker.changed(function() {
            colorselection = "gradient";
            redrawlines();
        });
        draw_lines();
    });

    no_color_btn = createButton("No color");
    no_color_btn.parent("clr_btns");
    no_color_btn.class("button");
    no_color_btn.mousePressed(function() {
        colorselection = "nofill";
        draw_lines();
    });

    gradient_color_picker = createColorPicker(color(random(255), random(255), random(255)));
    gradient_color_picker.parent("picker1");
    gradient_color_picker.class("colorpickers");
    gradient_color_picker.changed(function() {
        colorselection = "gradient";
        draw_lines();
    });

    random_colors_btn = createButton("(scatter 'em)");
    random_colors_btn.parent("scatter1");
    random_colors_btn.class("smol_button");
    random_colors_btn.mousePressed(function() {
        colorselection = "scattered gradient";
        draw_lines();
    });


    random_colors_btn = createButton("(scatter 'em)");
    random_colors_btn.parent("scatter2");
    random_colors_btn.class("smol_button");
    random_colors_btn.mousePressed(function() {
        colorselection = "scattered lerp";
        draw_lines();
    });
}

function create_lines() {
    for (var i = 0; i < num_of_lines + 4; i++) {
        var line = [];
        var random;
        for (var j = 0; j <= width + (width / 4); j += step) {
            if (distribution == "center") {
                var distance2center = Math.abs(j - width / 2);
                var varience = Math.max(width / 2 - 50 - distance2center, 0);
                random = Math.random() * varience / 2 * -1;
            } else if (distribution == "whoville") {
                random = Math.random() * j;
            } else if (distribution == "right") {
                var distance2right = Math.abs(j - width);
                var varience = Math.max(width / 2 - 50 - distance2right / 1.25, 10);
                random = Math.random() * varience / 2 * -1;
            } else if (distribution == "left") {
                var distance2left = Math.abs(j);
                var varience = Math.max(width / 2 - 50 - distance2left / 1.25, 10);
                random = Math.random() * varience / 2 * -1;
            } else if (distribution == "normal") {
                random = Math.random() * 20;
            }

            var y_temp = i * (height / num_of_lines) + random;
            if (y_temp > height) {
                y_temp = height;
            } else if (y_temp < 0) {
                y_temp = 0;
            }

            var point = {
                x: j,
                y: y_temp
            };
            line.push(point);

        }
        lines.push(line);
    }
    draw_lines();
}

function draw_lines() {
    for (var i = 1; i < lines.length - 1; i++) {
        beginShape();
        vertex(lines[i][0].x, lines[i][0].y);
        var j;
        for (j = 0; j < lines[i].length - 2; j++) {
            var xc = (lines[i][j].x + lines[i][j + 1].x) / 2;
            var yc = (lines[i][j].y + lines[i][j + 1].y) / 2;
            quadraticVertex(lines[i][j].x, lines[i][j].y, xc, yc);
        }

        quadraticVertex(lines[i][j].x, lines[i][j].y, lines[i][j + 1].x, lines[i][j + 1].y);
        vertex(lines[i][j + 1].x, height);
        vertex(lines[i][0].x, height);
        vertex(lines[i][0].x, height);

        if (colorselection == "random") {
            fill(color(random(255), random(255), random(255)));
        } else if (colorselection == "gradient") {
            if (i < num_of_lines / 2) {
                let temp_color = color(0, 0, 0);
                fill(lerpColor(temp_color, gradient_color_picker.color(), i * (2 / (num_of_lines + 1))));
            } else {
                let temp_color = color(255, 255, 255);
                fill(lerpColor(gradient_color_picker.color(), temp_color, i * (2 / num_of_lines) - .95));
            }
        } else if (colorselection == "scattered gradient") {
            if (random() > .5) {
                let lerp = color(255, 255, 255);
                color1 = lerpColor(lerp, gradient_color_picker.color(), random());
            } else {
                let lerp = color(0, 0, 0);
                color1 = lerpColor(lerp, gradient_color_picker.color(), random());
            }
            fill(color1);
        } else if (colorselection == "lerp") {
            fill(lerpColor(lerp1_color_picker.color(), lerp2_color_picker.color(), i * (1 / num_of_lines)));
        } else if (colorselection == "scattered lerp") {
            fill(lerpColor(lerp1_color_picker.color(), lerp2_color_picker.color(), random()))
        } else if (colorselection == "nofill") {
            fill(bkg);
        }
        endShape();
    }
}

function redrawlines() {
    clear();
    background(bkg);
    lines = [];
    step = step_slider.value();
    num_of_lines = line_slider.value();
    create_lines();
    noLoop();
}

function draw() {
    create_lines();
    draw_lines();
    noLoop();
}

function windowResized() {
    if (isMobileDevice()) {
        resizeCanvas(displayWidth * pixelDensity(), displayWidth * pixelDensity());
    } else {
        resizeCanvas(windowHeight * (2 / 3), windowHeight * (2 / 3));

    }
    clear();
    background(bkg);
    redrawlines();
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}
