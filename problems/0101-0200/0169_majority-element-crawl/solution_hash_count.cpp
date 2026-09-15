class Solution {
  public:
    int majorityElement(vector<int> &nums) {
        // The guarantee taken at face value: the answer is the one value
        // whose tally passes n / 2, so count occurrences per distinct value
        // and report the first tally to cross that line.
        unordered_map<int, int> counts;
        int half = (int)nums.size() / 2;
        for (int value : nums) {
            // operator[] default-constructs at zero, so ++ both records and
            // reports the tally after adding one.
            if (++counts[value] > half) {
                // No rival can catch a tally already past half: two values
                // cannot both own more than half the positions.
                return value;
            }
        }
        // A majority is promised, so the sweep always returns mid-loop.
        throw logic_error("unreachable: a majority is promised");
    }
};
