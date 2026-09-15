class Solution {
  public:
    string lexGreaterPermutation(string s, string target) {
        // Counts of the letters still unused while the built prefix keeps
        // matching target position by position.
        array<int, 26> freq{};
        for (char ch : s) {
            freq[ch - 'a']++;
        }
        // The most recent position where a letter strictly greater than
        // target[i] was still available: that bump point plus the count
        // snapshot taken there is the best fallback completion.
        int bump_at = -1;
        char bump_ch = 0;
        array<int, 26> bump_freq{};
        for (int i = 0; i < (int)target.size(); i++) {
            int ci = target[i] - 'a';
            for (int d = ci + 1; d < 26; d++) {
                if (freq[d] > 0) {
                    bump_at = i;
                    bump_ch = 'a' + d;
                    bump_freq = freq;
                    break;
                }
            }
            if (freq[ci] == 0) {
                break;
            }
            freq[ci]--;
        }
        if (bump_at < 0) {
            return "";
        }
        // Matched prefix, then the bump letter, then everything left in
        // ascending order — the smallest tail this multiset allows.
        string result = target.substr(0, bump_at);
        result += bump_ch;
        bump_freq[bump_ch - 'a']--;
        for (int d = 0; d < 26; d++) {
            result += string(bump_freq[d], 'a' + d);
        }
        return result;
    }
};
