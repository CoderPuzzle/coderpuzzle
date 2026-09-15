class Solution {

    public boolean isAlienSorted(String[] words, String order) {
        // Rank of every letter under the alien alphabet.
        int[] rank = new int[26];
        for (int index = 0; index < order.length(); index++) {
            rank[order.charAt(index) - 'a'] = index;
        }
        // Adjacent pairs decide the whole list: any out-of-order pair
        // falsifies it, and each pair's verdict is final.
        for (int i = 0; i + 1 < words.length; i++) {
            String first = words[i];
            String second = words[i + 1];
            // March to the first differing position — the only one that
            // orders this pair.
            int length = Math.min(first.length(), second.length());
            int j = 0;
            while (j < length && first.charAt(j) == second.charAt(j)) {
                j++;
            }
            // A shared prefix: the shorter word is smaller, so only the
            // left word may be short; otherwise the first differing
            // letters decide, and the left word must lose that duel.
            if (j == length) {
                if (first.length() > second.length()) {
                    return false;
                }
            } else if (rank[first.charAt(j) - 'a'] > rank[second.charAt(j) - 'a']) {
                return false;
            }
        }
        return true;
    }
}
