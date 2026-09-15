class Solution {
  public:
    int minSubarray(vector<int> &nums, int p) {
        int n = (int)nums.size();
        // values reach 1e9 and the array reaches length 1e5, so the total
        // can reach 1e14 — accumulate in long long before taking the mod.
        long long total = 0;
        for (int value : nums)
            total += value;
        int target = (int)(total % p);
        if (target == 0)
            return 0;

        // Map each running prefix remainder to its most recent index,
        // seeded with the empty prefix (remainder 0 at index -1).
        unordered_map<int, int> lastIndex;
        lastIndex[0] = -1;
        long long running = 0;
        int best = n;
        for (int index = 0; index < n; ++index) {
            running = (running + nums[index]) % p;
            int needed = (int)(((running - target) % p + p) % p);
            auto found = lastIndex.find(needed);
            // A match spanning the full array (earlier == -1 at the last
            // index) would remove everything, which is disallowed — cap
            // the span below n to reject exactly that one case.
            if (found != lastIndex.end()) {
                int span = index - found->second;
                if (span < n && span < best)
                    best = span;
            }
            lastIndex[(int)running] = index;
        }

        return best < n ? best : -1;
    }
};
