/**
 * @param {string} s
 * @return {string}
 */
var convertNumber = function (s) {
    // Left-to-right greedy scan: at most one digit word can start at any
    // position (no word is a prefix of another), so taking the first hit
    // is unambiguous. Lengths 3, 4, 5 cover all ten words.
    const words = new Map([
        ["zero", "0"],
        ["one", "1"],
        ["two", "2"],
        ["five", "5"],
        ["three", "3"],
        ["four", "4"],
        ["nine", "9"],
        ["six", "6"],
        ["seven", "7"],
        ["eight", "8"],
    ]);
    const digits = [];
    const n = s.length;
    let i = 0;
    while (i < n) {
        let matched = false;
        for (const length of [3, 4, 5]) {
            if (i + length > n) {
                continue;
            }
            const piece = s.slice(i, i + length);
            if (words.has(piece)) {
                digits.push(words.get(piece));
                i += length;
                matched = true;
                break;
            }
        }
        if (!matched) {
            i += 1;
        }
    }
    return digits.join("");
};
