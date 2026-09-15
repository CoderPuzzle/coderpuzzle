class Solution {

    private static final String ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    public String concatHex36(int n) {
        // Widening to long keeps the cubic product comfortably inside range.
        return toBase((long) n * n, 16) + toBase((long) n * n * n, 36);
    }

    private String toBase(long x, int b) {
        // n >= 1 makes x >= 1, so the loop always emits at least one digit.
        StringBuilder digits = new StringBuilder();
        while (x != 0) {
            digits.append(ALPHABET.charAt((int) (x % b)));
            x /= b;
        }
        // Digits come out lowest-first, so reverse for the answer.
        return digits.reverse().toString();
    }
}
