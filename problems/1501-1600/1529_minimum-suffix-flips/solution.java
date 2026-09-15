class Solution {

    public int minFlips(String target) {
        // `current` tracks the bit the string holds at the position just
        // processed, starting from the initial all-zero string. Each
        // mismatch means the suffix from here on needs one more flip, and
        // flips the tracked bit to match.
        char current = '0';
        int count = 0;
        for (int i = 0; i < target.length(); i++) {
            char c = target.charAt(i);
            if (c != current) {
                count++;
                current = c;
            }
        }
        return count;
    }
}
