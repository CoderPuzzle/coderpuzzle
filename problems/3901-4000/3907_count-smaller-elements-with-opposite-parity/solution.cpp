class Solution {
  public:
    vector<int> countSmallerOppositeParity(vector<int> &nums) {
        vector<int> values = nums;
        sort(values.begin(), values.end());
        values.erase(unique(values.begin(), values.end()), values.end());
        vector<vector<int>> trees(2, vector<int>(values.size() + 1));
        vector<int> answer(nums.size());

        for (int i = (int)nums.size() - 1; i >= 0; --i) {
            int rank = lower_bound(values.begin(), values.end(), nums[i]) - values.begin() + 1;
            int parity = nums[i] & 1;
            answer[i] = query(trees[parity ^ 1], rank - 1);
            update(trees[parity], rank);
        }
        return answer;
    }

  private:
    int query(const vector<int> &tree, int index) {
        int total = 0;
        while (index > 0) {
            total += tree[index];
            index -= index & -index;
        }
        return total;
    }

    void update(vector<int> &tree, int index) {
        while (index < (int)tree.size()) {
            ++tree[index];
            index += index & -index;
        }
    }
};
