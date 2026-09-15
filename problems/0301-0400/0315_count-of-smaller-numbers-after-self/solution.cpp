class Solution {
  public:
    vector<int> countSmaller(vector<int> &nums) {
        const int offset = 10002; // maps nums[i] in [-10^4, 10^4] to a positive index
        const int size = 20005;
        vector<int> bit(size + 1, 0);

        auto update = [&](int i, int delta) {
            while (i <= size) {
                bit[i] += delta;
                i += i & (-i);
            }
        };
        auto query = [&](int i) {
            int total = 0;
            while (i > 0) {
                total += bit[i];
                i -= i & (-i);
            }
            return total;
        };

        vector<int> result(nums.size());
        for (int k = (int)nums.size() - 1; k >= 0; k--) {
            int index = nums[k] + offset;
            result[k] = query(index - 1);
            update(index, 1);
        }
        return result;
    }
};
