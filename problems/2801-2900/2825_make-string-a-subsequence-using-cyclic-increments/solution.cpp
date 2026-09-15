class Solution {
  public:
    bool canMakeSubsequence(string str1, string str2) {
        // Walk str1 once with a pointer into str2. Whenever str2[j] equals
        // str1[i], or equals its cyclic successor, take the pair and advance
        // both pointers: claiming the earliest eligible slot never displaces
        // a better later choice, because everything that fits after it also
        // fits after any other valid pick. Matching all of str2 this way is
        // exactly what was asked for.
        int j = 0;
        for (char c : str1) {
            if (j < (int)str2.size() && (str2[j] - c + 26) % 26 <= 1) {
                ++j;
            }
        }
        return j == (int)str2.size();
    }
};
