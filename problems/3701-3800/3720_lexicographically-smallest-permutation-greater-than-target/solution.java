class Solution {

    public String lexGreaterPermutation(String s, String target) {
        // Counts of the letters still unused while the built prefix keeps
        // matching target position by position.
        int[] freq = new int[26];
        for (int i = 0; i < s.length(); i++) {
            freq[s.charAt(i) - 'a']++;
        }
        // The most recent position where a letter strictly greater than
        // target[i] was still available: that bump point plus the count
        // snapshot taken there is the best fallback completion.
        int bumpAt = -1;
        char bumpCh = 0;
        int[] bumpFreq = null;
        for (int i = 0; i < target.length(); i++) {
            int ci = target.charAt(i) - 'a';
            for (int d = ci + 1; d < 26; d++) {
                if (freq[d] > 0) {
                    bumpAt = i;
                    bumpCh = (char) ('a' + d);
                    bumpFreq = freq.clone();
                    break;
                }
            }
            if (freq[ci] == 0) {
                break;
            }
            freq[ci]--;
        }
        if (bumpAt < 0) {
            return "";
        }
        // Matched prefix, then the bump letter, then everything left in
        // ascending order — the smallest tail this multiset allows.
        StringBuilder result = new StringBuilder(target.substring(0, bumpAt));
        result.append(bumpCh);
        bumpFreq[bumpCh - 'a']--;
        for (int d = 0; d < 26; d++) {
            for (int k = 0; k < bumpFreq[d]; k++) {
                result.append((char) ('a' + d));
            }
        }
        return result.toString();
    }
}
