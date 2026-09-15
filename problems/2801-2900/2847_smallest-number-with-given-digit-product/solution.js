/**
 * @param {string} n
 * @return {string}
 */
var smallestNumber = function (n) {
    // BigInt, not Number: the input reaches 10^18, past the 2^53 mark where
    // doubles stop being exact.
    let value = BigInt(n);
    if (value === 1n) {
        return "1";
    }
    // Largest-first trial division packs the factors into as few digits
    // as possible and leaves the smallest remainders behind.
    const counts = new Array(10).fill(0);
    for (let digit = 9; digit >= 2; digit--) {
        const factor = BigInt(digit);
        while (value % factor === 0n) {
            counts[digit]++;
            value /= factor;
        }
    }
    if (value !== 1n) {
        return "-1";
    }
    let answer = "";
    for (let digit = 2; digit <= 9; digit++) {
        answer += String(digit).repeat(counts[digit]);
    }
    return answer;
};
