class Solution {
  public:
    bool containsNearbyDuplicate(vector<int> &nums, int k) {
        // Hash map from value -> last index seen: of all earlier copies of a
        // value, the most recent one is the nearest, so one lookup answers
        // "was this value within k positions?" in O(1).
        unordered_map<int, int> lastIndex;
        for (int index = 0; index < (int)nums.size(); ++index) {
            // Look up before inserting, and compare against the LAST earlier
            // occurrence only: if it is out of range, every older one is too.
            auto found = lastIndex.find(nums[index]);
            if (found != lastIndex.end() && index - found->second <= k)
                return true;
            // Overwrite so the entry always holds the most recent position —
            // a first-occurrence map would miss later, closer pairs.
            lastIndex[nums[index]] = index;
        }
        return false;
    }
};
