#include <algorithm>
#include <vector>

class Solution {
  public:
    std::vector<int> vals;
    std::vector<int> leftChild;
    std::vector<int> rightChild;
    std::vector<int> nodeCount;
    std::vector<long long> nodeSum;
    int used = 1;

    // Copies one node of the previous version: the count climbs by one and
    // the node's value sum by the inserted quotient.
    int newNode(int prev, int value) {
        int node = used++;
        leftChild[node] = leftChild[prev];
        rightChild[node] = rightChild[prev];
        nodeCount[node] = nodeCount[prev] + 1;
        nodeSum[node] = nodeSum[prev] + value;
        return node;
    }

    // Path-copies one root-to-leaf route for the new version.
    int insert(int prev, int lo, int hi, int pos, int value) {
        int node = newNode(prev, value);
        if (lo < hi) {
            int mid = (lo + hi) >> 1;
            if (pos <= mid) {
                leftChild[node] = insert(leftChild[prev], lo, mid, pos, value);
            } else {
                rightChild[node] = insert(rightChild[prev], mid + 1, hi, pos, value);
            }
        }
        return node;
    }

    std::vector<long long> minOperations(std::vector<int> &nums, int k, std::vector<std::vector<int>> &queries) {
        int n = nums.size();
        // Remainder runs: a window is equalizable iff it sits inside one
        // maximal run of equal remainders, i.e. iff l and r share a mark.
        std::vector<int> run(n, 0);
        for (int i = 1; i < n; i++) {
            run[i] = run[i - 1] + (nums[i] % k != nums[i - 1] % k ? 1 : 0);
        }
        std::vector<int> quotients(n);
        for (int i = 0; i < n; i++) {
            quotients[i] = nums[i] / k;
        }
        // Persistent segment tree over the compressed quotients: version i
        // counts the occurrences among nums[0..i-1], so the window [l, r]
        // is version r + 1 minus version l. Node 0 is the empty version.
        vals = quotients;
        std::sort(vals.begin(), vals.end());
        vals.erase(std::unique(vals.begin(), vals.end()), vals.end());
        int m = vals.size();
        leftChild.assign(20 * n + 10, 0);
        rightChild.assign(20 * n + 10, 0);
        nodeCount.assign(20 * n + 10, 0);
        nodeSum.assign(20 * n + 10, 0);
        used = 1;
        std::vector<int> roots(n + 1, 0);
        for (int i = 0; i < n; i++) {
            int pos = std::lower_bound(vals.begin(), vals.end(), quotients[i]) - vals.begin();
            roots[i + 1] = insert(roots[i], 0, m - 1, pos, quotients[i]);
        }
        std::vector<long long> result(queries.size());
        for (size_t qi = 0; qi < queries.size(); qi++) {
            int l = queries[qi][0], r = queries[qi][1];
            if (run[l] != run[r]) {
                result[qi] = -1;
                continue;
            }
            int a = roots[l], b = roots[r + 1];
            long long windowSum = nodeSum[b] - nodeSum[a];
            long long size = r - l + 1LL;
            long long need = (size + 1) / 2;
            long long belowCount = 0, belowSum = 0;
            int lo = 0, hi = m - 1;
            while (lo < hi) {
                int mid = (lo + hi) >> 1;
                int leftCount = nodeCount[leftChild[b]] - nodeCount[leftChild[a]];
                if (need <= leftCount) {
                    a = leftChild[a];
                    b = leftChild[b];
                    hi = mid;
                } else {
                    need -= leftCount;
                    belowCount += leftCount;
                    belowSum += nodeSum[leftChild[b]] - nodeSum[leftChild[a]];
                    a = rightChild[a];
                    b = rightChild[b];
                    lo = mid + 1;
                }
            }
            long long median = vals[lo];
            // Below-median elements climb by their shortfall; elements at or
            // above descend by their excess; equals contribute nothing.
            result[qi] = median * belowCount - belowSum + (windowSum - belowSum - median * (size - belowCount));
        }
        return result;
    }
};
