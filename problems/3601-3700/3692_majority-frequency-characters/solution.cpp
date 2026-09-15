class Solution {
  public:
    string majorityFrequencyGroup(string s) {
        // Tally every occurrence into a fixed 26-slot table; the
        // lowercase-only input makes each index a plain offset from 'a'.
        array<int, 26> counts{};
        for (char ch : s) {
            counts[ch - 'a']++;
        }
        // Evaluate each candidate frequency's bucket and keep the largest
        // gathering of distinct characters; sweeping frequencies upward lets
        // ">=" hand size ties to the larger frequency, and the ascending slot
        // scan collects the winners already in lexicographic order.
        string best;
        for (int k = 1; k <= (int)s.size(); k++) {
            string chars;
            for (int i = 0; i < 26; i++) {
                if (counts[i] == k) {
                    chars += (char)('a' + i);
                }
            }
            if (chars.size() >= best.size()) {
                best = chars;
            }
        }
        return best;
    }
};
