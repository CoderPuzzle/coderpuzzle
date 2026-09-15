class Solution {
  public:
    vector<int> addToArrayForm(vector<int> &num, int k) {
        // `num` can hold 10^4 digits, far past any fixed-width integer, so
        // the addition runs schoolbook-style: right to left, one digit at a
        // time, with k itself seeding the running carry.
        int carry = k;
        // at most max(num.size(), 5) + 1 result digits, so num.size() + 5
        // always suffices
        vector<int> result;
        result.reserve(num.size() + 5);
        for (int i = static_cast<int>(num.size()) - 1; i >= 0; --i) {
            carry += num[i];
            result.push_back(carry % 10);
            carry /= 10;
        }
        // whatever of k outlives num keeps flowing out one digit at a time
        while (carry > 0) {
            result.push_back(carry % 10);
            carry /= 10;
        }
        // digits were emitted least-significant first
        reverse(result.begin(), result.end());
        return result;
    }
};
