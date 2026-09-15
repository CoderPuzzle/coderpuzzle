class Solution {
  public:
    int deleteAndEarn(vector<int> &nums) {
        // Deleting one copy of v removes its neighbors for free, so a strategy
        // just picks distinct values, earning v * count[v] each — house-robber
        // over the sorted distinct values (ordered map).
        map<int, long long> count;
        for (int v : nums)
            count[v]++;
        long long take = 0, skip = 0;
        bool hasPrev = false;
        int prev = 0;
        for (const auto &[value, c] : count) {
            // Adjacent predecessor conflicts with its take; a gap (missing v-1)
            // makes taking v conflict with nothing, so both states carry in.
            long long base = (hasPrev && prev == value - 1) ? skip : max(take, skip);
            long long newTake = base + (long long)value * c;
            long long newSkip = max(take, skip);
            take = newTake;
            skip = newSkip;
            prev = value;
            hasPrev = true;
        }
        return (int)max(take, skip);
    }
};
