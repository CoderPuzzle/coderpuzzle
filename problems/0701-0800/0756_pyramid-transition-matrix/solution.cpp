class Solution {
  public:
    bool pyramidTransition(string bottom, vector<string> &allowed) {
        // For each ordered pair of letters, a bitmask of the letters that
        // may sit on it. A pair with no pattern is a dead end: mask 0.
        vector<int> tops(26 * 26, 0);
        for (const string &t : allowed) {
            tops[(t[0] - 'A') * 26 + (t[1] - 'A')] |= 1 << (t[2] - 'A');
        }
        unordered_set<string> rows;
        rows.insert(bottom);
        int width = (int)bottom.size();
        while (width > 1) {
            unordered_set<string> above;
            for (const string &row : rows) {
                // Candidate letters per position of the row above; a zero
                // mask means this row cannot carry anything.
                vector<int> masks;
                masks.reserve(width - 1);
                bool alive = true;
                for (int i = 0; i + 1 < width; ++i) {
                    int mask = tops[(row[i] - 'A') * 26 + (row[i + 1] - 'A')];
                    if (mask == 0) {
                        alive = false;
                        break;
                    }
                    masks.push_back(mask);
                }
                if (!alive) {
                    continue;
                }
                // The state stays a whole concrete row: adjacent positions
                // above share the row below, so the letter at one position
                // constrains its neighbor. Enumerate the product of the
                // masks; the set dedups rows lifted from different parents.
                vector<string> frontier{""};
                for (int mask : masks) {
                    vector<string> lifted;
                    for (const string &r : frontier) {
                        for (int d = 0; d < 6; ++d) {
                            if (mask >> d & 1) {
                                lifted.push_back(r + char('A' + d));
                            }
                        }
                    }
                    frontier = move(lifted);
                }
                above.insert(frontier.begin(), frontier.end());
            }
            if (above.empty()) {
                return false;
            }
            rows = move(above);
            --width;
        }
        return true;
    }
};
