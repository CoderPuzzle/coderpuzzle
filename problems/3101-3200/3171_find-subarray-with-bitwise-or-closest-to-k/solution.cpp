class Solution {
  public:
    int minimumDifference(vector<int> &nums, int k) {
        // Seed from the first element so single-element subarrays are covered.
        int best = abs(nums[0] - k);
        // Empty-subarray seed: 0 | v = v lets the first build produce {v}.
        vector<int> current;
        current.push_back(0);
        // OR never clears bits, so the nested frontier holds at most ~31 values.
        for (int value : nums) {
            // New frontier: {value} plus every previous OR extended by value.
            vector<int> nxt;
            nxt.push_back(value);
            for (int prev : current)
                nxt.push_back(prev | value);
            sort(nxt.begin(), nxt.end());
            nxt.erase(unique(nxt.begin(), nxt.end()), nxt.end());
            current = move(nxt);
            for (int x : current) {
                int diff = abs(x - k);
                if (diff < best)
                    best = diff;
            }
        }
        return best;
    }
};
