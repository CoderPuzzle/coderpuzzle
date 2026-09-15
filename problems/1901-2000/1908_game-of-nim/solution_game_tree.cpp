class Solution {
  public:
    bool nimGame(vector<int> &piles) {
        // Game-tree DP: the mover with no stones left to take loses, and a
        // position is won exactly when some move — pick a pile, reduce it —
        // strands the opponent on a lost position. Memoize on the sorted
        // pile vector: pile order never changes the move options, so every
        // distinct position is decided exactly once.
        vector<int> state = piles;
        sort(state.begin(), state.end());
        map<vector<int>, bool> memo;
        return wins(state, memo);
    }

  private:
    bool wins(vector<int> &state, map<vector<int>, bool> &memo) {
        auto found = memo.find(state);
        if (found != memo.end())
            return found->second;
        for (int i = 0; i < (int)state.size(); ++i) {
            for (int take = 1; take <= state[i]; ++take) {
                vector<int> nxt = state;
                nxt[i] -= take;
                sort(nxt.begin(), nxt.end());
                if (!wins(nxt, memo)) {
                    memo[state] = true;
                    return true;
                }
            }
        }
        memo[state] = false;
        return false;
    }
};
