var c,
    axiom_input,
    angle_input,
    iterations_input,
    len_slider,
    initial_ruleA,
    initial_ruleB,
    generate_btn,
    draw_btn,
    animate_btn,
    add_more_rules,
    reset_btn,
    tree_select,
    geo_select,
    fass_select;

var angle,
    iterations;

var bkg = 255;
var stroke_color = 0;
var axiom = "";
var sentence = axiom;
var rules = [];
var locations = [];
var len = 100;
var static_length = len;
var first_iter = true;
var rule_count = 0;
var array_filled = false;
var generate_called = false;
var gen_calls_num = 0;
var animation_first_time = true;
var char_index = 0;
var fr = 1;
var geo_selection = 0;
var animating = false;

var x, y;
var heading = 0;

function setup() {
    if (isMobileDevice()) {
        c = createCanvas(displayWidth * pixelDensity(), displayWidth * pixelDensity() - 100);
        c.parent("sketch");
    } else {
        c = createCanvas(windowHeight * (2 / 3), windowHeight * (2 / 3));
        c.parent("sketch");

    }

    background(bkg);

    generate_btn = createButton("Add Iteration");
    generate_btn.parent("sys_config");
    generate_btn.class("buttons");
    generate_btn.mousePressed(function() {
        if (!iterations && axiom_input.value() == "") {
            iterations = iterations;
        } else {
            clear();
            animating = false;

            if (rules.length == 0) {
                fillRules();
            }
            if (iterations_input.value()) {
                iterations++;
                iterations_input.value(iterations);
                generate();
            } else {
                generate();
                iterations = 1;
                iterations_input.value(iterations);
            }
        }
    });
    generate_btn.attribute("disabled", true);
    generate_btn.attribute("style", "opacity:0.25");

    draw_btn = createButton("Draw");
    draw_btn.parent("sys_config");
    draw_btn.class("buttons");
    draw_btn.mousePressed(function() {
        clear();
        animating = false;

        if (rules.length == 0) {
            fillRules();
        }
        generate();
    })
    draw_btn.attribute("disabled", true);
    draw_btn.attribute("style", "opacity:0.25");

    animate_btn = createButton("Animate");
    animate_btn.parent("sys_config");
    animate_btn.class("buttons");
    animate_btn.mousePressed(function() {
        background(bkg);
        heading = 0;
        if (geo_selection == 1) {
            x = 3 * width / 4;
            y = 3 * height / 4;
            heading = 180;
        } else if (geo_selection == 2) {
            x = 2;
            y = 2 * height / 3;
            heading = 270;
        } else if (geo_selection == 3) {
            x = 3 * width / 4;
            y = height / 4;
            heading = 180;
        } else if (geo_selection == 4) {
            x = width / 7;
            y = height / 3;
            heading = 270;
        } else if (geo_selection == 5) {
            x = width / 10;
            y = 8 * height / 9;
            heading = 270;
        } else if (geo_selection == 6) {
            x = 3 * width / 5;
            y = height / 6;
            heading = 270;
        } else if (geo_selection == 7) {
            x = width / 14;
            y = 13 * height / 14;
            heading = 270;
        } else if (geo_selection == 8) {
            x = width / 2;
            y = height / 12;
            heading = 270;
        } else if (geo_selection == 9) {
            x = 4 + width / 6;
            y = 8 * height / 10;
            heading = 270;
        } else if (geo_selection == 10) {
            x = width / 11;
            y = 10 * height / 11;
            heading = 270;
        } else if (geo_selection == 11) {
            x = width / 11;
            y = 10 * height / 11;
            heading = 270;
        } else {
            x = width / 2;
            y = height;
            heading = 270;
        }
        animating = true;
        iterations = iterations_input.value()
        sentence = axiom;
        generate();

        locations.length = 0;
        char_index = 0;
    });
    animate_btn.attribute("disabled", true);
    animate_btn.attribute("style", "opacity:0.25");

    reset_btn = createButton("Clear");
    reset_btn.parent("sys_config");
    reset_btn.class("buttons");
    reset_btn.mousePressed(function() {
        delete_rules();
        angle = "";
        axiom = "";
        len = 100;
        iterations = "";
        gen_calls_num = 0;
        rule_count = 0;
        geo_selection = 0;
        sentence = axiom;
        static_length = len;
        first_iter = true;
        array_filled = false;
        generate_called = false;
        animate = false;
        // noLoop();
        showInputs();
        locations.length = 0;
        clear();
        animating = false;
        background(bkg);
        tree_select.value("Pre-set Trees");
        geo_select.value("Pre-set Geometrics");
        fass_select.value("FASS Curve Pre-sets");
        draw_btn.attribute("disabled", true);
        draw_btn.attribute("style", "opacity:0.25");
        animate_btn.attribute("disabled", true);
        animate_btn.attribute("style", "opacity:0.25");;
    })

    add_more_rules = createButton("+");
    add_more_rules.mousePressed(function() {
        animating = false;
        add_rule();
    });
    add_more_rules.parent("add_rule");
    add_more_rules.class("add-button");

    axiom_input = createInput();
    axiom_input.parent("axiom_input");
    axiom_input.input(function() {
        if (animating == true) {
            iterations = 1;
            iterations_input.value(1);
            animating = false;
        }
        axiom = axiom_input.value();
        sentence = axiom;
    });

    angle_input = createInput();
    angle_input.parent("angle_input");
    angle_input.input(function() {
        animating = false;
        angle = radians(angle_input.value());
    });
    iterations_input = createInput();
    iterations_input.parent("iterations_input");
    iterations_input.input(function() {
        animating = false;
        iterations = iterations_input.value();
        if (!iterations) {
            draw_btn.attribute("disabled", true);
            draw_btn.attribute("style", "opacity:0.25");
            animate_btn.attribute("disabled", true);
            animate_btn.attribute("style", "opacity:0.25");

        } else if (iterations) {
            draw_btn.removeAttribute("disabled");
            draw_btn.attribute("style", "opacity:1");
            animate_btn.removeAttribute("disabled");
            animate_btn.attribute("style", "opacity:1");
        }
    });

    iterations_input.attribute("placeholder", " optional--draw will be disabled");

    initial_ruleA = createInput();
    initial_ruleA.parent("rules_part_A");
    initial_ruleA.input(function() {
        animating = false;
    })

    initial_ruleB = createInput();
    initial_ruleB.parent("rules_part_B");
    initial_ruleB.input(function() {
        animating = false;
        generate_btn.removeAttribute("disabled");
        generate_btn.attribute("style", "opacity:1");
    })

    len_slider = createSlider(0, 500, 100, 1);
    document.getElementById("inital_length_value").innerHTML = len_slider.value();
    len_slider.parent("slider");
    len_slider.class("slider");
    len_slider.input(function() {
        clear();
        background(bkg);
        animating = false;
        len = len_slider.value();
        document.getElementById("inital_length_value").innerHTML = len_slider.value();
        if (rules.length > 0) {
            len = len_slider.value() / Math.pow(2, iterations_input.value());
            plotter();
        }
    });

    tree_select = createSelect();
    tree_select.parent("menu1");
    tree_select.option("Pre-set Trees");
    tree_select.option("Tree One");
    tree_select.option("Tree Two");
    tree_select.option("Tree Three");
    tree_select.option("Tree Four");
    tree_select.option("Tree Five");
    tree_select.changed(function() {
        delete_rules();
        rules.length = 0;
        gen_calls_num = 0;
        first_iter = true;
        geo_selection = 0;
        if (tree_select.value() == "Tree One") {
            set_globals(5, "F", (75 / 600) * width, 25.7);
            create_rule("F", "F[+F]F[-F]F");
        } else if (tree_select.value() == "Tree Two") {
            set_globals(5, "F", (300 / 600) * width, 20);
            create_rule("F", "F[+F]F[-F][F]");
        } else if (tree_select.value() == "Tree Three") {
            set_globals(4, "F", (150 / 600) * width, 22.5);
            create_rule("F", "FF-[-F+F+F]+[+F-F-F]");
        } else if (tree_select.value() == "Tree Four") {
            set_globals(7, "X", (300 / 600) * width, 20);
            create_rule("X", "F[+X]F[-X]+X");
            create_rule("F", "FF");
        } else if (tree_select.value() == "Tree Five") {
            set_globals(7, "X", (300 / 600) * width, 25.7);
            create_rule("X", "F[+X][-X]FX");
            create_rule("F", "FF");
        }
        geo_select.value("Pre-set Geometrics");
        fass_select.value("FASS Curve Pre-sets")
        animate_btn.removeAttribute("disabled");
        animate_btn.attribute("style", "opacity:1");
        generate_btn.removeAttribute("disabled");
        generate_btn.attribute("style", "opacity:1");
        animating = false;
        static_length = len;
        showInputs();
        angle = radians(angle);
        generate();
    });

    geo_select = createSelect();
    geo_select.parent("menu2");
    geo_select.option("Pre-set Geometrics");
    geo_select.option("Quadratic Koch Island");
    geo_select.option("Quadratic Koch Snowflake");
    geo_select.option("Islands and Lakes");
    geo_select.option("Koch Variation One");
    geo_select.option("Koch Variation Two");
    geo_select.option("Koch Variation Three");
    geo_select.option("Koch Variation Four");
    geo_select.option("Koch Variation Five");
    geo_select.option("Koch Variation Six");
    geo_select.changed(function() {
        delete_rules();
        rules.length = 0;
        gen_calls_num = 0;
        first_iter = true;
        if (geo_select.value() == "Quadratic Koch Island") {
            geo_selection = 1;
            set_globals(2, "F-F-F-F", (35 / 600) * width, 90);
            create_rule("F", "F+FF-FF-F-F+F+FF-F-F+F+FF+FF-F");
        } else if (geo_select.value() == "Quadratic Koch Snowflake") {
            geo_selection = 2;
            set_globals(4, "-F", (116 / 600) * width, 90);
            create_rule("F", "F+F-F-F+F");
        } else if (geo_select.value() == "Islands and Lakes") {
            geo_selection = 3;
            set_globals(2, "F+F+F+F", (35 / 600) * width, 90);
            create_rule("F", "F+f-FF+F+FF+Ff+FF-f+FF-F-FF-Ff-FFF");
            create_rule("f", "ffffff")
        } else if (geo_select.value() == "Koch Variation One") {
            geo_selection = 4;
            set_globals(4, "F-F-F-F", (55 / 600) * width, 90);
            create_rule("F", "FF-F-F-F-F-F+F");
        } else if (geo_select.value() == "Koch Variation Two") {
            geo_selection = 5;
            set_globals(4, "F-F-F-F", (100 / 600) * width, 90);
            create_rule("F", "FF-F-F-F-FF");
        } else if (geo_select.value() == "Koch Variation Three") {
            geo_selection = 6;
            set_globals(3, "F-F-F-F", (185 / 600) * width, 90);
            create_rule("F", "FF-F+F-F-FF");
        } else if (geo_select.value() == "Koch Variation Four") {
            geo_selection = 7;
            set_globals(4, "F-F-F-F", (102 / 600) * width, 90);
            create_rule("F", "FF-F--F-F");
        } else if (geo_select.value() == "Koch Variation Five") {
            geo_selection = 8;
            set_globals(5, "F-F-F-F", (200 / 600) * width, 90);
            create_rule("F", "F-FF--F-F");
        } else if (geo_select.value() == "Koch Variation Six") {
            geo_selection = 9;
            set_globals(4, "F-F-F-F", (250 / 600) * width, 90);
            create_rule("F", "F-F+F-F-F");
        }
        tree_select.value("Pre-set Trees");
        fass_select.value("FASS Curve Pre-sets")
        animate_btn.removeAttribute("disabled");
        animate_btn.attribute("style", "opacity:1");
        generate_btn.removeAttribute("disabled");
        generate_btn.attribute("style", "opacity:1");
        static_length = len;
        showInputs();
        animating = false;
        angle = radians(angle);
        generate();

    });

    fass_select = createSelect();
    fass_select.parent("menu3");
    fass_select.option("FASS Curve Pre-sets")
    fass_select.option("Variation One");
    fass_select.option("Variation Two");
    fass_select.changed(function() {
        delete_rules();
        rules.length = 0;
        gen_calls_num = 0;
        first_iter = true;
        if (fass_select.value() == 'Variation One') {
            geo_selection = 10;
            set_globals(3, "-L", (150 / 600) * width, 90);
            create_rule("L", "LF+RFR+FL-F-LFLFL-FRFR+");
            create_rule("R", "-LFLF+RFRFR+F+RF-LFL-FR");
        } else if (fass_select.value() == 'Variation Two') {
            geo_selection = 11;
            set_globals(3, "L", (150 / 600) * width, 90);
            create_rule("L", "LFRFL-F-RFLFR+F+LFRFL");
            create_rule("R", "RFLFR+F+LFRFL-F-RFLFR");
        }
        tree_select.value("Pre-set Trees");
        geo_select.value("Pre-set Geometrics");
        animate_btn.removeAttribute("disabled");
        animate_btn.attribute("style", "opacity:1");
        generate_btn.removeAttribute("disabled");
        generate_btn.attribute("style", "opacity:1");
        static_length = len;
        animating = false;
        showInputs();
        angle = radians(angle);
        generate();
    });
};

