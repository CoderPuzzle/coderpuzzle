class Solution {
  public:
    vector<int> getFinalState(vector<int> &nums, int k, int multiplier) {
        const long long MOD = 1000000007LL;
        int n = static_cast<int>(nums.size());
        vector<int> result(n);
        if (multiplier == 1) {
            // x * 1 == x forever: no operation ever moves a value.
            for (int i = 0; i < n; i++) {
                result[i] = static_cast<int>(nums[i] % MOD);
            }
            return result;
        }
        priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> heap;
        for (int i = 0; i < n; i++) {
            heap.push({nums[i], i});
        }
        long long top = *max_element(nums.begin(), nums.end());
        // Simulate while the product stays within max(nums): every applied
        // value then lands at or below top, so top itself never grows and
        // each element is multiplied at most log2(top) times in this phase.
        while (k > 0 && heap.top().first * multiplier <= top) {
            auto [value, index] = heap.top();
            heap.pop();
            heap.push({value * multiplier, index});
            k--;
        }
        if (k > 0) {
            // Crossover reached: multiplying the smallest now lifts it above
            // everything else, so later operations cycle through the entries
            // in non-decreasing (value, index) order. Each round scales all
            // n values by the multiplier, which preserves that inequality,
            // so the leftover k operations split into q full rounds plus one
            // extra exponent for the first rem entries of the sorted order.
            vector<pair<long long, int>> ordered;
            ordered.reserve(heap.size());
            while (!heap.empty()) {
                ordered.push_back(heap.top());
                heap.pop();
            }
            sort(ordered.begin(), ordered.end());
            long long q = k / n;
            int rem = static_cast<int>(k % n);
            for (int pos = 0; pos < n; pos++) {
                long long exponent = q + (pos < rem ? 1 : 0);
                result[ordered[pos].second] =
                    static_cast<int>(ordered[pos].first % MOD * modPow(multiplier, exponent, MOD) % MOD);
            }
        } else {
            while (!heap.empty()) {
                result[heap.top().second] = static_cast<int>(heap.top().first % MOD);
                heap.pop();
            }
        }
        return result;
    }

  private:
    long long modPow(long long base, long long exponent, long long mod) {
        long long result = 1 % mod;
        base %= mod;
        while (exponent > 0) {
            if ((exponent & 1) == 1) {
                result = result * base % mod;
            }
            base = base * base % mod;
            exponent >>= 1;
        }
        return result;
    }
};
