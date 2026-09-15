/**
 * @param {string} s
 * @return {string}
 */
var finalString = function (s) {
    // Type characters into one growing buffer: letters append, and each
    // 'i' reverses everything typed so far. After the last keystroke the
    // buffer is exactly the laptop screen.
    const screen = [];
    for (const c of s) {
        if (c === "i") {
            screen.reverse();
        } else {
            screen.push(c);
        }
    }
    return screen.join("");
};