function draw() {

    if (animating == true) {
        frameRate(500);
        plotter_for_animation(sentence.charAt(char_index));
        char_index++;
        if (char_index > sentence.length - 1) {
            animating = false;
        }
    }

}

function set_globals(i, ax, l, ang) {
    iterations = i;
    axiom = ax;
    sentence = axiom;
    len = l;
    angle = ang;
}

function create_rule(a1, b1) {
    var rule = {
        a: a1,
        b: b1
    }
    rules.push(rule);
}

function generate() {
    if ((!iterations || iterations == 0) && axiom_input.value()) {
        if (first_iter == true) {
            sentence = axiom;
            len = static_length;
            plotter();
            first_iter = false;
        } else {
            len *= 0.5;
            var newSentence = "";
            for (var i = 0; i < sentence.length; i++) {
                var char = sentence.charAt(i);
                var found = false;
                for (var j = 0; j < rules.length; j++) {
                    if (char == rules[j].a) {
                        newSentence += rules[j].b;
                        found = true;
                        break;
                    }
                }
                if (found == false) {
                    newSentence += char;
                }
            }
            sentence = newSentence;
            plotter();
        }
    } else {
        sentence = axiom;
        len = static_length;
        for (var k = 0; k < iterations; k++) {
            len *= 0.5;
            var newSentence = "";
            for (var i = 0; i < sentence.length; i++) {
                var char = sentence.charAt(i);
                var found = false;
                for (var j = 0; j < rules.length; j++) {
                    if (char == rules[j].a) {
                        newSentence += rules[j].b;
                        found = true;
                        break;
                    }
                }
                if (found == false) {
                    newSentence += char;
                }
            }
            sentence = newSentence;
        }
        if (animating == false) {
            plotter();

        }
    }
}

