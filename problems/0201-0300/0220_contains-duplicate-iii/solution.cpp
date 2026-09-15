class Solution {
    long long floorDiv(long long x, long long w) {
        // C++ division truncates toward zero; buckets need the floor so
        // negative values land in the bucket they belong to.
        long long q = x / w;
        if (x % w != 0 && x < 0)
            --q;
        return q;
    }

  public:
    bool containsNearbyAlmostDuplicate(vector<long long> &nums, long long indexDiff, long long valueDiff) {
        // Value buckets of width valueDiff + 1, keyed by floor division: two
        // values in one bucket are within valueDiff by construction, so each
        // bucket holds at most one live value and a same-bucket hit is a "yes".
        unordered_map<long long, long long> buckets;
        long long width = valueDiff + 1;
        for (long long index = 0; index < (long long)nums.size(); ++index) {
            if (index > indexDiff) {
                // The window spans only the previous indexDiff positions;
                // retire the bucket of the value that just fell out of it.
                buckets.erase(floorDiv(nums[index - indexDiff - 1], width));
            }
            long long value = nums[index];
            long long bucket = floorDiv(value, width);
            if (buckets.count(bucket))
                return true;
            // Neighbor buckets can hold values up to 2*valueDiff away, so
            // their occupants need a real distance comparison.
            auto below = buckets.find(bucket - 1);
            if (below != buckets.end() && value - below->second <= valueDiff)
                return true;
            auto above = buckets.find(bucket + 1);
            if (above != buckets.end() && above->second - value <= valueDiff)
                return true;
            buckets[bucket] = value;
        }
        return false;
    }
};
