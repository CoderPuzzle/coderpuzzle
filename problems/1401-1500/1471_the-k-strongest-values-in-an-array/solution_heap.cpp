#include <algorithm>
#include <array>
#include <cstdlib>
#include <queue>
#include <vector>

class Solution {
  public:
    std::vector<int> getStrongest(std::vector<int> &arr, int k) {
        std::vector<int> sortedArr = arr;
        std::sort(sortedArr.begin(), sortedArr.end());
        int m = sortedArr[(arr.size() - 1) / 2];
        // Min-heap of {distance, value, index} whose root is the weakest
        // keeper: shortest distance, then smallest value, then latest
        // index — a later duplicate can never outrank an earlier one.
        // priority_queue surfaces its comp-greatest at the top, so the
        // comparator is the keeper ranking itself and the comp-greatest
        // is the outranked side.
        auto outranks = [](const std::array<int, 3> &a, const std::array<int, 3> &b) {
            if (a[0] != b[0])
                return a[0] > b[0];
            if (a[1] != b[1])
                return a[1] > b[1];
            return a[2] < b[2];
        };
        std::priority_queue<std::array<int, 3>, std::vector<std::array<int, 3>>, decltype(outranks)> heap(outranks);
        for (int i = 0; i < (int)arr.size(); i++) {
            std::array<int, 3> entry = {std::abs(arr[i] - m), arr[i], i};
            if ((int)heap.size() < k) {
                heap.push(entry);
                continue;
            }
            const std::array<int, 3> &root = heap.top();
            // Replace the root only when the newcomer is strictly mightier:
            // longer distance, or larger value on a distance tie (an exact
            // duplicate never displaces an earlier index).
            if (entry[0] > root[0] || (entry[0] == root[0] && entry[1] > root[1]) ||
                (entry[0] == root[0] && entry[1] == root[1] && entry[2] < root[2])) {
                heap.pop();
                heap.push(entry);
            }
        }
        std::vector<std::array<int, 3>> survivors;
        survivors.reserve(k);
        while (!heap.empty()) {
            survivors.push_back(heap.top());
            heap.pop();
        }
        // The heap holds the top k; emit them by original index.
        std::sort(survivors.begin(), survivors.end(),
                  [](const std::array<int, 3> &a, const std::array<int, 3> &b) { return a[2] < b[2]; });
        std::vector<int> result;
        result.reserve(k);
        for (const auto &entry : survivors) {
            result.push_back(entry[1]);
        }
        return result;
    }
};
