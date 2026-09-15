class Solution {
  public:
    vector<int> sortArrayByParity(vector<int> &nums) {
        // The judge pins one exact answer: the even values in the order they
        // appear, then the odd values in the order they appear. One scan
        // routes each value into its group as it is read — a value's arrival
        // order inside its group is its input order, so the concatenation of
        // the two groups is the answer, with no value compared by magnitude.
        vector<int> evens;
        vector<int> odds;
        for (int value : nums) {
            if (value % 2 == 0) {
                evens.push_back(value);
            } else {
                odds.push_back(value);
            }
        }
        evens.insert(evens.end(), odds.begin(), odds.end());
        return evens;
    }
};
