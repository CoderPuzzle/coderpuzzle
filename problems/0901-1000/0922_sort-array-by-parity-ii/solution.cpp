class Solution {
  public:
    vector<int> sortArrayByParityII(vector<int> &nums) {
        // The judge pins one exact answer: the even values sorted ascending
        // fill the even indices, and the odd values sorted ascending fill the
        // odd indices. One scan splits the values by parity, one sort orders
        // each group, and a dealing loop writes them into the answer — values
        // are compared only inside their own parity group.
        vector<int> evens;
        vector<int> odds;
        for (int value : nums) {
            if (value % 2 == 0) {
                evens.push_back(value);
            } else {
                odds.push_back(value);
            }
        }
        sort(evens.begin(), evens.end());
        sort(odds.begin(), odds.end());
        vector<int> answer(nums.size());
        for (size_t i = 0; i < evens.size(); ++i) {
            answer[2 * i] = evens[i];
            answer[2 * i + 1] = odds[i];
        }
        return answer;
    }
};
