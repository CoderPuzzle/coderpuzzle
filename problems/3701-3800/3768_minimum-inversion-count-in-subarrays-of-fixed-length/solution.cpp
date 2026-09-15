#include <algorithm>
#include <unordered_map>
#include <vector>

class Solution {
  public:
    long long minInversionCount(std::vector<int> &nums, int k) {
        // Two neighboring windows share k - 1 elements, so the inversion
        // count updates in O(log n) per slide instead of a recount: the
        // element leaving at the front loses its pairs with smaller
        // survivors, the element entering at the back gains pairs with
        // larger survivors. Both are dynamic rank queries over the window's
        // values, so keep the window's elements counted in a Fenwick tree
        // indexed by compressed value.
        //
        // Order matters on every slide: drop the front element from the tree
        // and subtract how many smaller elements it was paired with BEFORE
        // the new element joins, then insert the newcomer and add how many
        // strictly larger elements remain — querying against the wrong
        // intermediate window double-counts when the two values are equal.
        // Strict comparisons throughout: equal neighbors are not inversions.
        std::vector<int> vals(nums);
        std::sort(vals.begin(), vals.end());
        vals.erase(std::unique(vals.begin(), vals.end()), vals.end());
        std::unordered_map<int, int> rank;
        rank.reserve(vals.size() * 2);
        for (int i = 0; i < static_cast<int>(vals.size()); ++i) {
            rank[vals[i]] = i + 1;
        }
        const int m = static_cast<int>(vals.size());
        std::vector<int> tree(m + 1, 0);
        auto update = [&](int index, int delta) {
            for (; index <= m; index += index & -index) {
                tree[index] += delta;
            }
        };
        auto query = [&](int index) {
            int total = 0;
            for (; index > 0; index &= index - 1) {
                total += tree[index];
            }
            return total;
        };

        // Build the first window; size - prefix(rank) counts elements already
        // inside that are strictly greater than the one being added.
        long long inversions = 0;
        int size = 0;
        for (int i = 0; i < k; ++i) {
            const int rx = rank[nums[i]];
            inversions += size - query(rx);
            update(rx, 1);
            ++size;
        }
        long long best = inversions;
        for (int right = k; right < static_cast<int>(nums.size()); ++right) {
            const int ry = rank[nums[right - k]];
            const int rx = rank[nums[right]];
            inversions -= query(ry - 1);
            update(ry, -1);
            inversions += (k - 1) - query(rx);
            update(rx, 1);
            best = std::min(best, inversions);
        }
        return best;
    }
};
