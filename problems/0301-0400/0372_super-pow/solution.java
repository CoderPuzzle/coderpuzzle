class Solution {

    public int superPow(int a, int[] b) {
        // Appending digit d to the digits-so-far x moves the exponent to
        // 10x + d, and a^(10x+d) = (a^x)^10 * a^d — so one left-to-right
        // pass keeps result = a^x mod 1337, replacing it with result^10 *
        // a^d each step. powmod is square-and-multiply and reduces its
        // base mod 1337, so every product stays below 1337^2 = 1,787,569,
        // well inside 32-bit range.
        int result = 1;
        for (int digit : b) result = (powmod(result, 10) * powmod(a, digit)) % 1337;
        return result;
    }

    private int powmod(int base, int exponent) {
        int result = 1;
        base %= 1337;
        while (exponent > 0) {
            if ((exponent & 1) == 1) result = (result * base) % 1337;
            base = (base * base) % 1337;
            exponent >>= 1;
        }
        return result;
    }
}
