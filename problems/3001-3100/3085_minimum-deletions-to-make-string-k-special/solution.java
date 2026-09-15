class Solution {

    public int minimumDeletions(String word, int k) {
        // Deletion only lowers counts, so some kept letter ends up with the
        // smallest final frequency x and every other kept letter must land
        // in [x, x + k]: letters above the window donate their excess,
        // letters below it vanish entirely. Trying each letter's original
        // count as x covers the optimum, since the winning x is always a
        // count that some letter keeps for free.
        int[] counts = new int[26];
        for (int i = 0; i < word.length(); i++) {
            counts[word.charAt(i) - 'a']++;
        }
        int best = word.length();
        for (int base : counts) {
            int deletions = 0;
            for (int cnt : counts) {
                if (cnt < base) {
                    deletions += cnt;
                } else if (cnt > base + k) {
                    deletions += cnt - (base + k);
                }
            }
            best = Math.min(best, deletions);
        }
        return best;
    }
}
