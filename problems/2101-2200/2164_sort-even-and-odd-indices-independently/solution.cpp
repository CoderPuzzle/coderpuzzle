class Solution {
  public:
    vector<int> sortEvenOdd(vector<int> &nums) {
        // Strides 2 and 1-from-2 split the array by index parity; sorting
        // each slice its own direction and writing back through the same
        // strides re-interleaves them without touching positions.
        vector<int> evens, odds;
        for (int index = 0; index < (int)nums.size(); ++index) {
            if (index % 2 == 0)
                evens.push_back(nums[index]);
            else
                odds.push_back(nums[index]);
        }
        sort(evens.begin(), evens.end());
        sort(odds.begin(), odds.end(), greater<int>());
        vector<int> result = nums;
        for (int index = 0; index < (int)evens.size(); ++index)
            result[2 * index] = evens[index];
        for (int index = 0; index < (int)odds.size(); ++index)
            result[2 * index + 1] = odds[index];
        return result;
    }
};
