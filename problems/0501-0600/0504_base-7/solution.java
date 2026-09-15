class Solution {

    public String convertToBase7(int num) {
        // Zero never enters the digit loop, so it gets its own answer here.
        if (num == 0) {
            return "0";
        }
        // Digits of the magnitude come out lowest-first; the sign is kept
        // aside and prepended at the end.
        boolean negative = num < 0;
        int value = negative ? -num : num;
        StringBuilder digits = new StringBuilder();
        while (value != 0) {
            // Split off the low base-7 digit, then shift the rest down.
            digits.append((char) ('0' + (value % 7)));
            value /= 7;
        }
        // Digits come out lowest-first, so reverse for the answer.
        if (negative) {
            digits.append('-');
        }
        return digits.reverse().toString();
    }
}
