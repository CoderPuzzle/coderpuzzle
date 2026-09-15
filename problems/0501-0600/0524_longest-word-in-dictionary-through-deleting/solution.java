class Solution {

    public String findLongestWord(String s, String[] dictionary) {
        // Deleting characters from s leaves a subsequence, so a word is
        // formable exactly when it is one. Walk s once, matching each word
        // character at its earliest legal position — greedy is safe, and the
        // word forms iff the pointer runs off its end.
        String best = "";
        for (String word : dictionary) {
            int i = 0;
            for (int j = 0; j < s.length() && i < word.length(); ++j) {
                if (s.charAt(j) == word.charAt(i)) {
                    i++;
                }
            }
            boolean formable = i == word.length();
            // Longer wins; equal lengths go to the lexicographically smaller
            // word. The empty seed makes the no-answer case return "".
            if (
                formable &&
                (word.length() > best.length() || (word.length() == best.length() && word.compareTo(best) < 0))
            ) {
                best = word;
            }
        }
        return best;
    }
}
