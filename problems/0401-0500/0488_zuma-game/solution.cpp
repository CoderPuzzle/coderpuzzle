class Solution {
  public:
    int findMinStep(string board, string hand) {
        // Memoized search over (row, remaining hand). Only balls inserted
        // directly alongside a same-colored run are tried: a ball dropped
        // between foreign colors cannot join a removal before its neighbors
        // merge, so deferring its insertion to that merge never costs more.
        array<int, 5> counts{};
        for (char ch : hand) {
            ++counts[kColors.find(ch)];
        }
        unordered_map<string, int> memo;
        int best = solve(board, counts, memo);
        return best < kImpossible ? best : -1;
    }

  private:
    inline static const string kColors = "RYBGW";
    static constexpr int kImpossible = 100; // above any answer: the hand holds at most 5 balls

    // The cascade as a pure function: one pass drops every maximal run of
    // three or more, the loop settles the joins that their removal opens up.
    static string clean(string row) {
        bool removed = true;
        while (removed) {
            removed = false;
            string kept;
            int i = 0;
            while (i < (int)row.size()) {
                int j = i;
                while (j < (int)row.size() && row[j] == row[i]) {
                    ++j;
                }
                if (j - i < 3) {
                    kept += row.substr(i, j - i);
                } else {
                    removed = true;
                }
                i = j;
            }
            row = move(kept);
        }
        return row;
    }

    // Row + "|" + the five hand counts keys the memo; the counts stay
    // single-digit (the hand holds at most 5 balls), so the concatenation
    // is unambiguous.
    static int solve(const string &row, array<int, 5> &remaining, unordered_map<string, int> &memo) {
        if (row.empty()) {
            return 0;
        }
        string key = row + "|";
        for (int count : remaining) {
            key += to_string(count);
        }
        auto found = memo.find(key);
        if (found != memo.end()) {
            return found->second;
        }
        int best = kImpossible;
        int i = 0;
        while (i < (int)row.size()) {
            int j = i;
            while (j < (int)row.size() && row[j] == row[i]) {
                ++j;
            }
            int color = (int)kColors.find(row[i]);
            if (remaining[color] > 0) {
                // One canonical gap per run: sliding the ball along the run
                // it joins produces the identical next row.
                --remaining[color];
                int sub = solve(clean(row.substr(0, i) + row[i] + row.substr(i)), remaining, memo);
                best = min(best, sub + 1);
                ++remaining[color];
            }
            i = j;
        }
        memo[key] = best;
        return best;
    }
};
