class Solution {
  public:
    vector<int> majorityElement(vector<int> &nums) {
        // Extended Boyer-Moore voting: two candidate slots, two counters. A
        // match raises its slot's counter, a zero counter adopts the current
        // value, and a value matching neither slot spends both counters.
        int candidate1 = 0, count1 = 0;
        int candidate2 = 0, count2 = 0;
        for (int value : nums) {
            if (value == candidate1) {
                ++count1;
            } else if (value == candidate2) {
                ++count2;
            } else if (count1 == 0) {
                candidate1 = value;
                count1 = 1;
            } else if (count2 == 0) {
                candidate2 = value;
                count2 = 1;
            } else {
                --count1;
                --count2;
            }
        }
        // The vote only nominates; a verification pass counts each nominee's
        // real occurrences and keeps only those above the floor(n/3) bar.
        int threshold = (int)nums.size() / 3;
        int total1 = 0, total2 = 0;
        for (int value : nums) {
            if (value == candidate1) {
                ++total1;
            } else if (value == candidate2) {
                ++total2;
            }
        }
        vector<int> result;
        if (total1 > threshold)
            result.push_back(candidate1);
        if (candidate2 != candidate1 && total2 > threshold)
            result.push_back(candidate2);
        // At most two answers survive; sorting pins the ascending order the
        // examples show.
        sort(result.begin(), result.end());
        return result;
    }
};
