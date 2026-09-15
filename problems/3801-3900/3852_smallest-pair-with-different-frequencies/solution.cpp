class Solution {
  public:
    vector<int> minDistinctFreqPair(vector<int> &nums) {
        // Values and frequencies are at most 100, so int arithmetic
        // carries everything without overflow.
        unordered_map<int, int> freq;
        for (int x : nums) {
            freq[x]++;
        }
        vector<int> values;
        for (auto &[value, count] : freq) {
            values.push_back(value);
        }
        sort(values.begin(), values.end());
        // If any valid pair exists, its x is always the smallest distinct
        // value: if every larger value shared freq[x], all of nums would
        // share one frequency and no pair could differ. So one scan past
        // values[0] finds the smallest qualifying y.
        int x = values[0];
        for (int y : values) {
            if (y > x && freq[y] != freq[x]) {
                return {x, y};
            }
        }
        return {-1, -1};
    }
};
