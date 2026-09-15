class Solution {
  public:
    bool isPossibleDivide(vector<int> &nums, int k) {
        int len = nums.size();
        // size-k sets can partition the array only if k divides n
        if (len % k != 0)
            return false;
        map<int, int> counts;
        for (int x : nums) {
            counts[x]++;
        }
        // std::map iterates smallest-first: the smallest remaining value
        // forces its run — every set containing it is exactly v..v+k-1
        for (const auto &[value, count] : counts) {
            int need = count;
            // already fully consumed by runs started below
            if (need <= 0)
                continue;
            // each of the need copies of value starts its own run; any of
            // the next k values falling short means no valid division exists
            for (int i = value; i < value + k; i++) {
                auto it = counts.find(i);
                if (it == counts.end() || it->second < need)
                    return false;
                it->second -= need;
            }
        }
        return true;
    }
};
