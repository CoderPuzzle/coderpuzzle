class Solution {
  public:
    string originalDigits(string s) {
        // Order never matters: the input is a shuffled multiset of letters,
        // so one counting pass fixes every letter count there is to know.
        array<int, 26> counts{};
        for (char ch : s) {
            counts[ch - 'a']++;
        }
        // z, w, u, x and g each occur in exactly one digit word, so they
        // peel off 0, 2, 4, 6 and 8 with no bookkeeping at all.
        array<int, 10> digits{};
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
        string result;
        for (int d = 0; d < 10; ++d) {
            result.append(digits[d], (char)('0' + d));
        }
        return result;
    }
};
