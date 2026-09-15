class Solution {
  public:
    int minFlips(string target) {
        // `current` tracks the bit the string holds at the position just
        // processed, starting from the initial all-zero string. Each
        // mismatch means the suffix from here on needs one more flip, and
        // flips the tracked bit to match.
        char current = '0';
        int count = 0;
        for (char c : target) {
            if (c != current) {
                count++;
                current = c;
            }
        }
        return count;
    }
};
