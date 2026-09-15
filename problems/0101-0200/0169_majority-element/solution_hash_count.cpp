class Solution {
  public:
    int majorityElement(vector<int> &nums) {
        // The premise taken literally: the answer turns up more than n / 2
        // times, so tally every value and stop at the first tally that
        // crosses half the array.
        unordered_map<int, int> counts;
        int half = (int)nums.size() / 2;
        for (int num : nums) {
            // ++ both records and reports the tally after adding one.
            if (++counts[num] > half) {
                // No value can be overtaken once a tally passes half: two
                // values cannot both hold more than half the positions.
                return num;
            }
        }
        // A majority is promised, so the sweep always returns mid-loop.
        throw logic_error("unreachable: a majority is promised");
    }
};
