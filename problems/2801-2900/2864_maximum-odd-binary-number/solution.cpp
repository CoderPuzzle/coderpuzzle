class Solution {
  public:
    string maximumOddBinaryNumber(string s) {
        // Parity fixes the last bit: one '1' must sit in the final position,
        // so push every remaining '1' to the front and let all '0's slot in
        // between them and that trailing one.
        int ones = count(s.begin(), s.end(), '1');
        return string(ones - 1, '1') + string(s.size() - ones, '0') + "1";
    }
};
