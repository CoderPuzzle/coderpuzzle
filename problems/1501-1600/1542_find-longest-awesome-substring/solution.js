/**
 * @param {string} s
 * @return {number}
 */
var longestAwesome = function (s) {
    // mask is a 10-bit number: bit d is 1 when digit d has appeared an odd
    // number of times in the prefix s[0:i+1]. firstSeen maps a prefix mask
    // to the smallest index that produced it (mask 0 maps to -1, the empty
    // prefix before the string starts). Two prefixes sharing a mask cancel
    // out to all-even digit counts between them (already rearrangeable into
    // a palindrome); two prefixes whose masks differ in exactly one bit
    // cancel to a single odd count (the lone middle character of an
    // odd-length palindrome).
    const firstSeen = new Map([[0, -1]]);
    let mask = 0;
    let best = 0;
    for (let i = 0; i < s.length; ++i) {
        mask ^= 1 << (s.charCodeAt(i) - 48);
        if (firstSeen.has(mask)) {
            best = Math.max(best, i - firstSeen.get(mask));
        } else {
            firstSeen.set(mask, i);
        }
        for (let digit = 0; digit < 10; ++digit) {
            const candidate = mask ^ (1 << digit);
            if (firstSeen.has(candidate)) {
                best = Math.max(best, i - firstSeen.get(candidate));
            }
        }
    }
    return best;
};
