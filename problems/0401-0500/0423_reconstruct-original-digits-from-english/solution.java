class Solution {

    public String originalDigits(String s) {
        // Order never matters: the input is a shuffled multiset of letters,
        // so one counting pass fixes every letter count there is to know.
        int[] counts = new int[26];
        for (int i = 0; i < s.length(); ++i) {
            counts[s.charAt(i) - 'a']++;
        }
        // z, w, u, x and g each occur in exactly one digit word, so they
        // peel off 0, 2, 4, 6 and 8 with no bookkeeping at all.
        int[] digits = new int[10];
        digits[0] = counts['z' - 'a'];
        digits[2] = counts['w' - 'a'];
        digits[4] = counts['u' - 'a'];
        digits[6] = counts['x' - 'a'];
        digits[8] = counts['g' - 'a'];
        // h, f and s are each shared with exactly one already-known digit
        // — 8, 4 and 6 respectively — so subtracting those yields 3, 5, 7.
        digits[3] = counts['h' - 'a'] - digits[8];
        digits[5] = counts['f' - 'a'] - digits[4];
        digits[7] = counts['s' - 'a'] - digits[6];
        // o is shared with 0, 2 and 4; i with 5, 6 and 8. n is never
        // consulted: "nine" holds two of them against one apiece in "one"
        // and "seven", while its single i settles the count cleanly.
        digits[1] = counts['o' - 'a'] - digits[0] - digits[2] - digits[4];
        digits[9] = counts['i' - 'a'] - digits[5] - digits[6] - digits[8];
        // Ascending digits, each repeated as often as it was spelled.
        StringBuilder result = new StringBuilder();
        for (int d = 0; d < 10; ++d) {
            for (int k = 0; k < digits[d]; ++k) {
                result.append((char) ('0' + d));
            }
        }
        return result.toString();
    }
}
