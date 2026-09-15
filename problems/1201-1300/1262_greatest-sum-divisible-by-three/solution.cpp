class Solution {
  public:
    int maxSumDivThree(vector<int> &nums) {
        // best[r]: greatest prefix sum with sum % 3 == r (-1 = unreachable).
        const int NEG = -1;
        array<int, 3> best{0, NEG, NEG};
        for (int x : nums) {
            auto candidate = best;
            for (int r = 0; r < 3; ++r) {
                if (best[r] != NEG) {
                    int nr = (r + x) % 3;
                    if (best[r] + x > candidate[nr]) {
                        candidate[nr] = best[r] + x;
                    }
                }
            }
            best = candidate;
        }
        return best[0];
    }
};
