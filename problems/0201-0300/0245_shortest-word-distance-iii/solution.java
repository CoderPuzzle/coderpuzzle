class Solution {

    public int shortestWordDistance(String[] wordsDict, String word1, String word2) {
        // One pass remembering the most recent position of each word. Here
        // word1 and word2 may be the same word, and that case is the twist.
        boolean same = word1.equals(word2);
        int index1 = -1;
        int index2 = -1;
        // The two queried words occupy two distinct indices, so no real gap
        // reaches the length of the list — it is a safe unreachable bound.
        int best = wordsDict.length;
        for (int index = 0; index < wordsDict.length; ++index) {
            String word = wordsDict[index];
            if (word.equals(word1)) {
                if (same) {
                    // Equal words: the previous occurrence now plays the
                    // counterpart, so only gaps between consecutive
                    // occurrences of the one word are ever compared.
                    index2 = index1;
                }
                index1 = index;
            } else if (word.equals(word2)) {
                index2 = index;
            }
            if (index1 >= 0 && index2 >= 0) {
                // A fresh occurrence is closest to the latest occurrence
                // behind it; older ones lie farther back, so this single gap
                // is the only candidate the new occurrence adds.
                best = Math.min(best, Math.abs(index1 - index2));
            }
        }
        return best;
    }
}
