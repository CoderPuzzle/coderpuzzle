#include <algorithm>
#include <vector>

using namespace std;

class Solution {
    struct MaxTree {
        int size = 1;
        vector<long long> tree;

        MaxTree(int length) {
            while (size < length)
                size *= 2;
            tree.assign(2 * size, 0);
        }

        void update(int index, long long value) {
            index += size;
            tree[index] = max(tree[index], value);
            for (index /= 2; index > 0; index /= 2)
                tree[index] = max(tree[2 * index], tree[2 * index + 1]);
        }

        long long query(int left, int right) {
            left += size;
            right += size;
            long long best = 0;
            while (left < right) {
                if (left & 1)
                    best = max(best, tree[left++]);
                if (right & 1)
                    best = max(best, tree[--right]);
                left /= 2;
                right /= 2;
            }
            return best;
        }
    };

  public:
    long long maxAlternatingSum(vector<int> &nums, int k) {
        vector<int> values = nums;
        sort(values.begin(), values.end());
        values.erase(unique(values.begin(), values.end()), values.end());
        MaxTree upTree(values.size()), downTree(values.size());
        vector<long long> up(nums.size()), down(nums.size());
        long long answer = 0;

        for (int i = 0; i < (int)nums.size(); ++i) {
            if (i >= k) {
                int eligible = i - k;
                int rank = lower_bound(values.begin(), values.end(), nums[eligible]) - values.begin();
                upTree.update(rank, up[eligible]);
                downTree.update(rank, down[eligible]);
            }
            int rank = lower_bound(values.begin(), values.end(), nums[i]) - values.begin();
            up[i] = nums[i] + downTree.query(0, rank);
            down[i] = nums[i] + upTree.query(rank + 1, values.size());
            answer = max({answer, up[i], down[i]});
        }
        return answer;
    }
};
