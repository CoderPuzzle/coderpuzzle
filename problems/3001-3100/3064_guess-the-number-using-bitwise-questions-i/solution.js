class Solution {
    findNumber(hiddenNumber) {
        // A single-bit mask shares at most one bit with n, so the reply is
        // 0 or 1: positive means bit i of n itself is set.
        let number = 0;
        for (let bit = 0; bit < 30; bit++) {
            if (hiddenNumber.commonSetBits(1 << bit) > 0) {
                number |= 1 << bit;
            }
        }
        return number;
    }
}
