class Solution {
  public:
    int maxXorSubsequences(vector<int> &nums) {
        // A subsequence's XOR only depends on which positions it picks, and
        // XOR-ing two achievable values is again achievable, while any
        // achievable z arises as z ^ 0: the answer is the largest XOR any
        // subset can form, the classic linear-basis maximum.
        vector<int> basis(30, 0); // basis[b] leads with bit b; nums[i] < 2^30
        for (int v : nums) {
            int cur = v;
            while (cur != 0) {
                int b = 31 - __builtin_clz(cur);
                if (basis[b] != 0) {
                    cur ^= basis[b]; // dependent: strip the leading bit
                } else {
                    basis[b] = cur; // free leading bit: store and stop
                    break;
                }
            }
        }
        // Greedy fold, highest pivot first: take a vector iff it grows the
        // answer. An all-zero input leaves the basis empty at 0.
        int ans = 0;
        for (int b = 29; b >= 0; --b) {
            if (basis[b] != 0 && (ans ^ basis[b]) > ans) {
                ans ^= basis[b];
            }
        }
        return ans;
    }
};
