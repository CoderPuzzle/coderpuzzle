/**
 * @param {string} s
 * @return {number}
 */
var numSteps = function (s) {
    let steps = 0;
    let carry = 0;
    // Consume bits from the least significant end. An even digit takes
    // one step (divide by two); an odd digit takes two (add one, then
    // divide). The carry records the overflow pushed left by adding 1.
    for (let i = s.length - 1; i > 0; i--) {
        const digit = (s[i] === "1" ? 1 : 0) + carry;
        if (digit % 2 === 0) {
            steps++;
            carry = Math.floor(digit / 2);
        } else {
            steps += 2;
            carry = Math.floor((digit + 1) / 2);
        }
    }
    // Only the leading '1' is left; a pending carry makes it "10",
    // needing one final divide-by-two.
    return steps + carry;
};
