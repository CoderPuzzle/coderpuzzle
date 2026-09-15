/**
 * @param {string} command
 * @return {string}
 */
var interpret = function (command) {
    // Scan left to right. 'G' emits "G" and advances 1. An open paren
    // can only begin "()" or "(al)": peek the next character — ')'
    // emits "o" and advances 2, 'a' emits "al" and advances 4.
    const out = [];
    let i = 0;
    while (i < command.length) {
        if (command[i] === "G") {
            out.push("G");
            i += 1;
        } else if (command[i + 1] === ")") {
            out.push("o");
            i += 2;
        } else {
            out.push("al");
            i += 4;
        }
    }
    return out.join("");
};
