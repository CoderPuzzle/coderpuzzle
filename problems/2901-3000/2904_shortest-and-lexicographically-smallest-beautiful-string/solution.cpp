class Solution {
  public:
    string shortestBeautifulSubstring(string s, int k) {
        // For a fixed left end i, extending right until the window first
        // holds exactly k ones yields the only shortest beautiful candidate
        // that starts at i: any earlier cut has fewer ones, and any later
        // cut with k ones is strictly longer.
        int n = s.size();
        string best;
        for (int i = 0; i < n; ++i) {
            int ones = 0;
            for (int j = i; j < n; ++j) {
                if (s[j] == '1')
                    ones += 1;
                if (ones == k) {
                    string candidate = s.substr(i, j - i + 1);
                    if (best.empty() || candidate.size() < best.size()) {
                        best = candidate;
                    } else if (candidate.size() == best.size() && candidate < best) {
                        best = candidate;
                    }
                    break;
                }
            }
        }
        return best;
    }
};
