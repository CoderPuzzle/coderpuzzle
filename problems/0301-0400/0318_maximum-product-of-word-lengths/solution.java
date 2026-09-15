class Solution {

    public int maxProduct(String[] words) {
        int n = words.length;
        // Only the set of distinct letters matters: compress each word into
        // a 26-bit mask (bit set per letter present) plus its length.
        long[] masks = new long[n];
        int[] lens = new int[n];
        for (int i = 0; i < n; i++) {
            long mask = 0;
            for (int j = 0; j < words[i].length(); j++) {
                mask |= 1L << (words[i].charAt(j) - 'a');
            }
            masks[i] = mask;
            lens[i] = words[i].length();
        }
        int best = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Masks AND to zero exactly when the words share no letter.
                if ((masks[i] & masks[j]) == 0 && lens[i] * lens[j] > best) {
                    best = lens[i] * lens[j];
                }
            }
        }
        return best;
    }
}
