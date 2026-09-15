/**
 * @param {string} text
 * @return {string}
 */
var reorderSpaces = function (text) {
    const words = text.split(" ").filter((w) => w.length > 0);
    const spaces = text.split(" ").length - 1;

    if (words.length === 1) {
        // A single word: every space is trailing.
        return words[0] + " ".repeat(spaces);
    }

    // Distribute spaces as evenly as possible between the gaps, and push
    // whatever does not divide evenly to the end.
    const gaps = words.length - 1;
    const between = Math.floor(spaces / gaps);
    const extra = spaces % gaps;

    return words.join(" ".repeat(between)) + " ".repeat(extra);
};
