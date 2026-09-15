class Solution {
  public:
    // Letter values are single decimal digits, so a positional fold
    // (v = v*10 + d) reproduces the concatenated-digit integer.
    bool isSumEqual(string firstWord, string secondWord, string targetWord) {
        auto val = [](const string &w) {
            long long v = 0;
            for (char ch : w)
                v = v * 10 + (ch - 'a');
            return v;
        };
        return val(firstWord) + val(secondWord) == val(targetWord);
    }
};
