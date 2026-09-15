#include <algorithm>
#include <unordered_map>
#include <vector>

class Solution {
    class SegmentTree {
        int size;
        int inf;
        std::vector<int> count;
        std::vector<int> minimum;

      public:
        explicit SegmentTree(int n) : size(1), inf(n + 1) {
            while (size < n + 1) {
                size *= 2;
            }
            count.assign(2 * size, 0);
            minimum.assign(2 * size, inf);
        }

        void update(int position, bool active, int mth = 0) {
            int node = size + position;
            count[node] = active ? 1 : 0;
            minimum[node] = active ? mth : inf;
            for (node /= 2; node > 0; node /= 2) {
                count[node] = count[2 * node] + count[2 * node + 1];
                minimum[node] = std::min(minimum[2 * node], minimum[2 * node + 1]);
            }
        }

        int total() const { return count[1]; }

        int kthLatest(int need) const {
            int node = 1;
            while (node < size) {
                int right = 2 * node + 1;
                if (count[right] >= need) {
                    node = right;
                } else {
                    need -= count[right];
                    node = right - 1;
                }
            }
            return node - size;
        }

        int rangeMinimum(int left, int right) const {
            left += size;
            right += size;
            int result = inf;
            while (left <= right) {
                if (left & 1) {
                    result = std::min(result, minimum[left++]);
                }
                if (!(right & 1)) {
                    result = std::min(result, minimum[right--]);
                }
                left /= 2;
                right /= 2;
            }
            return result;
        }
    };

  public:
    long long countSubarrays(std::vector<int> &nums, int k, int m) {
        int n = static_cast<int>(nums.size());
        SegmentTree tree(n);
        std::unordered_map<int, std::vector<int>> history;
        long long answer = 0;

        for (int right = 1; right <= n; ++right) {
            std::vector<int> &places = history[nums[right - 1]];
            if (!places.empty()) {
                tree.update(places.back(), false);
            }
            places.push_back(right);
            int mth = places.size() >= static_cast<size_t>(m) ? places[places.size() - m] : 0;
            tree.update(right, true, mth);

            if (tree.total() < k) {
                continue;
            }
            int lastK = tree.kthLatest(k);
            int lastNext = tree.total() > k ? tree.kthLatest(k + 1) : 0;
            int minMth = tree.rangeMinimum(lastK, n);
            answer += std::max(0, std::min(lastK, minMth) - lastNext);
        }
        return answer;
    }
};
