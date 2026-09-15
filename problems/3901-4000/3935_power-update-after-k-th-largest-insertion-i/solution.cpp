#include <algorithm>
#include <vector>

using namespace std;

class Solution {
  public:
    vector<int> powerUpdate(vector<int> &nums, int p, vector<vector<int>> &queries) {
        vector<int> values = nums;
        for (auto &query : queries)
            values.push_back(query[0]);
        sort(values.begin(), values.end());
        values.erase(unique(values.begin(), values.end()), values.end());
        vector<int> tree(values.size() + 1);
        auto add = [&](int index) {
            for (++index; index < static_cast<int>(tree.size()); index += index & -index)
                ++tree[index];
        };
        for (int value : nums)
            add(lower_bound(values.begin(), values.end(), value) - values.begin());
        vector<int> answer;
        int size = nums.size();
        for (auto &query : queries) {
            add(lower_bound(values.begin(), values.end(), query[0]) - values.begin());
            ++size;
            int rank = size - query[1] + 1;
            int index = 0;
            for (int step = 1 << (31 - __builtin_clz(values.size())); step; step >>= 1) {
                int next = index + step;
                if (next < static_cast<int>(tree.size()) && tree[next] < rank) {
                    index = next;
                    rank -= tree[next];
                }
            }
            p = modPow(p, values[index]);
            answer.push_back(p);
        }
        return answer;
    }

  private:
    int modPow(long long base, int exponent) {
        const long long mod = 1000000007;
        long long result = 1;
        while (exponent > 0) {
            if (exponent & 1)
                result = result * base % mod;
            base = base * base % mod;
            exponent >>= 1;
        }
        return result;
    }
};
