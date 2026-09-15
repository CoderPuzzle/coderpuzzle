class Solution {
  public:
    int minimumDifference(vector<int> &nums) {
        int half = nums.size() / 2;

        // Bucket each half's subset sums by how many elements produced them;
        // a half of length <= 15 keeps this at most 2^15 entries.
        auto subsetSumsByCount = [&](int from, int to) {
            int m = to - from;
            vector<vector<long long>> res(m + 1);
            for (int mask = 0; mask < (1 << m); ++mask) {
                int cnt = __builtin_popcount(mask);
                long long total = 0;
                for (int i = 0; i < m; ++i) {
                    if (mask >> i & 1) {
                        total += nums[from + i];
                    }
                }
                res[cnt].push_back(total);
            }
            return res;
        };

        vector<vector<long long>> A = subsetSumsByCount(0, half);
        vector<vector<long long>> B = subsetSumsByCount(half, (int)nums.size());

        long long total = 0;
        for (int v : nums) {
            total += v;
        }

        // If the first half contributes c elements with sum a, the second half
        // must contribute exactly half-c elements with sum b — both sides then
        // have `half` elements and difference |total - 2(a+b)|.
        long long ans = LLONG_MAX;
        for (int c = 0; c <= half; ++c) {
            vector<long long> Bc = B[half - c];
            sort(Bc.begin(), Bc.end());
            for (long long a : A[c]) {
                // b >= total/2 - a  <=>  2*b >= total - 2*a (exact integers)
                long long want = total - 2 * a;
                int lo = 0, hi = (int)Bc.size();
                while (lo < hi) {
                    int mid = (lo + hi) / 2;
                    if (2 * Bc[mid] < want) {
                        lo = mid + 1;
                    } else {
                        hi = mid;
                    }
                }
                // The closest b sits on one side of the insertion point — try both.
                int idx = lo;
                if (idx < (int)Bc.size()) {
                    long long d = llabs(total - 2 * (a + Bc[idx]));
                    if (d < ans) {
                        ans = d;
                    }
                }
                if (idx > 0) {
                    long long d = llabs(total - 2 * (a + Bc[idx - 1]));
                    if (d < ans) {
                        ans = d;
                    }
                }
            }
        }
        return (int)ans;
    }
};
