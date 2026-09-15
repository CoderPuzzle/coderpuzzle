class Solution {
  public:
    string shiftingLetters(string s, vector<int> &shifts) {
        // Letter i is advanced once by every shifts[j] with j >= i, so its
        // total shift is the suffix sum shifts[i..n-1] — one running total
        // on a right-to-left scan replaces all the prefix operations.
        int n = s.size();
        // 10^5 shifts of 10^9 sum to 10^14, far past int, so the total is
        // long long.
        long long total = 0;
        for (int i = n - 1; i >= 0; i--) {
            total += shifts[i];
            // Shifts are non-negative, so % 26 lands the wrap z -> a exactly.
            s[i] = char('a' + (s[i] - 'a' + total % 26) % 26);
        }
        return s;
    }
};
