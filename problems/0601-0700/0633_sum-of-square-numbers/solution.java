class Solution {

    public boolean judgeSquareSum(int c) {
        // A witness a² + b² = c confines both roots to 0..isqrt(c) — past
        // the root, one square alone would already top c — and the total
        // rises with a and falls with b, so two pointers sweep that
        // candidate triangle from its ends: a from 0, b from isqrt(c),
        // each probe comparing a² + b² with c, growing a on a shortfall
        // and shrinking b on an overshoot. A window that closes at a > b
        // saw no witness: 5 meets 1² + 2², while 3 runs 0² + 1² and
        // 1² + 1² short and exits. The descent refuses the float root: b
        // starts at 46341, the first root whose square passes the ceiling
        // 2³¹ - 1, and steps down while b² > c — an exact integer landing.
        // The squares live in long: the descent's seed already tops the
        // int cap, and at c = 2³¹ - 1 the probe 297² + 46340² reaches
        // 2147483809, past the cap before b steps down.
        long b = 46341;
        while (b * b > c) {
            --b;
        }
        long a = 0;
        while (a <= b) {
            long total = a * a + b * b;
            if (total == c) {
                return true;
            }
            if (total < c) {
                ++a;
            } else {
                --b;
            }
        }
        return false;
    }
}
