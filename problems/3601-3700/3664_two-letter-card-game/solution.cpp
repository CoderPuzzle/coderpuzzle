class Solution {
  public:
    int score(vector<string> &cards, string x) {
        // A one-sided pool (26 counts, zeros included) plus `helpers`
        // double-x cards: every pair consumes at least one letter card,
        // every pair needs a partner outside the largest class, and only
        // so many pairs fit at all — the tight bound is the smallest.
        auto bestPairs = [](const int(&counts)[26], int helpers) {
            int total = 0;
            int largest = 0;
            for (int count : counts) {
                total += count;
                largest = max(largest, count);
            }
            if (total == 0) {
                return 0;
            }
            return min((total + helpers) / 2, min(total + helpers - largest, total));
        };

        int both = 0;
        int firstOnly[26] = {};
        int secondOnly[26] = {};
        for (const string &card : cards) {
            char a = card[0];
            char b = card[1];
            if (a == x[0]) {
                if (b == x[0]) {
                    ++both;
                } else {
                    ++firstOnly[b - 'a'];
                }
            } else if (b == x[0]) {
                ++secondOnly[a - 'a'];
            }
        }

        // Each double-x card is spent on one side or the other; every
        // matching splits that way, so scanning all splits covers everything.
        int best = 0;
        for (int give = 0; give <= both; ++give) {
            best = max(best, bestPairs(firstOnly, give) + bestPairs(secondOnly, both - give));
        }
        return best;
    }
};
