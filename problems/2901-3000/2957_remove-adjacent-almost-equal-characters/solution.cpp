class Solution {
  public:
    int removeAlmostEqualCharacters(string word) {
        // Scan left to right. Each almost-equal neighbor pair needs one
        // change; by rewriting word[i] to a letter almost-equal to neither
        // neighbor (always available: each neighbor forbids at most 3 of
        // 26 letters) one change settles both the pair behind and the pair
        // ahead of i, so the scan skips two positions after a change.
        int ops = 0;
        int i = 1;
        while (i < (int)word.size()) {
            if (abs(word[i] - word[i - 1]) <= 1) {
                ++ops;
                i += 2;
            } else {
                ++i;
            }
        }
        return ops;
    }
};
