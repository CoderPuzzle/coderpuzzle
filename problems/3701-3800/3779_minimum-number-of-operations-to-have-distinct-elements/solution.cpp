#include <unordered_map>
#include <vector>

class Solution {
  public:
    int minOperations(vector<int> &nums) {
        // Pointer + counts: counts tracks the remaining suffix, duplicated
        // how many distinct values it still holds twice or more. While the
        // suffix has a duplicate, one operation advances the pointer by
        // three and refreshes only those three values (the last, possibly
        // shorter, operation removes whatever is left).
        unordered_map<int, int> counts;
        for (int v : nums) {
            counts[v]++;
        }
        int duplicated = 0;
        for (const auto &[value, count] : counts) {
            if (count >= 2) {
                duplicated++;
            }
        }
        int i = 0;
        int ops = 0;
        int n = (int)nums.size();
        while (i < n && duplicated > 0) {
            for (int j = i; j < min(i + 3, n); j++) {
                if (--counts[nums[j]] == 1) {
                    duplicated--;
                }
            }
            i += 3;
            ops++;
        }
        return ops;
    }
};
