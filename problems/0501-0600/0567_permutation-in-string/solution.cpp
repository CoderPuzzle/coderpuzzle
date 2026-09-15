class Solution {
  public:
    bool checkInclusion(string s1, string s2) {
        int m = s1.size();
        int n = s2.size();
        // No window of length m can exist inside a shorter s2.
        if (m > n) {
            return false;
        }
        array<int, 26> need{};
        array<int, 26> window{};
        for (int i = 0; i < m; i++) {
            need[s1[i] - 'a']++;
            window[s2[i] - 'a']++;
        }
        // Matching frequency vectors means the window is a permutation of s1.
        if (window == need) {
            return true;
        }
        for (int i = m; i < n; i++) {
            // Slide one position: add the entering char, drop the leaving one.
            window[s2[i] - 'a']++;
            window[s2[i - m] - 'a']--;
            if (window == need) {
                return true;
            }
        }
        return false;
    }
};
