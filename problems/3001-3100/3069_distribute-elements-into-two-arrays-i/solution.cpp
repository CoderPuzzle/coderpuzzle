class Solution {
  public:
    vector<int> resultArray(vector<int> &nums) {
        // Literal simulation: seed arr1 with nums[0] and arr2 with nums[1],
        // then route each later element to whichever tail is greater.
        // Distinct values mean the tails never tie, so this is decisive.
        vector<int> arr1{nums[0]};
        vector<int> arr2{nums[1]};
        for (int i = 2; i < (int)nums.size(); ++i) {
            if (arr1.back() > arr2.back())
                arr1.push_back(nums[i]);
            else
                arr2.push_back(nums[i]);
        }
        arr1.insert(arr1.end(), arr2.begin(), arr2.end());
        return arr1;
    }
};
