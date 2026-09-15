class Solution {
  public:
    int tripletCount(vector<int> &a, vector<int> &b, vector<int> &c) {
        // XOR never creates or destroys parity: every bit position of the
        // result holds the mod-2 sum of the operands' bits there, so a
        // triplet's XOR has an even number of set bits exactly when an even
        // number of its operands — zero or two — carries an odd popcount.
        vector<int> evens(3, 0);
        vector<int> odds(3, 0);
        const vector<vector<int> *> arrays = {&a, &b, &c};
        for (int i = 0; i < 3; ++i) {
            for (int x : *arrays[i]) {
                if (__builtin_popcount(x) % 2 == 0) {
                    ++evens[i];
                } else {
                    ++odds[i];
                }
            }
        }
        return evens[0] * evens[1] * evens[2] + odds[0] * odds[1] * evens[2] + odds[0] * evens[1] * odds[2] +
               evens[0] * odds[1] * odds[2];
    }
};
