#include <algorithm>
#include <unordered_map>
#include <utility>
#include <vector>

class MajorityChecker {
  public:
    MajorityChecker(std::vector<int> arr) : n((int)arr.size()), candidateOf(4 * n, 0), surplusOf(4 * n, 0) {
        build(1, 0, n - 1, arr);
        for (int i = 0; i < n; i++) {
            positions[arr[i]].push_back(i);
        }
    }

    int query(int left, int right, int threshold) {
        int candidate = fold(1, 0, n - 1, left, right).first;
        auto found = positions.find(candidate);
        if (found == positions.end()) {
            return -1;
        }
        const std::vector<int> &occurrences = found->second;
        int count = (int)(lowerBound(occurrences, right + 1) - lowerBound(occurrences, left));
        return count >= threshold ? candidate : -1;
    }

  private:
    int n;
    std::vector<int> candidateOf;
    std::vector<int> surplusOf;
    std::unordered_map<int, std::vector<int>> positions;

    void build(int node, int lo, int hi, const std::vector<int> &arr) {
        if (lo == hi) {
            candidateOf[node] = arr[lo];
            surplusOf[node] = 1;
            return;
        }
        int mid = lo + (hi - lo) / 2;
        build(2 * node, lo, mid, arr);
        build(2 * node + 1, mid + 1, hi, arr);
        std::pair<int, int> merged =
            merge({candidateOf[2 * node], surplusOf[2 * node]}, {candidateOf[2 * node + 1], surplusOf[2 * node + 1]});
        candidateOf[node] = merged.first;
        surplusOf[node] = merged.second;
    }

    static std::pair<int, int> merge(std::pair<int, int> left, std::pair<int, int> right) {
        if (left.first == right.first) {
            return {left.first, left.second + right.second};
        }
        if (left.second > right.second) {
            return {left.first, left.second - right.second};
        }
        if (right.second > left.second) {
            return {right.first, right.second - left.second};
        }
        return {0, 0};
    }

    std::pair<int, int> fold(int node, int lo, int hi, int left, int right) {
        if (left <= lo && hi <= right) {
            return {candidateOf[node], surplusOf[node]};
        }
        int mid = lo + (hi - lo) / 2;
        if (right <= mid) {
            return fold(2 * node, lo, mid, left, right);
        }
        if (left > mid) {
            return fold(2 * node + 1, mid + 1, hi, left, right);
        }
        return merge(fold(2 * node, lo, mid, left, right), fold(2 * node + 1, mid + 1, hi, left, right));
    }

    static int lowerBound(const std::vector<int> &values, int target) {
        return (int)(std::lower_bound(values.begin(), values.end(), target) - values.begin());
    }
};
