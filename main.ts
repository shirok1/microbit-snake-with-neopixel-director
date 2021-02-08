input.onButtonPressed(Button.A, function () {
    direct += 3
    direct = direct % 4
    strip.clear()
    strip.setPixelColor(direct * 2, neopixel.colors(NeoPixelColors.White))
    strip.show()
})
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
function safe_add_x (布尔值: boolean) {
    if (布尔值 && x < 4) {
        x += 1
        return true
    } else if (!(布尔值) && x > 0) {
        x += -1
        return true
    }
    return false
}
function safe_add_y (布尔值: boolean) {
    if (布尔值 && y < 4) {
        y += 1
        return true
    } else if (!(布尔值) && y > 0) {
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
    food_x = randint(0, 4)
    food_y = randint(0, 4)
    led.plotBrightness(food_x, food_y, 200)
}
let can_undraw = false
let last_y = 0
let last_x = 0
let food_y = 0
let food_x = 0
let y = 0
let x = 0
let direct = 0
let strip: neopixel.Strip = null
strip = neopixel.create(DigitalPin.P0, 8, NeoPixelMode.RGB)
strip.setBrightness(10)
strip.setPixelColor(0, neopixel.colors(NeoPixelColors.White))
strip.show()
let list_x = [-1, -1, -1, -1]
let list_y = [-1, -1, -1, -1]
generate_food()
basic.forever(function () {
    if (pace()) {
        if (x == food_x && y == food_y) {
            generate_food()
        } else {
            last_x = list_x.pop()
            last_y = list_y.pop()
            if (last_x != food_x || last_y != food_y) {
                can_undraw = true
                for (let index = 0; index <= list_x.length; index++) {
                    if (last_x == list_x[index] && last_y == list_y[index]) {
                        can_undraw = false
                        break;
                    }
                }
                if (can_undraw) {
                    led.unplot(last_x, last_y)
                }
            }
        }
        list_x.unshift(x)
        list_y.unshift(y)
        led.plotBrightness(x, y, 255)
        basic.pause(100)
        led.plotBrightness(x, y, 25)
    } else {
        led.plotBrightness(x, y, 255)
        basic.pause(100)
        led.plotBrightness(x, y, 25)
    }
})