function plotter() {
    background(bkg);
    resetMatrix();
    if (geo_selection == 1) {
        translate(width / 4, 3 * height / 4);
    } else if (geo_selection == 2) {
        translate(2, 2 * height / 3);
    } else if (geo_selection == 3) {
        translate(3 * width / 4, 3 * height / 4);
    } else if (geo_selection == 4) {
        translate(width / 7, height / 3);
    } else if (geo_selection == 5) {
        translate(width / 12, 11 * height / 12);
    } else if (geo_selection == 6) {
        translate(3 * width / 5, height / 5);
    } else if (geo_selection == 7) {
        translate(width / 14, 13 * height / 14);
    } else if (geo_selection == 8) {
        translate(width / 2, height / 12);
    } else if (geo_selection == 9) {
        translate(4 + width / 6, 8.25 * height / 10);
    } else if (geo_selection == 10) {
        translate(width / 11, 10 * height / 11);
    } else if (geo_selection == 11) {
        translate(width / 11, 10 * height / 11);
    } else {
        translate(width / 2, height);
    }
    stroke(stroke_color);
    for (var i = 0; i < sentence.length; i++) {
        var char = sentence.charAt(i);
        if (char == "F") {
            line(0, 0, 0, -len);
            translate(0, -len);
        } else if (char == "f") {
            translate(0, -len);
        } else if (char == "+") {
            rotate(-angle);
        } else if (char == "-") {
            rotate(+angle);
        } else if (char == "[") {
            push();
        } else if (char == "]") {
            pop();
        }
    }
}

