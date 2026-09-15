class Solution {

    public int longestSubstring(String s, int k) {
        return longest(s, 0, s.length(), k);
    }

    private int longest(String s, int lo, int hi, int k) {
        if (lo >= hi) return 0;
        int[] counts = new int[128];
        for (int i = lo; i < hi; i++) {
            counts[s.charAt(i)]++;
        }
        // A character rarer than k inside this piece can never reach k by
        // shortening the substring, so it is a hard splitter.
        boolean allFrequent = true;
        for (int c = 0; c < 128; c++) {
            if (counts[c] > 0 && counts[c] < k) {
                allFrequent = false;
                break;
            }
        }
        if (allFrequent) return hi - lo; // no splitter: whole piece valid
        int best = 0;
        int start = lo;
        // Recurse on the pieces between consecutive rare characters; each
        // level eliminates at least one letter, so depth is bounded by 26.
        for (int i = lo; i < hi; i++) {
            if (counts[s.charAt(i)] < k) {
                best = Math.max(best, longest(s, start, i, k));
                start = i + 1;
            }
        }
        best = Math.max(best, longest(s, start, hi, k));
        return best;
    }
}
