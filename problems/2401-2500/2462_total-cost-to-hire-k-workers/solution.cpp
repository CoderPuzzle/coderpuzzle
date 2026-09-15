class Solution {
  public:
    long long totalCost(vector<int> &costs, int k, int candidates) {
        int n = costs.size();
        typedef pair<int, int> P;
        // Windows overlap => every remaining worker is always eligible,
        // so the greedy is just "hire the k cheapest overall".
        if (2 * candidates >= n) {
            vector<int> sorted(costs);
            sort(sorted.begin(), sorted.end());
            long long total = 0;
            for (int i = 0; i < k; i++)
                total += sorted[i];
            return total;
        }
        // Heaps hold (cost, index): pair order breaks cost ties by the
        // smaller index automatically. left = front window, right = back.
        priority_queue<P, vector<P>, greater<P>> left, right;
        for (int i = 0; i < candidates; i++)
            left.push({costs[i], i});
        for (int i = n - candidates; i < n; i++)
            right.push({costs[i], i});
        // i feeds left and j feeds right from the untouched middle; i <= j
        // guards against inserting a middle worker twice.
        int i = candidates, j = n - candidates - 1;
        long long total = 0;
        for (int t = 0; t < k; t++) {
            // Cheaper top wins; '<=' prefers left on ties.
            if (right.empty() || (!left.empty() && left.top() <= right.top())) {
                P top = left.top();
                left.pop();
                total += top.first;
                if (i <= j) {
                    left.push({costs[i], i});
                    i++;
                }
            } else {
                P top = right.top();
                right.pop();
                total += top.first;
                if (i <= j) {
                    right.push({costs[j], j});
                    j--;
                }
            }
        }
        return total;
    }
};
