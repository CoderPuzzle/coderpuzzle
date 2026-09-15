class Solution {
  public:
    bool arrayStringsAreEqual(vector<string> &word1, vector<string> &word2) {
        // Walk both arrays with an array index plus an offset inside the
        // current element: the two concatenated streams are compared one
        // character at a time, never materialized.
        size_t array1 = 0;
        size_t offset1 = 0;
        size_t array2 = 0;
        size_t offset2 = 0;
        while (array1 < word1.size() && array2 < word2.size()) {
            if (word1[array1][offset1] != word2[array2][offset2]) {
                return false;
            }
            if (++offset1 == word1[array1].size()) {
                ++array1;
                offset1 = 0;
            }
            if (++offset2 == word2[array2].size()) {
                ++array2;
                offset2 = 0;
            }
        }
        // Equal only if both walks exhausted together: an unfinished array
        // means its concatenation is strictly longer.
        return array1 == word1.size() && array2 == word2.size();
    }
};
