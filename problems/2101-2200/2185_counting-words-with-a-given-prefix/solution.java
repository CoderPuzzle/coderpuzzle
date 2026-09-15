class Solution {

    public int prefixCount(String[] words, String pref) {
        // Straight scan: count the words whose leading characters match
        // pref exactly.
        int count = 0;
        for (String word : words) {
            if (word.startsWith(pref)) {
                ++count;
            }
        }
        return count;
    }
}
