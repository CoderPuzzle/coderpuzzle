class Solution {
  public:
    long long numSquarefulPerms(vector<int> &nums) {
        // Equal values are interchangeable, so a permutation is decided by
        // how many copies of each distinct value land at each step —
        // collapse nums to distinct values with multiplicities, precompute
        // which value pairs sum to a perfect square (pair sums reach
        // 2 * 10^9, so the root must be an exact integer root, never a bare
        // double), and depth-first search: extend a partial sequence only
        // through adjacent values that are still in stock; a branch
        // consuming all n elements is one squareful permutation.
        int n = nums.size();
        vector<int> sorted(nums);
        sort(sorted.begin(), sorted.end());
        vector<int> values;
        vector<int> counts;
        for (int x : sorted) {
            if (values.empty() || values.back() != x) {
                values.push_back(x);
                counts.push_back(1);
            } else {
                counts.back()++;
            }
        }
        int d = values.size();
        vector<vector<bool>> adj(d, vector<bool>(d, false));
        for (int i = 0; i < d; i++) {
            for (int j = 0; j < d; j++) {
                adj[i][j] = isSquare((long long)values[i] + values[j]);
            }
        }
        long long answer = 0;
        for (int start = 0; start < d; start++) {
            counts[start]--;
            answer += walk(counts, adj, start, n - 1);
            counts[start]++;
        }
        return answer;
    }

  private:
    long long walk(vector<int> &counts, const vector<vector<bool>> &adj, int prev, int left) {
        if (left == 0) {
            return 1;
        }
        long long total = 0;
        for (int j = 0; j < (int)counts.size(); j++) {
            if (counts[j] > 0 && adj[prev][j]) {
                counts[j]--;
                total += walk(counts, adj, j, left - 1);
                counts[j]++;
            }
        }
        return total;
    }

    // Exact 64-bit square test: binary-search the floor root of s (a pair
    // sum is at most 2 * 10^9, whose root is below 44722), then compare.
    static bool isSquare(long long s) {
        long long lo = 0, hi = 44722;
        while (lo < hi) {
            long long mid = lo + (hi - lo + 1) / 2;
            if (mid * mid <= s) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return lo * lo == s;
    }
};
