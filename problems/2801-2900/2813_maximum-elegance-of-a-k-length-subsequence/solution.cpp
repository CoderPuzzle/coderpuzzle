class Solution {
  public:
    long long findMaximumElegance(vector<vector<int>> &items, int k) {
        vector<vector<int>> sorted(items);
        // sort descending lexicographically (profit, then category)
        sort(sorted.begin(), sorted.end(), [](const vector<int> &a, const vector<int> &b) {
            if (a[0] != b[0])
                return a[0] > b[0];
            return a[1] > b[1];
        });
        long long total = 0;
        unordered_map<int, int> counts;
        for (int i = 0; i < k; i++) {
            total += sorted[i][0];
            counts[sorted[i][1]]++;
        }
        long long distinct = counts.size();
        long long ans = total + distinct * distinct;

        // min-heap of (profit, category) for duplicated categories among top-k;
        // the heap is never pushed to after construction, so a sorted list with
        // a moving pointer reproduces the pop order exactly.
        vector<pair<int, int>> heap;
        for (int i = 0; i < k; i++) {
            if (counts[sorted[i][1]] > 1) {
                heap.push_back({sorted[i][0], sorted[i][1]});
            }
        }
        sort(heap.begin(), heap.end());
        size_t h = 0;

        for (size_t i = k; i < sorted.size(); i++) {
            int p = sorted[i][0], c = sorted[i][1];
            if (counts.count(c)) {
                continue;
            }
            while (h < heap.size() && counts[heap[h].second] <= 1) {
                h++;
            }
            if (h >= heap.size()) {
                break;
            }
            int minP = heap[h].first, minC = heap[h].second;
            h++;
            total = total - minP + p;
            counts[minC] -= 1;
            counts[c] = 1;
            distinct += 1;
            ans = max(ans, total + distinct * distinct);
        }
        return ans;
    }
};
