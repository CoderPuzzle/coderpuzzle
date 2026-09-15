class Solution {

    private static final String ALPHABET = "0123456789abcdef";

    public String toHex(int num) {
        // Zero never enters the nibble loop, so it gets its own answer here.
        if (num == 0) {
            return "0";
        }
        // >>> shifts unsigned, so a negative num walks its two's-complement
        // bit pattern and still reaches zero.
        StringBuilder digits = new StringBuilder();
        while (num != 0) {
            digits.append(ALPHABET.charAt(num & 0xF));
            num >>>= 4;
        }
        // Nibbles come out lowest-first, so reverse for the answer.
        return digits.reverse().toString();
    }
}
