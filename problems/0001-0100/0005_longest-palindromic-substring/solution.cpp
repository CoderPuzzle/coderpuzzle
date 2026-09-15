class Solution {
  public:
    string longestPalindrome(string s) {
        // {0, 0} makes a single character the initial answer, so the
        // returned substring is never empty.
        int n = s.size();
        pair<int, int> best = {0, 0};
        // Walk outward from a center while the two boundary characters
        // match; each expansion step is a single comparison.
        auto expand = [&](int left, int right) {
            while (left >= 0 && right < n && s[left] == s[right]) {
                left--;
                right++;
            }
            // Overshot by one on each side: back up to the widest palindrome.
            return make_pair(left + 1, right - 1);
        };
        for (int i = 0; i < n; i++) {
            // Try both center kinds: (i, i) for odd lengths, (i, i + 1) for
            // even ones; at the last gap the even case fails immediately.
            pair<int, int> centers[2] = {expand(i, i), expand(i, i + 1)};
            for (auto &[l, r] : centers) {
                // Strict > keeps an earlier palindrome on ties, so the
                // leftmost longest one wins ("babad" -> "bab", not "aba").
                if (r - l > best.second - best.first) {
                    best = {l, r};
                }
            }
        }
        return s.substr(best.first, best.second - best.first + 1);
    }
};
