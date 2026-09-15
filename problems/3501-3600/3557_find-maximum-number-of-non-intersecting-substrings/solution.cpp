class Solution {
  public:
    int maxSubstrings(string word) {
        // Substrings may not share an index, so this is interval
        // scheduling: taking the earliest-finishing valid substring at
        // each step can never push a later choice further right. Scan
        // once, remember each letter's first index inside the current
        // window, and when the running index reaches 3 past it, take that
        // substring and restart the window just past its end.
        int first[26];
        fill(first, first + 26, -1);
        int count = 0;
        for (int i = 0; i < (int)word.size(); i++) {
            int c = word[i] - 'a';
            if (first[c] < 0)
                first[c] = i;
            if (i - first[c] >= 3) {
                count++;
                fill(first, first + 26, -1);
            }
        }
        return count;
    }
};
