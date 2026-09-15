class Solution {
  public:
    int maxDistance(vector<int> &position, int m) {
        sort(position.begin(), position.end());

        // Feasibility is monotone in the spacing, so binary search the
        // largest feasible d over [1, span]; the upper-mid form keeps the
        // search moving when lo and hi become adjacent.
        int lo = 1;
        int hi = position.back() - position.front();
        while (lo < hi) {
            int mid = lo + (hi - lo + 1) / 2;
            if (feasible(position, m, mid)) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return lo;
    }

  private:
    bool feasible(vector<int> &position, int m, int distance) {
        // Greedy: the first ball sits at the leftmost basket (count = 1),
        // then each ball takes the first basket at least `distance` beyond
        // the last placed one. Earliest-possible placement is never worse,
        // so failure here means no placement works.
        int count = 1;
        int last = position[0];
        for (int i = 1; i < (int)position.size(); i++) {
            if (position[i] - last >= distance) {
                count++;
                last = position[i];
                if (count >= m) {
                    // All balls placed — exit early.
                    return true;
                }
            }
        }
        return count >= m;
    }
};
