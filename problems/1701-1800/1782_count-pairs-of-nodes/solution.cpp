class Solution {
  public:
    vector<int> countPairs(int n, vector<vector<int>> &edges, vector<int> &queries) {
        // Degrees count every parallel edge separately, so for a pair (a, b)
        // the degree sum counts an edge shared by both endpoints twice:
        // incident(a, b) = deg[a] + deg[b] - mult(a, b).
        vector<int> deg(n + 1, 0);
        map<pair<int, int>, int> mult;
        for (auto &e : edges) {
            int u = e[0], v = e[1];
            deg[u]++;
            deg[v]++;
            if (u > v)
                swap(u, v);
            mult[{u, v}]++;
        }
        vector<int> d(deg.begin() + 1, deg.end());
        sort(d.begin(), d.end());
        // For each pair joined by at least one edge, s is the degree sum and
        // t the true incident count. A query k overcounts exactly the pairs
        // with t <= k < s, so the fix adds #{s <= k} - #{t <= k}.
        vector<int> sVals, tVals;
        sVals.reserve(mult.size());
        tVals.reserve(mult.size());
        for (auto &[pr, m] : mult) {
            int s = deg[pr.first] + deg[pr.second];
            sVals.push_back(s);
            tVals.push_back(s - m);
        }
        sort(sVals.begin(), sVals.end());
        sort(tVals.begin(), tVals.end());
        vector<int> answer;
        answer.reserve(queries.size());
        for (int k : queries) {
            // Two pointers over the sorted degrees count every unordered
            // pair whose degree sum is strictly above k.
            int lo = 0, hi = n - 1, total = 0;
            while (lo < hi) {
                if (d[lo] + d[hi] > k) {
                    total += hi - lo;
                    hi--;
                } else {
                    lo++;
                }
            }
            total += (upper_bound(sVals.begin(), sVals.end(), k) - sVals.begin()) -
                     (upper_bound(tVals.begin(), tVals.end(), k) - tVals.begin());
            answer.push_back(total);
        }
        return answer;
    }
};