function plotter_for_animation(char) {
    if (char == "F") {
        var xnew = x + len * cos(radians(heading));
        var ynew = y + len * sin(radians(heading));
        line(x, y, xnew, ynew);
        x = xnew;
        y = ynew;
    } else if (char == "f") {
        var xnew = x + len * cos(radians(heading));
        var ynew = y + len * sin(radians(heading));
        x = xnew;
        y = ynew;
    } else if (char == "+") {
        heading -= degrees(angle);
    } else if (char == "-") {
        heading += degrees(angle);
    } else if (char == "[") {
        var loc = {
            xloc: x,
            yloc: y,
            temp_head: heading,
        }
        locations.push(loc);
    } else if (char == "]") {
        var loc = locations.pop();
        x = parseFloat(loc.xloc);
        y = parseFloat(loc.yloc);
        heading = parseFloat(loc.temp_head);
    }
}

function add_rule() {
    eval('tempA' + rule_count + '=createInput();');
    eval('tempA' + rule_count + '.parent("rules_part_A");');
    eval('tempA' + rule_count + '.input(function(){animating=false})');
    eval('tempB' + rule_count + '=createInput();');
    eval('tempB' + rule_count + '.parent("rules_part_B");');
    eval('tempB' + rule_count + '.input(function(){animating=false})');
    rule_count++;
}

