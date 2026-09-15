class Solution {
  public:
    vector<int> findLonely(vector<int> &nums) {
        // A lonely value appears exactly once and has neither neighbour
        // x - 1 nor x + 1 present; scanning nums in order keeps the
        // output in first-occurrence order.
        unordered_map<int, int> count;
        for (int x : nums) {
            count[x]++;
        }
        vector<int> lonely;
        for (int x : nums) {
            if (count[x] == 1 && !count.count(x - 1) && !count.count(x + 1)) {
                lonely.push_back(x);
            }
        }
        return lonely;
    }
};
