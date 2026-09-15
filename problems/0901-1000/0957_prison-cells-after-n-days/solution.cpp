class Solution {
  public:
    vector<int> prisonAfterNDays(vector<int> &cells, int n) {
        // Eight two-state cells admit at most 256 rows, and day one vacates
        // both end cells, leaving 64 — the deterministic daily map must
        // loop. Hash each row (as its 8-bit mask) to its first day; when
        // the row reappears on day `day` after first being seen on day
        // `first`, the future repeats that day - first cycle, so only
        // (n - day) % cycle further transitions remain.
        unordered_map<int, int> seen;
        int state = mask(cells);
        int day = 0;
        while (day < n && seen.count(state) == 0) {
            seen[state] = day;
            cells = nextDay(cells);
            state = mask(cells);
            day++;
        }
        if (day < n) {
            int cycle = day - seen[state];
            for (int i = 0; i < (n - day) % cycle; i++) {
                cells = nextDay(cells);
            }
        }
        return cells;
    }

  private:
    static vector<int> nextDay(const vector<int> &cells) {
        vector<int> next(8, 0);
        for (int i = 1; i < 7; i++) {
            next[i] = cells[i - 1] == cells[i + 1] ? 1 : 0;
        }
        return next;
    }

    static int mask(const vector<int> &cells) {
        int bits = 0;
        for (int value : cells) {
            bits = bits << 1 | value;
        }
        return bits;
    }
};
