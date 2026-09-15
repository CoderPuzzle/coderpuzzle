class Solution {

    public int countBinarySubstrings(String s) {
        // A valid substring is one block of 0's against an equal block of 1's,
        // straddling a single change of character. Around each boundary the
        // centered pairs number exactly min(prev, cur), the run lengths on the
        // two sides — every shorter pair fits inside the two runs, no longer
        // pair stays grouped — so a sweep that tracks the previous and current
        // run lengths, adding min(prev, cur) at each change, counts them all.
        int total = 0;
        int prev = 0;
        int cur = 1;
        for (int i = 1; i < s.length(); ++i) {
            if (s.charAt(i) == s.charAt(i - 1)) {
                ++cur;
            } else {
                total += Math.min(prev, cur);
                prev = cur;
                cur = 1;
            }
        }
        return total + Math.min(prev, cur);
    }
}
