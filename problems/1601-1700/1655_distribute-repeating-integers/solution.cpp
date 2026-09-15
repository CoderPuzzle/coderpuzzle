class Solution {
  public:
    bool canDistribute(vector<int> &nums, vector<int> &quantity) {
        // A customer's integers must all be equal, so each customer draws
        // from a single value — and a value with count c serves any group
        // of customers whose quantities sum to at most c, with several
        // customers free to share one value. Only the counts matter, m is
        // at most 10, and there are at most 50 distinct values, so a
        // subset DP over customer bitmasks, one frequency value at a
        // time, covers every distribution.
        unordered_map<int, int> counts;
        for (int value : nums)
            counts[value]++;
        int m = (int)quantity.size();
        int full = (1 << m) - 1;
        // subsetSums[mask] = total amount ordered by the customers in mask.
        vector<int> subsetSums(1 << m, 0);
        for (int mask = 1; mask <= full; ++mask) {
            int low = mask & -mask;
            subsetSums[mask] = subsetSums[mask ^ low] + quantity[__builtin_ctz(low)];
        }
        // reachable[mask]: the customers in mask are served by the values
        // processed so far. Each value either stays unused (the previous
        // layer carries over) or takes one submask of the still-unsatisfied
        // customers whose quantity sum fits within its count.
        vector<bool> reachable(1 << m, false);
        reachable[0] = true;
        for (const auto &item : counts) {
            int count = item.second;
            vector<bool> next = reachable;
            for (int mask = 0; mask <= full; ++mask) {
                if (!reachable[mask])
                    continue;
                int available = full ^ mask;
                for (int submask = available; submask != 0; submask = (submask - 1) & available) {
                    if (subsetSums[submask] <= count)
                        next[mask | submask] = true;
                }
            }
            reachable = next;
        }
        return reachable[full];
    }
};
