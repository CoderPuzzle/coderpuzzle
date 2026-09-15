/**
 * @param {string} s
 * @return {string}
 */
var reverseByType = function (s) {
    // The two reversals act on disjoint position sets — a slot that
    // starts on a letter ends on a letter — so each class can be
    // reversed independently, in place. Each pass walks two pointers
    // inward from the ends, skipping characters outside the class
    // being reversed, and swaps when both sides are on the class.
    const chars = s.split("");
    const n = chars.length;

    const isLetter = (c) => c >= "a" && c <= "z";

    let i = 0;
    let j = n - 1;
    while (i < j) {
        if (!isLetter(chars[i])) {
            i++;
        } else if (!isLetter(chars[j])) {
            j--;
        } else {
            [chars[i], chars[j]] = [chars[j], chars[i]];
            i++;
            j--;
        }
    }

    i = 0;
    j = n - 1;
    while (i < j) {
        if (isLetter(chars[i])) {
            i++;
        } else if (isLetter(chars[j])) {
            j--;
        } else {
            [chars[i], chars[j]] = [chars[j], chars[i]];
            i++;
            j--;
        }
    }
    return chars.join("");
};
