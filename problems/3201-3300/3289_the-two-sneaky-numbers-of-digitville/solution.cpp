class Solution {
  public:
    vector<int> getSneakyNumbers(vector<int> &nums) {
        // Values all lie in 0..n-1, so a counter array indexed by value finds
        // the two count-2 entries; the ascending walk emits them in order.
        int n = (int)nums.size() - 2;
        vector<int> count(n, 0);
        for (int x : nums) {
            count[x]++;
        }
        vector<int> sneaky;
        for (int v = 0; v < n; ++v) {
            if (count[v] == 2) {
                sneaky.push_back(v);
            }
        }
        return sneaky;
    }
};
