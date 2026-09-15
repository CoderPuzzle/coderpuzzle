class Solution {

    public int shortestDistance(String[] wordsDict, String word1, String word2) {
        // One pass remembering the most recent position of each word. The
        // statement guarantees word1 != word2, so no element is ever both.
        int index1 = -1;
        int index2 = -1;
        // The two words sit at distinct indices, so no real gap reaches the
        // length of the list — it is a safe unreachable starting bound.
        int best = wordsDict.length;
        for (int index = 0; index < wordsDict.length; ++index) {
            String word = wordsDict[index];
            if (word.equals(word1)) {
                index1 = index;
            } else if (word.equals(word2)) {
                index2 = index;
            }
            if (index1 >= 0 && index2 >= 0) {
                // A fresh occurrence is closest to the latest opposite
                // occurrence behind it; older ones lie farther back, so this
                // single gap is the only candidate the new occurrence adds.
                best = Math.min(best, Math.abs(index1 - index2));
            }
        }
        return best;
    }
}
