class Solution {
  public:
    int romanToInt(string s) {
        // One left-to-right pass: every symbol contributes its value, except
        // the left half of a subtractive pair, which is taken away instead.
        const unordered_map<char, int> values = {{'I', 1},   {'V', 5},   {'X', 10},  {'L', 50},
                                                 {'C', 100}, {'D', 500}, {'M', 1000}};
        int total = 0;
        for (int i = 0; i < (int)s.size(); ++i) {
            int value = values.at(s[i]);
            // A value smaller than its right neighbor marks one of the six
            // subtractive pairs (IV, IX, XL, XC, CD, CM): the pair is worth
            // right - left, so this symbol is subtracted rather than added.
            // The last symbol has no right neighbor and is always added.
            if (i + 1 < (int)s.size() && value < values.at(s[i + 1])) {
                total -= value;
            } else {
                total += value;
            }
        }
        return total;
    }
};
