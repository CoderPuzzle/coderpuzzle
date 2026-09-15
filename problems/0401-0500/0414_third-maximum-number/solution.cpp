class Solution {
  public:
    int thirdMax(vector<int> &nums) {
        // optional slots: nullopt marks "not yet filled", so INT_MIN itself
        // is a legal value and no sentinel constant is needed.
        optional<int> first;
        optional<int> second;
        optional<int> third;
        for (int value : nums) {
            // A repeat of an already-tracked value changes nothing.
            if (first == value || second == value || third == value)
                continue;
            if (!first || value > *first) {
                third = second;
                second = first;
                first = value;
            } else if (!second || value > *second) {
                third = second;
                second = value;
            } else if (!third || value > *third) {
                third = value;
            }
        }
        // No third distinct maximum: fall back to the maximum.
        return third.value_or(*first);
    }
};
