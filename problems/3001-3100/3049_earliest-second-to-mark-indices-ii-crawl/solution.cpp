class Solution {
  public:
    int earliestSecondToMarkIndices(vector<int> &nums, vector<int> &changeIndices) {
        // Binary search the horizon: finishing within t seconds also
        // finishes within t + 1.
        int n = nums.size();
        int lo = 1, hi = changeIndices.size();

        auto canFinish = [&](int t) {
            // Fewer seconds than indices can never mark them all.
            if (t < n)
                return false;
            // First occurrence of every index within [1, t]: clearing at the
            // earliest chance dominates any later pin, since an earlier
            // set-second only relaxes where the mark may land.
            unordered_map<int, int> first;
            for (int s = 0; s < t; ++s)
                if (!first.count(changeIndices[s]))
                    first[changeIndices[s]] = s + 1;
            vector<int> deadlines;
            deadlines.reserve(first.size());
            for (const auto &[v, f] : first)
                deadlines.push_back(f);
            sort(deadlines.begin(), deadlines.end(), greater<int>());
            // Sweep pinned seconds latest to earliest, banking each
            // clearance's saving of nums[v] - 1 (one set-op replaces the
            // whole decrement chain). Every suffix of chosen clearances
            // needs distinct marks after its deadline outside its own pins,
            // capping the suffix at half the window 2 * chosen <= t - f + 1;
            // on a breach give back the banked clearance with the smallest
            // saving.
            priority_queue<int, vector<int>, greater<int>> bank;
            long long saved = 0;
            int chosen = 0;
            for (int f : deadlines) {
                int c = nums[changeIndices[f - 1] - 1];
                if (c < 2)
                    continue;
                bank.push(c);
                saved += c - 1;
                ++chosen;
                while (2LL * chosen > t - f + 1) {
                    saved -= bank.top() - 1;
                    bank.pop();
                    --chosen;
                }
            }
            // Uncleared indices keep their decrement chains; the surviving
            // work plus one mark per index must fit into [1, t]. Values
            // reach n * 10^9, so all accounting stays in long long.
            long long total = n;
            for (int x : nums)
                total += x;
            return total - saved <= t;
        };

        if (!canFinish(hi))
            return -1;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (canFinish(mid))
                hi = mid;
            else
                lo = mid + 1;
        }
        return lo;
    }
};
