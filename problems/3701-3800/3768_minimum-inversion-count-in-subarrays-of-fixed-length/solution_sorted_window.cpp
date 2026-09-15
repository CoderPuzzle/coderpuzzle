#include <algorithm>
#include <vector>

class Solution {
  public:
    long long minInversionCount(std::vector<int> &nums, int k) {
        // Keep the current window as a sorted vector. A sorted vector makes
        // the slide's two rank questions direct binary searches: the
        // position an element occupies IS the number of elements smaller
        // than it, and the gap it is dropped into counts the elements
        // greater than it. The running inversion count moves by the same
        // two terms the Fenwick tree tracks, but each term is read off one
        // bisection — no tree, no compression, and the window itself stays
        // materialized. The trade is the O(k) element shift per insert and
        // erase; with k up to n that is quadratic in the worst case but so
        // cache-friendly that mid-size windows stay fast.
        //
        // Equal values need care at both ends: removing uses lower_bound so
        // exactly one copy leaves, inserting uses upper_bound so the
        // newcomer lands after its equals and only pairs with strictly
        // larger survivors.
        std::vector<int> window;
        window.reserve(k);
        long long inversions = 0;
        for (int i = 0; i < k; ++i) {
            const auto pos = std::upper_bound(window.begin(), window.end(), nums[i]);
            inversions += window.end() - pos;
            window.insert(pos, nums[i]);
        }
        long long best = inversions;
        for (int right = k; right < static_cast<int>(nums.size()); ++right) {
            const auto out = std::lower_bound(window.begin(), window.end(), nums[right - k]);
            inversions -= out - window.begin();
            window.erase(out);
            const auto pos = std::upper_bound(window.begin(), window.end(), nums[right]);
            inversions += window.end() - pos;
            window.insert(pos, nums[right]);
            best = std::min(best, inversions);
        }
        return best;
    }
};
