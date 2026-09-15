/**
 * @param {string} binary
 * @return {string}
 */
var maximumBinaryString = function (binary) {
    // Both rules only shuffle zeros: "10" -> "01" slides a zero one seat
    // left, and "00" -> "10" fuses an adjacent pair into their right seat.
    // Herding all z zeros into the first one (index first) parks the
    // survivor at first + z - 1 with '1' everywhere else; with at most
    // one zero no move can improve the string.
    let zeros = 0;
    let first = -1;
    for (let i = 0; i < binary.length; i++) {
        if (binary[i] === "0") {
            zeros++;
            if (first < 0) {
                first = i;
            }
        }
    }
    if (zeros <= 1) {
        return binary;
    }
    const seat = first + zeros - 1;
    return "1".repeat(seat) + "0" + "1".repeat(binary.length - seat - 1);
};
