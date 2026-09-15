class Solution {

    public int findNthDigit(int n) {
        // The sequence splits into blocks by digit length: the 1-digit
        // numbers contribute 9 digits, the 2-digit numbers 180, the
        // 3-digit numbers 2700 — the d-digit block contributes
        // 9 * 10^(d-1) * d. Subtract whole blocks until n lands inside
        // block d, whose numbers start at 10^(d-1); the digit then
        // belongs to base + (n - 1) / d, at offset (n - 1) % d inside it.
        long remaining = n;
        long digits = 1;
        long base = 1;
        long block = 9;
        while (remaining > block) {
            remaining -= block;
            digits++;
            base *= 10;
            block = 9 * base * digits;
        }
        long number = base + (remaining - 1) / digits;
        return Long.toString(number).charAt((int) ((remaining - 1) % digits)) - '0';
    }
}
