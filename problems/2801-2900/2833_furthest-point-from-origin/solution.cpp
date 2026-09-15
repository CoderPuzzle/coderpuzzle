class Solution {
  public:
    int furthestDistanceFromOrigin(string moves) {
        // Only the split between the fixed moves matters: each 'L'
        // steps -1 and each 'R' +1, so together they settle at the
        // offset left - right. Every '_' is free to become either
        // character, and spending all of them on one side dominates
        // any mixed assignment — a mixture only lets some of them
        // cancel out against the rest. The furthest point is
        // therefore |left - right| + wilds, reached by rewriting
        // every '_' as whichever fixed character already leads; ties
        // choose either side at no cost.
        int left = 0;
        int right = 0;
        int wilds = 0;
        for (char ch : moves) {
            if (ch == 'L') {
                ++left;
            } else if (ch == 'R') {
                ++right;
            } else {
                ++wilds;
            }
        }
        return abs(left - right) + wilds;
    }
};
