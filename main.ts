function loop_add_x (right: boolean) {
    if (right) {
        x += 1
    } else {
        x += 4
    }
    x = x % 5
    return true
}
input.onButtonPressed(Button.A, function () {
    direct += 3
    direct = direct % 4
    strip.clear()
    strip.setPixelColor(direct * 2, neopixel.colors(NeoPixelColors.White))
    strip.show()
})
function will_hit_body (x: number, y: number) {
    will_hit = false
    for (let hit_iter_index = 0; hit_iter_index <= list_x.length; hit_iter_index++) {
        if (x == list_x[hit_iter_index] && y == list_y[hit_iter_index]) {
            will_hit = true
            break;
        }
    }
    return will_hit
}
function pace () {
    if (direct == 0) {
        return safe_add_x(true)
    } else if (direct == 1) {
        return safe_add_y(true)
    } else if (direct == 2) {
        return safe_add_x(false)
    } else {
        return safe_add_y(false)
    }
}
function loop_add_y (down: boolean) {
    if (down) {
        y += 1
    } else {
        y += 4
    }
    y = y % 5
    return true
}
function pace_loop () {
    if (direct == 0) {
        return loop_add_x(true)
    } else if (direct == 1) {
        return loop_add_y(true)
    } else if (direct == 2) {
        return loop_add_x(false)
    } else {
        return loop_add_y(false)
    }
}
function safe_add_x (right: boolean) {
    if (right && x < 4) {
        x += 1
        return true
    } else if (!(right) && x > 0) {
        x += -1
        return true
    }
    return false
}
input.onButtonPressed(Button.AB, function () {
    basic.clearScreen()
    framerate = framerate / 1.1
    init()
})
function init () {
    basic.clearScreen()
    strip.setPixelColor(0, neopixel.colors(NeoPixelColors.White))
    strip.show()
    x = 0
    y = 0
    direct = 0
    score = 0
    list_x = [0, -1, -2, -3]
    list_y = [0, 0, 0, 0]
    led.plotBrightness(x, y, 25)
    generate_food()
    died = false
}
function safe_add_y (down: boolean) {
    if (down && y < 4) {
        y += 1
        return true
    } else if (!(down) && y > 0) {
        y += -1
        return true
    }
    return false
}
input.onButtonPressed(Button.B, function () {
    direct += 1
    direct = direct % 4
    strip.clear()
    strip.setPixelColor(direct * 2, neopixel.colors(NeoPixelColors.White))
    strip.show()
})
function generate_food () {
    while (true) {
        food_x = randint(0, 4)
        food_y = randint(0, 4)
        if (!(x == food_x && y == food_y) && !(will_hit_body(food_x, food_y))) {
            break;
        }
    }
    led.plotBrightness(food_x, food_y, 200)
}
let last_y = 0
let last_x = 0
let food_y = 0
let food_x = 0
let died = false
let score = 0
let y = 0
let list_y: number[] = []
let list_x: number[] = []
let will_hit = false
let direct = 0
let x = 0
let framerate = 0
let strip: neopixel.Strip = null
strip = neopixel.create(DigitalPin.P0, 8, NeoPixelMode.RGB)
strip.setBrightness(10)
framerate = 500
init()
basic.forever(function () {
    if (died) {
        basic.showIcon(IconNames.No)
        basic.pause(100)
        basic.showString("" + (score))
        basic.pause(1000)
        while (died) {
            basic.clearScreen()
            basic.pause(100)
            basic.showIcon(IconNames.No)
            basic.pause(100)
        }
    }
    if (pace_loop()) {
        if (will_hit_body(x, y)) {
            died = true
        } else {
            if (x == food_x && y == food_y) {
                score += 1
                generate_food()
            } else {
                last_x = list_x.pop()
                last_y = list_y.pop()
                if (x == last_x && y != last_y) {
                    died = false
                }
                led.unplot(last_x, last_y)
            }
            list_x.unshift(x)
            list_y.unshift(y)
            led.plotBrightness(x, y, 255)
            basic.pause(framerate)
            led.plotBrightness(x, y, 25)
        }
    } else {
        led.plotBrightness(x, y, 0)
        basic.pause(framerate)
        led.plotBrightness(x, y, 25)
    }
})
