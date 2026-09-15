class Solution {
  public:
    int sumOfPowers(vector<int> &nums, int k) {
        const long long MOD = 1000000007LL;
        int n = nums.size();
        vector<long long> a(nums.begin(), nums.end());
        sort(a.begin(), a.end());
        vector<long long> diffs;
        {
            set<long long> diffSet;
            for (int i = 0; i < n; i++) {
                for (int j = i + 1; j < n; j++) {
                    diffSet.insert(a[j] - a[i]);
                }
            }
            diffs.assign(diffSet.begin(), diffSet.end());
        }

        long long ans = 0;
        long long prevF = 0;
        for (int idx = (int)diffs.size() - 1; idx >= 0; idx--) {
            long long d = diffs[idx];
            long long f = countAtLeast(a, d, k, MOD);
            long long g = ((f - prevF) % MOD + MOD) % MOD;
            ans = (ans + (d % MOD) * g % MOD) % MOD;
            prevF = f;
        }
        return (int)ans;
    }

  private:
    // number of length-k subsequences with all adjacent gaps >= d
    long long countAtLeast(vector<long long> &a, long long d, int k, long long MOD) {
        int n = (int)a.size();
        vector<int> splits(n);
        for (int j = 0; j < n; j++) {
            long long target = a[j] - d;
            int lo = 0;
            int hi = j;
            while (lo < hi) {
                int mid = lo + (hi - lo) / 2;
                if (a[mid] <= target) {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            splits[j] = lo;
        }
        vector<long long> prev(n, 1);
        for (int length = 2; length <= k; length++) {
            vector<long long> pref(n + 1, 0);
            for (int i = 0; i < n; i++) {
                pref[i + 1] = pref[i] + prev[i];
            }
            if (pref[n] == 0) {
                return 0;
            }
            vector<long long> cur(n);
            for (int j = 0; j < n; j++) {
                cur[j] = pref[splits[j]] % MOD;
            }
            prev = cur;
        }
        long long total = 0;
        for (int i = 0; i < n; i++) {
            total += prev[i];
        }
        return total % MOD;
    }
};
