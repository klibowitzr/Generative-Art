function particle() {
    var black = color(0, 0, 0);
    var white = color(255, 255, 255);
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.maxspeed = 2;
    if (colorselection == "solidx2") {
        if (random() > .5) {
            this.color = solid1_color_picker.color();
        } else {
            this.color = solid2_color_picker.color();
        }
    }
    if (colorselection == "lerpv2" || colorselection == "random lerp v2") {
        this.color = lerpColor(lerpv1_color_picker.color(), lerpv2_color_picker.color(), random());
    }

    this.prev_position = this.position.copy();

    this.update = function() {
        this.position.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    this.follow = function(vectors) {
        var x = floor(this.position.x / v_step);
        var y = floor(this.position.y / v_step);
        var index = x + y * columns;
        var force = vectors[index];
        this.acceleration.add(force);
    }


    this.draw = function() {
        if (colorselection == "sand") {
            if (random() > .5) {
                stroke_color = lerpColor(black, gradient_color_picker.color(), noise(xoffset, yoffset));
            } else {
                stroke_color = lerpColor(white, gradient_color_picker.color(), noise(xoffset, yoffset));
            }
            stroke_color.setAlpha(alpha_value)
        } else if (colorselection == "static") {
            stroke_color = color(random(255), random(255), random(255));
            stroke_color.setAlpha(alpha_value);
        } else if (colorselection == "solid" || colorselection == "random") {
            stroke_color = solid_color_picker.color();
            stroke_color.setAlpha(alpha_value);
        } else if (colorselection == "lerp" || colorselection == "random lerp") {
            stroke_color = lerpColor(lerp2_color_picker.color(), lerp1_color_picker.color(), (width / 5) / this.position.x);
            stroke_color.setAlpha(alpha_value);
        } else if (colorselection == "solidx2") {
            stroke_color = this.color;
            stroke_color.setAlpha(alpha_value);
        } else if (colorselection == "lerpv2" || colorselection == "random lerp v2") {
            stroke_color = this.color;
            stroke_color.setAlpha(alpha_value);
        }


        stroke(stroke_color);
        strokeWeight(1);
        line(this.position.x, this.position.y, this.prev_position.x, this.prev_position.y);
        this.prev_position.x = this.position.x;
        this.prev_position.y = this.position.y;
    }

    this.wrap = function() {
        if (this.position.x > width) {
            this.position.x = 0;
            this.prev_position.x = this.position.x;
            this.prev_position.y = this.position.y;
        }
        if (this.position.x < 0) {
            this.position.x = width;
            this.prev_position.x = this.position.x;
            this.prev_position.y = this.position.y;
        }
        if (this.position.y >= height) {
            this.position.y = 0;
            this.prev_position.x = this.position.x;
            this.prev_position.y = this.position.y;
        }
        if (this.position.y < 0) {
            this.position.x = height;
            this.prev_position.x = this.position.x;
            this.prev_position.y = this.position.y;
        }
    }
}
