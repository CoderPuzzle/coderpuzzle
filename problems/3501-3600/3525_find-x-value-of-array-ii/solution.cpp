class Solution {
  public:
    vector<int> resultArray(vector<int> &nums, int k, vector<vector<int>> &queries) {
        // After the update and the forced prefix removal, the operation
        // picks nums[start..j], so a query counts j >= start whose product
        // from start is x mod k. Each segment tree node stores the counts
        // of its segment's prefix products plus the segment product;
        // merging prepends the left product to the right child's counts,
        // and the suffix query merges the decomposition of nums[start..]
        // left to right while carrying the running product. Every stored
        // value is below k <= 5 and every count below n, so ints suffice.
        int n = static_cast<int>(nums.size());
        int size = 1;
        while (size < n)
            size <<= 1;
        vector<int> cnt(2 * size * k, 0);
        vector<int> prod(2 * size, 1);
        for (int i = 0; i < n; ++i) {
            prod[size + i] = nums[i] % k;
            cnt[(size + i) * k + nums[i] % k] = 1;
        }
        for (int u = size - 1; u >= 1; --u)
            merge(cnt, prod, u, k);
        vector<int> result;
        result.reserve(queries.size());
        for (const vector<int> &query : queries) {
            int index = query[0];
            int value = query[1];
            int start = query[2];
            int x = query[3];
            int leaf = size + index;
            int row = leaf * k;
            for (int r = 0; r < k; ++r)
                cnt[row + r] = 0;
            cnt[row + value % k] = 1;
            prod[leaf] = value % k;
            for (int u = leaf >> 1; u >= 1; u >>= 1)
                merge(cnt, prod, u, k);
            int lo = size + start;
            int hi = 2 * size;
            vector<int> cur(k, 0);
            int running = 1;
            while (lo < hi) {
                if (lo & 1) {
                    int base = lo * k;
                    for (int p = 0; p < k; ++p) {
                        int c = cnt[base + p];
                        if (c != 0)
                            cur[running * p % k] += c;
                    }
                    running = running * prod[lo] % k;
                    lo++;
                }
                lo >>= 1;
                hi >>= 1;
            }
            result.push_back(cur[x]);
        }
        return result;
    }

  private:
    static void merge(vector<int> &cnt, vector<int> &prod, int u, int k) {
        int base = u * k;
        int lrow = 2 * u * k;
        int rrow = lrow + k;
        copy(cnt.begin() + lrow, cnt.begin() + lrow + k, cnt.begin() + base);
        int lp = prod[u + u];
        for (int p = 0; p < k; ++p) {
            int c = cnt[rrow + p];
            if (c != 0)
                cnt[base + lp * p % k] += c;
        }
        prod[u] = lp * prod[u + u + 1] % k;
    }
};
