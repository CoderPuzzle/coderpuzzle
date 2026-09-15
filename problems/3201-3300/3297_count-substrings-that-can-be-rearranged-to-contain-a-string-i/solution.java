class Solution {

    public long validSubstringCount(String word1, String word2) {
        // need[c] is how many copies of c a valid window must contain, and
        // missing counts the distinct letters whose quota is not yet met.
        int[] need = new int[26];
        for (char ch : word2.toCharArray()) {
            need[ch - 'a']++;
        }
        int missing = 0;
        for (int c = 0; c < 26; ++c) {
            if (need[c] > 0) {
                missing++;
            }
        }
        int[] window = new int[26];
        long total = 0;
        int left = 0;
        int n = word1.length();
        for (int right = 0; right < n; ++right) {
            int ci = word1.charAt(right) - 'a';
            window[ci]++;
            if (window[ci] == need[ci]) {
                missing--;
            }
            if (missing == 0) {
                // Shrink while the left character is not load-bearing: its
                // removal leaves every quota intact. When this stops,
                // [left..right] is the minimal covering window ending at
                // right, so starts 0..left all yield valid substrings.
                while (window[word1.charAt(left) - 'a'] - 1 >= need[word1.charAt(left) - 'a']) {
                    window[word1.charAt(left) - 'a']--;
                    left++;
                }
                total += left + 1;
            }
        }
        return total;
    }
}
