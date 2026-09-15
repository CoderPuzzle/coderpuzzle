class Solution {

    public int findSubstringInWraproundString(String s) {
        // A substring of base is exactly a run of consecutive alphabet
        // letters, and a run is pinned by its last letter plus its length —
        // the characters before any ending position are forced. So best[c]
        // only needs to track the longest run ending at letter c.
        int[] best = new int[26];
        int run = 0;
        for (int i = 0; i < s.length(); ++i) {
            // The run continues when s.charAt(i) is the alphabet successor
            // of the previous letter, wrapping z -> a; otherwise restart.
            if (i > 0 && (s.charAt(i - 1) - 'a' + 1) % 26 == s.charAt(i) - 'a') {
                run += 1;
            } else {
                run = 1;
            }
            int j = s.charAt(i) - 'a';
            if (run > best[j]) {
                best[j] = run;
            }
        }
        // A run of length L ending at c contributes exactly its L suffixes,
        // all runs, all distinct; the max per letter keeps each once.
        int total = 0;
        for (int value : best) {
            total += value;
        }
        return total;
    }
}
