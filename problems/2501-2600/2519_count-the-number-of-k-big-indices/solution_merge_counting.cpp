#include <vector>

namespace {
// Merge-sorts order[lo:hi) by value while filling both tallies: placing a
// left-half element credits every right-half element already placed below
// it, and placing a right-half element reads its strictly smaller
// left-half predecessors off the sorted run.
void mergeCount(const std::vector<int> &nums, std::vector<int> &order, std::vector<int> &leftCounts,
                std::vector<int> &rightCounts, int lo, int hi) {
    if (hi - lo < 2)
        return;
    int mid = (lo + hi) / 2;
    mergeCount(nums, order, leftCounts, rightCounts, lo, mid);
    mergeCount(nums, order, leftCounts, rightCounts, mid, hi);
    std::vector<int> left(order.begin() + lo, order.begin() + mid);
    int i = 0, j = mid, w = lo, s = 0;
    while (i < (int)left.size() && j < hi) {
        if (nums[left[i]] <= nums[order[j]]) { // equal: the left element places first, uncounted
            rightCounts[left[i]] += j - mid;   // right-half values already placed below it
            order[w] = left[i];
            ++i;
        } else {
            while (s < (int)left.size() && nums[left[s]] < nums[order[j]])
                ++s;
            leftCounts[order[j]] += s; // left-half values strictly below it
            order[w] = order[j];
            ++j;
        }
        ++w;
    }
    while (i < (int)left.size()) {
        rightCounts[left[i]] += j - mid; // the whole right half sits below it
        order[w] = left[i];
        ++i;
        ++w;
    }
    while (j < hi) {
        while (s < (int)left.size() && nums[left[s]] < nums[order[j]])
            ++s;
        leftCounts[order[j]] += s;
        order[w] = order[j];
        ++j;
        ++w;
    }
}
} // namespace

class Solution {
  public:
    int kBigIndices(std::vector<int> &nums, int k) {
        // One merge sort over value/index pairs fills both tallies at once.
        // When a merge places a left-half element, every right-half element
        // already placed is strictly smaller than it; when it places a
        // right-half element, a crawl over the sorted left run counts its
        // strictly smaller predecessors. Each pair of positions is weighed
        // at exactly the one merge whose split separates it, so both counts
        // are complete when the sort ends; equal values place left-first and
        // are never credited. A position is k-big exactly when both counts
        // reach k.
        int n = (int)nums.size();
        std::vector<int> leftCounts(n, 0);
        std::vector<int> rightCounts(n, 0);
        std::vector<int> order(n); // merge-sort workspace of indexes, ordered by value
        for (int i = 0; i < n; ++i)
            order[i] = i;
        mergeCount(nums, order, leftCounts, rightCounts, 0, n);
        int big = 0;
        for (int i = 0; i < n; ++i)
            if (leftCounts[i] >= k && rightCounts[i] >= k)
                ++big;
        return big;
    }
};
