class Solution {
  public:
    int subarraysWithMoreOnesThanZeroes(vector<int> &nums) {
        const long long mod = 1000000007LL;
        int size = 2 * static_cast<int>(nums.size()) + 3;
        int offset = static_cast<int>(nums.size()) + 1;
        vector<int> bit(size);

        add(bit, offset);
        int prefix = 0;
        long long answer = 0;
        for (int value : nums) {
            prefix += value == 1 ? 1 : -1;
            int index = prefix + offset;
            answer = (answer + query(bit, index - 1)) % mod;
            add(bit, index);
        }
        return static_cast<int>(answer);
    }

  private:
    void add(vector<int> &bit, int index) {
        while (index < static_cast<int>(bit.size())) {
            ++bit[index];
            index += index & -index;
        }
    }

    int query(const vector<int> &bit, int index) {
        int total = 0;
        while (index > 0) {
            total += bit[index];
            index -= index & -index;
        }
        return total;
    }
};
