class Solution {
  public:
    bool canChoose(vector<vector<int>> &groups, vector<int> &nums) {
        // Each group must land in a disjoint, in-order window of nums, and
        // the earliest window always dominates: shifting a group onto its
        // first still-legal occurrence never causes an overlap and only
        // lengthens the suffix left for the groups behind it. So walk the
        // groups in order with a cursor pos into nums, take the first
        // start >= pos whose window compares equal element by element,
        // advance the cursor past it, and fail as soon as a group has no
        // window left.
        int pos = 0;
        for (const vector<int> &group : groups) {
            int size = group.size();
            int start = pos;
            bool found = false;
            while (start + size <= nums.size()) {
                int i = 0;
                while (i < size && nums[start + i] == group[i]) {
                    i += 1;
                }
                if (i == size) {
                    found = true;
                    break;
                }
                start += 1;
            }
            if (!found) {
                return false;
            }
            pos = start + size;
        }
        return true;
    }
};
