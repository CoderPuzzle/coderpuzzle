class Solution {
  public:
    string maximumXor(string s, string t) {
        int n = s.size();
        int s_ones = count(s.begin(), s.end(), '1');
        int t_ones = count(t.begin(), t.end(), '1');
        // Ones of t that can land on s's '0' positions and zeros of t that
        // can land on s's '1' positions — the largest pair of opposite-bit
        // counts the two multisets allow, maxed together.
        int ones_on_zeros = min(t_ones, n - s_ones);
        int zeros_on_ones = min(n - t_ones, s_ones);
        // Greedy left-to-right fill: spend an opposite bit at each position
        // while its class still has one, which pushes every achievable XOR
        // one as far left as it can go.
        string result;
        result.reserve(n);
        for (char ch : s) {
            if (ch == '0') {
                if (ones_on_zeros > 0) {
                    result += '1';
                    ones_on_zeros--;
                } else {
                    result += '0';
                }
            } else if (zeros_on_ones > 0) {
                result += '1';
                zeros_on_ones--;
            } else {
                result += '0';
            }
        }
        return result;
    }
};
