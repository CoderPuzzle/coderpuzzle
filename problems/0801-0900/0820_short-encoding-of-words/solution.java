class Solution {

    public int minimumLengthEncoding(String[] words) {
        // A word needs no slot of its own when another word ends with
        // it: start from every word, then discard strict suffixes.
        java.util.Set<String> keep = new java.util.HashSet<>(java.util.Arrays.asList(words));
        for (String w : words) {
            // Only proper suffixes (k >= 1) are removed, so w itself —
            // and duplicates of it — survive to share a single slot.
            for (int k = 1; k < w.length(); k++) {
                keep.remove(w.substring(k));
            }
        }
        // Survivors are exactly the words no other word ends with; each
        // pays len + 1 for its terminating '#'.
        int total = 0;
        for (String w : keep) {
            total += w.length() + 1;
        }
        return total;
    }
}
