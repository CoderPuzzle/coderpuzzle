class Solution {
  public:
    vector<int> minDifference(int n, int k) {
        // Trial division up to sqrt(n) gathers each divisor pair (d, n / d);
        // sorted ascending, they are the only values a decomposition can use.
        vector<int> divs;
        for (long long d = 1; d * d <= n; d++) {
            if (n % d == 0) {
                divs.push_back(d);
                if (d * d != n) {
                    divs.push_back(n / d);
                }
            }
        }
        sort(divs.begin(), divs.end());

        // Building factors in nondecreasing order makes the search visit
        // complete splits in lexicographic order, so replacing the best only
        // on a strictly smaller spread pins the lexicographically smallest
        // optimal split.
        vector<int> best;
        vector<int> path;
        dfs(divs, best, path, n, k, 0, 1);
        return best;
    }

  private:
    void dfs(const vector<int> &divs, vector<int> &best, vector<int> &path, int n, int slots, int start,
             long long prod) const {
        if (slots == 1) {
            // The last factor is forced to carry the product up to n; it
            // completes a nondecreasing split exactly when it reaches the
            // last pick. Both ends of the spread then sit on the path.
            int last = static_cast<int>(n / prod);
            if (prod * last == n && (path.empty() || last >= path.back())) {
                if (best.empty() || last - path.front() < best.back() - best.front()) {
                    best = path;
                    best.push_back(last);
                }
            }
            return;
        }
        for (int i = start; i < (int)divs.size(); i++) {
            if ((long long)divs[i] * prod > n) {
                break;
            }
            path.push_back(divs[i]);
            dfs(divs, best, path, n, slots - 1, i, prod * divs[i]);
            path.pop_back();
        }
    }
};
