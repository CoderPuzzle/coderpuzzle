class Solution {
  public:
    int maxUniqueSplit(string s) {
        n = static_cast<int>(s.size());
        best = 0;
        walk(s, 0, 0);
        return best;
    }

  private:
    int n;
    int best;
    unordered_set<string> used;

    void walk(const string &s, int start, int count) {
        if (start == n) {
            best = max(best, count);
            return;
        }
        // count so far plus the (n - start) characters still left, each
        // contributing at most one more piece: a bound on what this
        // branch could still reach, cheap to check before it is explored.
        if (count + (n - start) <= best)
            return;
        for (int end = start + 1; end <= n; ++end) {
            string piece = s.substr(start, end - start);
            if (used.count(piece))
                continue;
            used.insert(piece);
            walk(s, end, count + 1);
            // Undo so the next candidate length starts from the same
            // used-substring state as this one did.
            used.erase(piece);
        }
    }
};
