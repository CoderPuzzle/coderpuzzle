class Solution {

    public int maxDistance(String[] words) {
        // When the outermost words already differ, that pair spans the whole
        // array and nothing can beat it. String equality needs equals().
        int n = words.length;
        if (!words[0].equals(words[n - 1])) {
            return n;
        }
        // The ends share one word, so any word differing from it pairs with
        // whichever end it does not sit at: the first such index widens the
        // pair with the last slot, the last such index widens the pair with
        // slot 0, and each scan can stop at its first hit.
        int best = 0;
        for (int i = 0; i < n; i++) {
            if (!words[i].equals(words[0])) {
                best = n - i;
                break;
            }
        }
        for (int j = n - 1; j >= 0; j--) {
            if (!words[j].equals(words[n - 1])) {
                best = Math.max(best, j + 1);
                break;
            }
        }
        // No differing word at all means every word is equal.
        return best;
    }
}
