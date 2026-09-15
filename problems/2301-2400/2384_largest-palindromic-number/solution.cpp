class Solution {
  public:
    string largestPalindromic(string num) {
        // Spend each digit's full pairs into the left half, highest
        // digit first; the largest odd-count digit becomes the center.
        // Zero pairs are worthless without a nonzero digit ahead of
        // them, so a leading-zero half is stripped; all zeros -> "0".
        array<int, 10> cnt{};
        for (char c : num) {
            ++cnt[c - '0'];
        }
        string half;
        char mid = 0;
        for (int d = 9; d >= 0; --d) {
            half.append(cnt[d] / 2, char('0' + d));
            if (mid == 0 && cnt[d] % 2 == 1) {
                mid = char('0' + d);
            }
        }
        size_t lead = half.find_first_not_of('0');
        half = (lead == string::npos) ? "" : half.substr(lead);
        if (half.empty() && mid == 0) {
            return "0";
        }
        string right(half.rbegin(), half.rend());
        string ans = half;
        if (mid != 0) {
            ans += mid;
        }
        return ans + right;
    }
};
