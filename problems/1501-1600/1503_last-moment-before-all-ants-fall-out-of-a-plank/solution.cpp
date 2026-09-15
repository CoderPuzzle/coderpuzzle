class Solution {
  public:
    int getLastMoment(int n, vector<int> &left, vector<int> &right) {
        // Two ants bouncing off each other is indistinguishable from passing
        // through while swapping identities; the plank empties at a time that
        // depends only on positions, so collisions can be ignored.
        int best = 0;
        // A left-mover at position p needs p seconds to reach 0.
        for (int position : left) {
            best = max(best, position);
        }
        // A right-mover at p needs n - p seconds to reach n.
        for (int position : right) {
            best = max(best, n - position);
        }
        return best;
    }
};
