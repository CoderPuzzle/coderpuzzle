/**
 * @param {string} s
 * @return {string}
 */
var processStr = function (s) {
    // The specials mutate the result built so far: letters append,
    // '*' drops the tail, '#' doubles, '%' reverses. With s capped at
    // 20 chars the result never exceeds 2^19 characters, so building
    // the string directly is cheap and obviously correct.
    let result = "";
    for (const ch of s) {
        if (ch >= "a" && ch <= "z") {
            result += ch;
        } else if (ch === "*") {
            result = result.slice(0, -1);
        } else if (ch === "#") {
            result += result;
        } else {
            // '%'
            result = result.split("").reverse().join("");
        }
    }
    return result;
};
