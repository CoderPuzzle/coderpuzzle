#include <algorithm>
#include <vector>

class Solution {
  public:
    std::vector<int> quotients;
    std::vector<std::vector<int>> sortedNodes;
    std::vector<std::vector<long long>> prefixNodes;

    void build(int node, int lo, int hi) {
        if (lo == hi) {
            sortedNodes[node] = {quotients[lo]};
            prefixNodes[node] = {0, quotients[lo]};
            return;
        }
        int mid = (lo + hi) >> 1;
        build(2 * node, lo, mid);
        build(2 * node + 1, mid + 1, hi);
        const auto &left = sortedNodes[2 * node];
        const auto &right = sortedNodes[2 * node + 1];
        std::vector<int> merged(left.size() + right.size());
        std::merge(left.begin(), left.end(), right.begin(), right.end(), merged.begin());
        std::vector<long long> pref(merged.size() + 1, 0);
        for (size_t i = 0; i < merged.size(); i++) {
            pref[i + 1] = pref[i] + merged[i];
        }
        sortedNodes[node] = std::move(merged);
        prefixNodes[node] = std::move(pref);
    }

    // Count of values <= x across the decomposition and their total sum.
    std::pair<long long, long long> countLeSum(const std::vector<const std::vector<int> *> &pieces,
                                               const std::vector<const std::vector<long long> *> &prefixes,
                                               long long x) const {
        long long count = 0, total = 0;
        for (size_t p = 0; p < pieces.size(); p++) {
            const auto &vec = *pieces[p];
            const auto &pref = *prefixes[p];
            int low = 0, high = vec.size();
            while (low < high) {
                int mid = (low + high) >> 1;
                if ((long long)vec[mid] <= x) {
                    low = mid + 1;
                } else {
                    high = mid;
                }
            }
            count += low;
            total += pref[low];
        }
        return {count, total};
    }

    std::vector<long long> minOperations(std::vector<int> &nums, int k, std::vector<std::vector<int>> &queries) {
        int n = nums.size();
        // Remainder runs: a window is equalizable iff it sits inside one
        // maximal run of equal remainders, i.e. iff l and r share a mark.
        std::vector<int> run(n, 0);
        for (int i = 1; i < n; i++) {
            run[i] = run[i - 1] + (nums[i] % k != nums[i - 1] % k ? 1 : 0);
        }
        quotients.resize(n);
        for (int i = 0; i < n; i++) {
            quotients[i] = nums[i] / k;
        }
        // Merge sort tree over the quotients: each node keeps its values
        // sorted plus prefix sums of that order.
        sortedNodes.assign(4 * n, {});
        prefixNodes.assign(4 * n, {});
        build(1, 0, n - 1);
        std::vector<long long> result(queries.size());
        // Node stack carrying (node, lo, hi) flattened into triples.
        std::vector<std::array<int, 3>> stack;
        std::vector<const std::vector<int> *> pieceVals;
        std::vector<const std::vector<long long> *> piecePref;
        for (size_t qi = 0; qi < queries.size(); qi++) {
            int l = queries[qi][0], r = queries[qi][1];
            if (run[l] != run[r]) {
                result[qi] = -1;
                continue;
            }
            // Decompose the window into tree nodes; the set stays fixed
            // for the whole query.
            pieceVals.clear();
            piecePref.clear();
            stack.clear();
            stack.push_back({1, 0, n - 1});
            while (!stack.empty()) {
                auto [node, lo, hi] = stack.back();
                stack.pop_back();
                if (r < lo || hi < l) {
                    continue;
                }
                if (l <= lo && hi <= r) {
                    pieceVals.push_back(&sortedNodes[node]);
                    piecePref.push_back(&prefixNodes[node]);
                    continue;
                }
                int mid = (lo + hi) >> 1;
                stack.push_back({2 * node, lo, mid});
                stack.push_back({2 * node + 1, mid + 1, hi});
            }
            // Smallest quotient whose inclusive rank reaches the lower
            // median; the decomposition's node set is fixed throughout.
            long long need = ((long long)(r - l) + 2) / 2;
            long long lo = LLONG_MAX, hi = LLONG_MIN;
            for (const auto *vec : pieceVals) {
                lo = std::min(lo, (long long)(*vec)[0]);
                hi = std::max(hi, (long long)(*vec)[vec->size() - 1]);
            }
            while (lo < hi) {
                long long mid = lo + (hi - lo) / 2;
                if (countLeSum(pieceVals, piecePref, mid).first >= need) {
                    hi = mid;
                } else {
                    lo = mid + 1;
                }
            }
            long long median = lo;
            long long size = r - l + 1LL;
            auto at = countLeSum(pieceVals, piecePref, median);
            auto below = countLeSum(pieceVals, piecePref, median - 1);
            long long grandTotal = 0;
            for (const auto *pref : piecePref) {
                grandTotal += (*pref)[pref->size() - 1];
            }
            // Below-median elements climb by their shortfall; above-median
            // ones descend by their excess; equals cost nothing.
            result[qi] = median * below.first - below.second + ((grandTotal - at.second) - median * (size - at.first));
        }
        return result;
    }
};
