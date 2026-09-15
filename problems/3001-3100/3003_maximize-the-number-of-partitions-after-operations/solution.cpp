class Solution {
  public:
    int maxPartitionsAfterOperations(string s, int k) {
        // Sweep left to right carrying every segmentation state reachable
        // with the one allowed change unspent or already spent exactly
        // once. The unspent side is a single lineage (no change means the
        // greedy is forced); the spent side holds (open-window mask,
        // best completed count) pairs, merged on equal masks because what
        // happens next depends only on the mask.
        int unspentMask = 0;
        int unspentCount = 0;
        vector<pair<int, int>> spent;
        for (char ch : s) {
            int bit = 1 << (ch - 'a');
            vector<pair<int, int>> next;
            next.reserve(spent.size() + 26);
            for (const auto &state : spent) {
                int mask = state.first;
                int count = state.second;
                if (!(mask & bit)) {
                    if (__builtin_popcount(mask) == k) {
                        mask = bit;
                        ++count;
                    } else {
                        mask |= bit;
                    }
                }
                merge(next, mask, count);
            }
            for (int letter = 0; letter < 26; ++letter) {
                int branch = 1 << letter;
                if (branch == bit)
                    continue;
                int mask = unspentMask;
                int count = unspentCount;
                if (!(mask & branch)) {
                    if (__builtin_popcount(mask) == k) {
                        mask = branch;
                        ++count;
                    } else {
                        mask |= branch;
                    }
                }
                merge(next, mask, count);
            }
            spent = move(next);
            if (!(unspentMask & bit)) {
                if (__builtin_popcount(unspentMask) == k) {
                    unspentMask = bit;
                    ++unspentCount;
                } else {
                    unspentMask |= bit;
                }
            }
        }
        int best = unspentCount;
        for (const auto &state : spent) {
            best = max(best, state.second);
        }
        return best + 1; // the final open partition always counts
    }

  private:
    static void merge(vector<pair<int, int>> &pool, int mask, int count) {
        for (auto &state : pool) {
            if (state.first == mask) {
                state.second = max(state.second, count);
                return;
            }
        }
        pool.emplace_back(mask, count);
    }
};
