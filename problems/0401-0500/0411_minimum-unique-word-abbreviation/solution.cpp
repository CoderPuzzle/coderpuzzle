class Solution {
  public:
    string minAbbreviation(string target, vector<string> &dictionary) {
        // One integer per same-length word: bit i is set where the word's
        // letter differs from target's. An abbreviation keeping exactly the
        // positions in K collides with that word precisely when K & diff == 0,
        // so a valid K must hit every diff mask. Words of other lengths can
        // never match an abbreviation of target and are skipped outright.
        m_ = target.size();
        target_ = target;
        set<int> diffs;
        for (const string &word : dictionary) {
            if (word.size() != m_)
                continue;
            int mask = 0;
            for (int i = 0; i < m_; ++i)
                if (word[i] != target[i])
                    mask |= 1 << i;
            if (mask != 0)
                diffs.insert(mask);
        }
        // Only minimal masks matter: a superset of another mask is hit by
        // anything that hits its subset, so it adds no constraint.
        vector<int> byWeight(diffs.begin(), diffs.end());
        sort(byWeight.begin(), byWeight.end(),
             [](int a, int b) { return __builtin_popcount(a) < __builtin_popcount(b); });
        vector<int> minimal;
        for (int mask : byWeight) {
            bool redundant = false;
            for (int kept : minimal) {
                if ((kept & ~mask) == 0) {
                    redundant = true;
                    break;
                }
            }
            if (!redundant)
                minimal.push_back(mask);
        }

        best_len_ = m_;
        best_abbr_ = target; // The bare word itself is always a valid answer.
        walk(0, 0, 0, 0, false, minimal);
        return best_abbr_;
    }

  private:
    int m_;
    string target_;
    int best_len_;
    string best_abbr_;

    void walk(int pos, int mask, int kept, int runs, bool open_run, const vector<int> &pending) {
        // Cost floor: letters kept, runs closed, the run still open, and the
        // one extra letter a still-unhit word will eventually force.
        int floor = kept + runs + (open_run ? 1 : 0) + (pending.empty() ? 0 : 1);
        if (floor > best_len_)
            return;
        if (pos == m_) {
            if (pending.empty()) {
                int cost = kept + runs + (open_run ? 1 : 0);
                string abbr = build(mask);
                if (cost < best_len_ || (cost == best_len_ && abbr < best_abbr_)) {
                    best_len_ = cost;
                    best_abbr_ = abbr;
                }
            }
            return;
        }
        // Abbreviate this position: a pending mask with no set bit here or
        // later can never be hit again, so the branch survives only if every
        // mask still has a bit left to aim at.
        int future = ((1 << m_) - 1) ^ ((1 << pos) - 1);
        bool alive = true;
        for (int diff : pending) {
            if ((diff & future) == 0) {
                alive = false;
                break;
            }
        }
        if (alive)
            walk(pos + 1, mask, kept, runs, true, pending);
        // Keep this letter: masks hit here are satisfied from now on.
        vector<int> still;
        for (int diff : pending) {
            if ((diff >> pos & 1) == 0)
                still.push_back(diff);
        }
        walk(pos + 1, mask | 1 << pos, kept + 1, runs + (open_run ? 1 : 0), false, still);
    }

    string build(int mask) {
        string abbr;
        int run = 0;
        for (int i = 0; i < m_; ++i) {
            if (mask >> i & 1) {
                if (run > 0) {
                    abbr += to_string(run);
                    run = 0;
                }
                abbr += target_[i];
            } else {
                ++run;
            }
        }
        if (run > 0)
            abbr += to_string(run);
        return abbr;
    }
};
