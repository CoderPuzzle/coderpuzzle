class Solution {
  public:
    bool makesquare(vector<int> &matchsticks) {
        long long total = 0;
        for (int v : matchsticks)
            total += v;
        // A square is 4 equal-length groups: the total must split evenly
        // and no single stick may exceed the side.
        if (total % 4 != 0)
            return false;
        long long side = total / 4;
        // Descending order places the most constrained sticks first, so a
        // dead end appears after only a few branches.
        vector<long long> sticks(matchsticks.begin(), matchsticks.end());
        sort(sticks.rbegin(), sticks.rend());
        if (sticks.empty() || sticks[0] > side)
            return false;
        vector<long long> sides(4, 0);
        return dfs(sticks, sides, side, 0);
    }

  private:
    bool dfs(vector<long long> &sticks, vector<long long> &sides, long long side, int i) {
        // Guaranteed by the capacity checks + total = 4 * side; kept as a
        // final safety assertion.
        if (i == (int)sticks.size()) {
            return sides[0] == side && sides[1] == side && sides[2] == side && sides[3] == side;
        }
        long long value = sticks[i];
        long long tried[4];
        int triedCount = 0;
        for (int j = 0; j < 4; j++) {
            // Sides with equal current length are interchangeable — trying
            // one per distinct length skips symmetric states.
            bool dup = false;
            for (int t = 0; t < triedCount; t++) {
                if (tried[t] == sides[j]) {
                    dup = true;
                    break;
                }
            }
            if (dup)
                continue;
            tried[triedCount++] = sides[j];
            // Place/recurse/undo on every side with room left.
            if (sides[j] + value <= side) {
                sides[j] += value;
                if (dfs(sticks, sides, side, i + 1))
                    return true;
                sides[j] -= value;
            }
        }
        return false;
    }
};
