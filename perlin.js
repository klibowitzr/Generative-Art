var c,
    stop_btn,
    go_btn,
    random_color,
    random_lerp,
    static_color,
    random_lerp_v2,
    save_btn,
    step_slider,
    noise_detail_slider,
    num_of_particles_slider,
    inc_slider,
    angle_slider,
    alpha_slider,
    solid1_color_picker,
    solid2_color_picker,
    gradient_color_picker,
    solid_color_picker,
    lerp1_color_picker,
    lerp2_color_picker,
    stroke_color_picker,
    background_color_picker;

var columns,
    rows,
    xoffset,
    yoffset,
    step_slider_value,
    num_of_particles,
    angle,
    noise_detail;

var increment = .01;
var v_step = 1
var particles = [];
var flowfield = [];
var stop;
var bkg = 0;
var stroke_color;
var alpha_value;
var colorselection = "solid";

num_of_particles = 500;

function setup() {
    stroke_color = color(255, 204, 0);
    angle = 180;
    alpha_value = 5;

    if (isMobileDevice()) {
        c = createCanvas(displayWidth * pixelDensity(), displayWidth * pixelDensity() - 100);
        c.parent("sketch");
    } else {
        c = createCanvas(windowWidth , windowHeight*2/3);
        c.parent("sketch");

    }

    columns = width / v_step;
    rows = height / v_step;
    background(bkg);

    stop_btn = createButton("STOP");
    stop_btn.parent("sys_buttons");
    stop_btn.class("button");
    stop_btn.mousePressed(function() {
        noLoop();
    });

    go_btn = createButton("RESTART");
    go_btn.parent("sys_buttons");
    go_btn.class("button");
    go_btn.mousePressed(redo_noise);

    save_btn = createButton("SAVE");
    save_btn.parent("sys_buttons");
    save_btn.class("button");
    save_btn.mousePressed(function() {
        noLoop();
        save();
    });

    random_color = createButton("RANDOM COLOR");
    random_color.parent("buttons");
    random_color.class("button");
    random_color.mousePressed(function() {
        colorselection = "random";
        solid_color_picker.remove();
        solid_color_picker = createColorPicker(color(random(255), random(255), random(255)));
        solid_color_picker.parent("solid");
        solid_color_picker.class("wide_color_picker");

        solid_color_picker.input(function() {
            colorselection = "solid";
            redo_noise();
        });
        redo_noise();
    });

    random_lerp = createButton("RANDOM LERP");
    random_lerp.parent("buttons");
    random_lerp.class("button");
    random_lerp.mousePressed(function() {
        colorselection = "random lerp";
        lerp1_color_picker.remove();
        lerp2_color_picker.remove();

        lerp1_color_picker = createColorPicker(color(random(255), random(255), random(255)));
        lerp1_color_picker.class("narrow_color_picker");
        lerp1_color_picker.parent("lerp1");
        lerp1_color_picker.input(function() {
            colorselection = "lerp";
            redo_noise();
        });

        lerp2_color_picker = createColorPicker(color(random(255), random(255), random(255)));
        lerp2_color_picker.class("narrow_color_picker");
        lerp2_color_picker.parent("lerp2");
        lerp2_color_picker.input(function() {
            colorselection = "lerp";
            redo_noise();
        });
        redo_noise();
    });

    random_lerp_v2 = createButton("RANDOM LERP v.2");
    random_lerp_v2.parent("buttons");
    random_lerp_v2.class("button");
    random_lerp_v2.mousePressed(function() {
        colorselection = "random lerp v2";

        lerpv1_color_picker.remove();
        lerpv2_color_picker.remove();
        lerpv1_color_picker = createColorPicker(color(random(255), random(255), random(255)));
        lerpv1_color_picker.class("narrow_color_picker");
        lerpv1_color_picker.parent("lerpv21");
        lerpv1_color_picker.input(function() {
            colorselection = "lerpv2";
            redo_noise();
        });

        lerpv2_color_picker = createColorPicker(color(random(255), random(255), random(255)));
        lerpv2_color_picker.class("narrow_color_picker");
        lerpv2_color_picker.parent("lerpv22");
        lerpv2_color_picker.input(function() {
            colorselection = "lerpv2";
            redo_noise();
        });
        redo_noise();
    })

    num_of_particles_slider = createSlider(100, 20000, 500, 100);
    num_of_particles_slider.parent("slider1");
    num_of_particles_slider.class("slider");
    num_of_particles_slider.input(function() {
        num_of_particles = num_of_particles_slider.value();
        redo_noise();
        document.getElementById("particles_s_val").innerHTML = num_of_particles_slider.value();
    });

    document.getElementById("particles_s_val").innerHTML = num_of_particles_slider.value();

    noise_detail_slider = createSlider(1, 30, 4, 1);
    noise_detail_slider.parent("slider2");
    noise_detail_slider.class("slider");
    noise_detail_slider.input(function() {
        noise_detail = noise_detail_slider.value();
        noiseDetail(noise_detail);
        redo_noise();
        document.getElementById("noise_detail_value").innerHTML = noise_detail_slider.value();
    })

    document.getElementById("noise_detail_value").innerHTML = noise_detail_slider.value();

    step_slider = createSlider(1, 20, 5, 1);
    step_slider.parent("slider3");
    step_slider.class("slider");
    step_slider.input(function() {
        v_step = step_slider.value();
        columns = width / v_step;
        rows = height / v_step;
        redo_noise();
        document.getElementById("step_slider_value").innerHTML = step_slider.value();
    })
    document.getElementById("step_slider_value").innerHTML = step_slider.value();

    inc_slider = createSlider(.001, .05, .01, .001);
    inc_slider.parent("slider4");
    inc_slider.class("slider");
    inc_slider.input(function() {
        increment = inc_slider.value();
        redo_noise();
        document.getElementById("perlin_increment_value").innerHTML = inc_slider.value();
    })
    document.getElementById("perlin_increment_value").innerHTML = inc_slider.value();

    angle_slider = createSlider(1, 720, 180, 1);
    angle_slider.parent("slider5");
    angle_slider.class("slider");
    angle_slider.input(function() {
        angle = angle_slider.value();
        redo_noise();
        document.getElementById("perlin_mult_value").innerHTML = angle_slider.value();
    })
    document.getElementById("perlin_mult_value").innerHTML = angle_slider.value();

    alpha_slider = createSlider(0, 255, 5, 1);
    alpha_slider.parent("slider6");
    alpha_slider.class("slider");
    alpha_slider.input(function() {
        alpha_value = alpha_slider.value();
        redo_noise();
        document.getElementById("alpha_value").innerHTML = alpha_slider.value();
    });
    document.getElementById("alpha_value").innerHTML = alpha_slider.value();

    gradient_color_picker = createColorPicker(color(255, 255, 255));
    gradient_color_picker.class("wide_color_picker");
    gradient_color_picker.parent("sand");
    gradient_color_picker.input(function() {
        colorselection = "sand";
        redo_noise();
    });

    solid_color_picker = createColorPicker(color(random(255), random(255), random(255)));
    solid_color_picker.class("wide_color_picker");
    solid_color_picker.parent("solid");
    solid_color_picker.input(function() {
        colorselection = "solid";
        redo_noise();
    });

    lerp1_color_picker = createColorPicker(color(255, 255, 255));
    lerp1_color_picker.class("narrow_color_picker");
    lerp1_color_picker.parent("lerp1");
    lerp1_color_picker.input(function() {
        colorselection = "lerp";
        redo_noise();
    });

    lerp2_color_picker = createColorPicker(color(255, 255, 255));
    lerp2_color_picker.class("narrow_color_picker");
    lerp2_color_picker.parent("lerp2");
    lerp2_color_picker.input(function() {
        colorselection = "lerp";
        redo_noise();
    });

    lerpv1_color_picker = createColorPicker(color(255, 255, 255));
    lerpv1_color_picker.class("narrow_color_picker");
    lerpv1_color_picker.parent("lerpv21");
    lerpv1_color_picker.input(function() {
        colorselection = "lerpv2";
        redo_noise();
    });

    lerpv2_color_picker = createColorPicker(color(255, 255, 255));
    lerpv2_color_picker.class("narrow_color_picker");
    lerpv2_color_picker.parent("lerpv22");
    lerpv2_color_picker.input(function() {
        colorselection = "lerpv2";
        redo_noise();
    });

    solid1_color_picker = createColorPicker(color(255, 255, 255));
    solid1_color_picker.class("narrow_color_picker");
    solid1_color_picker.parent("solid1");
    solid1_color_picker.input(function() {
        colorselection = "solidx2";
        redo_noise();
    });

    solid2_color_picker = createColorPicker(color(255, 255, 255));
    solid2_color_picker.class("narrow_color_picker");
    solid2_color_picker.parent("solid1");
    solid2_color_picker.input(function() {
        colorselection = "solidx2";
        redo_noise();
    });

    background_color_picker = createColorPicker(color(255, 255, 255));
    background_color_picker.class("wide_color_picker");
    background_color_picker.parent("background_p");
    background_color_picker.changed(function() {
        bkg = background_color_picker.color();
        background(bkg);
        redo_noise();
    });

    for (var i = 0; i < num_of_particles; i++) {
        particles[i] = new particle();
    }
    make_noise();
}

function make_noise() {
    flowfield.length = 0;
    yoffset = random(50000);
    for (var i = 0; i < rows; i++) {
        xoffset = 0;
        for (var j = 0; j < columns; j++) {
            var index = j + i * columns;
            var theta = noise(xoffset, yoffset) * radians(angle);
            var vect = p5.Vector.fromAngle(theta);
            vect.setMag(1);
            flowfield[index] = vect;
            xoffset += increment;
        }
        yoffset += increment;
    }
}

function draw() {

    for (var i = 0; i < particles.length; i++) {
        particles[i].follow(flowfield);
        particles[i].update();
        particles[i].wrap();
        particles[i].draw();
    }
}

function redo_noise() {
    make_noise();
    particles.length = 0;
    for (var i = 0; i < num_of_particles; i++) {
        particles[i] = new particle();
    }
    clear()
    background(bkg);
    draw();

}

function windowResized() {
    clear();
    background(bkg);
    if (isMobileDevice()) {
        resizeCanvas(displayWidth * pixelDensity(), displayWidth * pixelDensity());
    } else {
        resizeCanvas(windowWidth / 2, windowHeight * (2 / 3));
    }
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};
