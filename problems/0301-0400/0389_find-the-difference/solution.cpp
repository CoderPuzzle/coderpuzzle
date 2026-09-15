class Solution {
  public:
    string findTheDifference(string s, string t) {
        // Every letter of s reappears somewhere in t, so folding both
        // strings into one XOR accumulator cancels each shuffled pair
        // and leaves only the added letter's code.
        char code = 0;
        for (char ch : s) {
            code ^= ch;
        }
        for (char ch : t) {
            code ^= ch;
        }
        return string(1, code);
    }
};
