class Solution {
  public:
    vector<int> frequencySort(vector<int> &nums) {
        // Count each value's frequency, then sort a copy by a composite
        // key: frequency ascending, value descending on ties.
        unordered_map<int, int> freq;
        for (int value : nums)
            freq[value]++;

        vector<int> result = nums;
        sort(result.begin(), result.end(), [&](int a, int b) {
            if (freq[a] != freq[b])
                return freq[a] < freq[b];
            return a > b;
        });
        return result;
    }
};
