class Solution {
  public:
    int finalValueAfterOperations(vector<string> &operations) {
        int value = 0;
        for (const string &operation : operations)
            value += operation[1] == '+' ? 1 : -1;
        return value;
    }
};
