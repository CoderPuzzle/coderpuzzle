class Solution {
  public:
    int minDistance(int height, int width, vector<int> &tree, vector<int> &squirrel, vector<vector<int>> &nuts) {
        // Once the first nut is under the tree, every remaining nut is a
        // tree -> nut -> tree round trip, so 2 * dist(nut, tree) is paid no
        // matter what.
        int total = 0;
        int best = INT_MAX;
        for (const vector<int> &nut : nuts) {
            int toTree = abs(nut[0] - tree[0]) + abs(nut[1] - tree[1]);
            total += 2 * toTree;
            // Starting with this nut instead swaps one round trip for
            // squirrel -> nut -> tree, changing the total by the detour
            // dist(squirrel, nut) - dist(nut, tree).
            int detour = abs(nut[0] - squirrel[0]) + abs(nut[1] - squirrel[1]) - toTree;
            best = min(best, detour);
        }
        return total + best;
    }
};
