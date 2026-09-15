class Solution {
  public:
    int numSquares(int n) {
        // The squares available as subtractions, ascending — so the inner
        // loop can break as soon as s exceeds the remainder.
        vector<int> squares;
        for (int i = 1; i * i <= n; ++i)
            squares.push_back(i * i);
        // Level-by-level BFS over remainders: level k holds every value
        // reachable from n by subtracting exactly k squares.
        unordered_set<int> level{n};
        unordered_set<int> seen{n};
        int steps = 0;
        while (!level.empty()) {
            ++steps;
            unordered_set<int> nextLevel;
            for (int r : level) {
                for (int s : squares) {
                    if (s > r)
                        break;
                    int t = r - s;
                    // Reaching 0 at this depth settles the answer.
                    if (t == 0)
                        return steps;
                    // First sight of a remainder is its shallowest depth; a
                    // revisit through another square can never beat it.
                    if (seen.insert(t).second)
                        nextLevel.insert(t);
                }
            }
            level = move(nextLevel);
        }
        // Lagrange's four-square theorem bounds the search at four levels,
        // so the loop always returns from inside.
        return steps;
    }
};
