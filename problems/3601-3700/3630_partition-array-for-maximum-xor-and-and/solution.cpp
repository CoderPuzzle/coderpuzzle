class Solution {
  public:
    long long maximizeXorAndXor(vector<int> &nums) {
        // Enumerate the AND-subset B over all 2^n masks. Two subset tables
        // give AND(B) (all-ones identity, read as 0 for the empty subset
        // per the statement) and XOR(B). With s = XOR of the pool (indices
        // outside B), the best A/C split maximizes x + (s ^ x) over subset
        // XORs x of the pool, and x + (s ^ x) = s + 2 * (x & ~s), so a
        // linear basis over the pool values masked with ~s answers it
        // greedily from the top bit. The bound and(B) + s + 2 * (~s & MASK)
        // prunes most subsets once the incumbent is strong. Sums reach
        // ~3.2e9, so long long accumulation is required.
        int n = nums.size();
        int size = 1 << n;
        int full = (1 << 30) - 1;
        vector<int> andDp(size, 0), xorDp(size, 0);
        andDp[0] = full; // AND identity; the empty subset reads as 0 below
        for (int subset = 1; subset < size; ++subset) {
            int low = subset & -subset;
            int j = __builtin_ctz(low);
            andDp[subset] = andDp[subset ^ low] & nums[j];
            xorDp[subset] = xorDp[subset ^ low] ^ nums[j];
        }
        long long best = 0;
        vector<int> basis(30, 0);
        for (int b = 0; b < size; ++b) {
            int s = xorDp[size - 1] ^ xorDp[b];
            int t = ~s & full;
            long long andB = b == 0 ? 0 : andDp[b];
            if (andB + s + 2LL * t <= best)
                continue;
            int inv = ~s;
            fill(basis.begin(), basis.end(), 0);
            for (int j = 0; j < n; ++j) {
                if (b >> j & 1)
                    continue;
                int w = nums[j] & inv;
                while (w != 0) {
                    int p = 31 - __builtin_clz(w);
                    int top = basis[p];
                    if (top != 0) {
                        w ^= top;
                    } else {
                        basis[p] = w;
                        break;
                    }
                }
            }
            int x = 0;
            for (int p = 29; p >= 0; --p)
                if (basis[p] != 0 && (x >> p & 1) == 0)
                    x ^= basis[p];
            long long val = andB + s + 2LL * x;
            if (val > best)
                best = val;
        }
        return best;
    }
};
