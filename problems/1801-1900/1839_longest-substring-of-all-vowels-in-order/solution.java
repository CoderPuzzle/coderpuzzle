class Solution {

    // One pass over vowel runs. A beautiful substring is a maximal run of
    // non-decreasing vowels containing all five; extend the run while the
    // next vowel is >= the current one, then score it.
    public int longestBeautifulSubstring(String word) {
        final String ORDER = "aeiou";
        int best = 0;
        int n = word.length();
        int i = 0;
        while (i < n) {
            if (word.charAt(i) != 'a') {
                i++;
                continue;
            }
            int seen = 1; // bit 0 set: 'a' present
            int j = i + 1;
            while (j < n && word.charAt(j) >= word.charAt(j - 1)) {
                seen |= 1 << ORDER.indexOf(word.charAt(j));
                j++;
            }
            if (seen == 31) {
                best = Math.max(best, j - i);
            }
            i = j > i ? j : i + 1;
        }
        return best;
    }
}
