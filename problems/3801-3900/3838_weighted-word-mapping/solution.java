class Solution {

    public String mapWordWeights(String[] words, int[] weights) {
        // Each word's weight is the sum of its characters' entries in
        // weights — at most 10 chars * 100 = 1000, comfortably inside an
        // int. Reflecting that total's residue mod 26 down from 'z' gives
        // one letter per word (0 -> 'z', 1 -> 'y', ..., 25 -> 'a').
        StringBuilder result = new StringBuilder(words.length);
        for (String word : words) {
            int total = 0;
            for (int i = 0; i < word.length(); i++) {
                total += weights[word.charAt(i) - 'a'];
            }
            result.append((char) ('z' - (total % 26)));
        }
        return result.toString();
    }
}
