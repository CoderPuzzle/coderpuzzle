class Solution {
  public:
    // In sorted order a prefix relationship must surface between
    // neighbors: the shorter prefix sorts first, and anything landing
    // between them shares that prefix as well.
    bool phonePrefix(vector<string> &numbers) {
        sort(numbers.begin(), numbers.end());
        for (int i = 0; i + 1 < (int)numbers.size(); i++) {
            if (numbers[i + 1].compare(0, numbers[i].size(), numbers[i]) == 0) {
                return false;
            }
        }
        return true;
    }
};
