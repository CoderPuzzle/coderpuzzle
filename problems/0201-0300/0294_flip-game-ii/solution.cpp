class Solution {
  public:
    bool canWin(string currentState) {
        // The player to move wins exactly when some flip of a "++" hands the
        // opponent a position from which they cannot win; a position with no
        // "++" left is a loss. A flip never crosses a '-', so the game
        // decomposes into independent '+'-runs: memoize on the sorted lengths
        // of the live runs (>= 2), which alone decide the position.
        map<vector<int>, bool> memo;
        vector<int> runs;
        int run = 0;
        for (char c : currentState) {
            if (c == '+') {
                ++run;
            } else {
                if (run > 0)
                    runs.push_back(run);
                run = 0;
            }
        }
        if (run > 0)
            runs.push_back(run);
        return canWin(runs, memo);
    }

  private:
    bool canWin(vector<int> runs, map<vector<int>, bool> &memo) {
        vector<int> live;
        for (int length : runs) {
            if (length >= 2)
                live.push_back(length);
        }
        sort(live.begin(), live.end());
        auto cached = memo.find(live);
        if (cached != memo.end())
            return cached->second;
        bool winner = false;
        for (size_t index = 0; index < live.size() && !winner; ++index) {
            int length = live[index];
            vector<int> others = live;
            others.erase(others.begin() + index);
            // Flipping spot i inside `length` leaves runs i and length-2-i;
            // the mirror split makes the same successor, so half the range.
            for (int i = 0; i <= (length - 2) / 2 && !winner; ++i) {
                vector<int> next = others;
                if (i >= 2)
                    next.push_back(i);
                if (length - 2 - i >= 2)
                    next.push_back(length - 2 - i);
                if (!canWin(next, memo))
                    winner = true;
            }
        }
        memo[live] = winner;
        return winner;
    }
};
