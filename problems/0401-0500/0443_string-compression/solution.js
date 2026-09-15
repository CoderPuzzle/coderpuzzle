/**
 * @param {string[]} chars
 * @return {number}
 */
var compress = function (chars) {
    // Two indexes share one pass: read scans a group of equal
    // characters to its end, write stores the compressed form back
    // into chars itself. A group of k characters compresses to
    // 1 + digits(k) slots — never more than k — so the write frontier
    // always trails the read frontier and overwriting in place is
    // safe. Only the indexes and the run count live outside the
    // array, and the final write index is the compressed length.
    let write = 0;
    let read = 0;
    const n = chars.length;
    while (read < n) {
        const ch = chars[read];
        let runEnd = read;
        while (runEnd < n && chars[runEnd] === ch) {
            ++runEnd;
        }
        const count = runEnd - read;
        chars[write] = ch;
        ++write;
        if (count > 1) {
            for (const digit of String(count)) {
                chars[write] = digit;
                ++write;
            }
        }
        read = runEnd;
    }
    return write;
};