function fillRules() {
    if (initial_ruleA.value() != "" && initial_ruleB.value() != "") {
        var rule = {
            a: initial_ruleA.value(),
            b: initial_ruleB.value()
        };
        rules.push(rule);
        for (var i = 0; i < rule_count; i++) {
            eval('rule ={a:tempA' + i + '.value(), b:tempB' + i + '.value()};');
            rules.push(rule);
        }
        array_filled = true;
    }
}

function showInputs() {
    angle_input.value(angle);
    axiom_input.value(axiom);
    iterations_input.value(iterations);
    len_slider.value(len);
    document.getElementById("inital_length_value").innerHTML = len_slider.value();
    if (typeof rules[0] != 'undefined') {
        initial_ruleA.value(rules[0].a);
        initial_ruleB.value(rules[0].b);
    } else {
        initial_ruleA.value("");
        initial_ruleB.value("");
    }
    for (var i = 1; i < rules.length; i++) {
        eval('tempA' + i + '=createInput();');
        eval('tempA' + i + '.parent("rules_part_A");');
        eval('tempA' + i + '.value("' + rules[i].a + '");');
        eval('tempA' + i + '.input(function(){animating=false})');


        eval('tempB' + i + '=createInput();');
        eval('tempB' + i + '.parent("rules_part_B");');
        eval('tempB' + i + '.value("' + rules[i].b + '");');
        eval('tempB' + i + '.input(function(){animating=false})');

    }
}

function delete_rules() {
    if (typeof rules[0] != 'undefined') {
        rules[0].a = "";
        rules[0].b = "";
    }
    if (typeof tempA1 != 'undefined') {
        for (var i = 1; i < rules.length; i++) {
            rules.pop()
            eval('tempA' + i + '.remove();');
            eval('tempB' + i + '.remove();');
        }
    }
    if (rules.length == 0 && rule_count > 0) {
        var div = document.getElementById("rules_part_A");
        while (div.childNodes.length > 1) {
            div.removeChild(div.lastChild);
        }
        var div = document.getElementById("rules_part_B");
        while (div.childNodes.length > 1) {
            div.removeChild(div.lastChild);
        }
    }
    rules.length = 0;
}

function windowResized() {

    if (isMobileDevice()) {
        resizeCanvas(displayWidth * pixelDensity(), displayWidth * pixelDensity());
    } else {
        resizeCanvas(windowHeight * (2 / 3), windowHeight * (2 / 3));

    }
    clear();
    background(bkg);
}

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};
