class Solution {
  public:
    int shortestDistance(vector<string> &wordsDict, string word1, string word2) {
        // One pass remembering the most recent position of each word. The
        // statement guarantees word1 != word2, so no element is ever both.
        int index1 = -1;
        int index2 = -1;
        // The two words sit at distinct indices, so no real gap reaches the
        // length of the list — it is a safe unreachable starting bound.
        int best = (int)wordsDict.size();
        for (int index = 0; index < (int)wordsDict.size(); ++index) {
            if (wordsDict[index] == word1) {
                index1 = index;
            } else if (wordsDict[index] == word2) {
                index2 = index;
            }
            if (index1 >= 0 && index2 >= 0) {
                // A fresh occurrence is closest to the latest opposite
                // occurrence behind it; older ones lie farther back, so this
                // single gap is the only candidate the new occurrence adds.
                best = min(best, abs(index1 - index2));
            }
        }
        return best;
    }
};
