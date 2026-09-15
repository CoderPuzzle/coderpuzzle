class Solution {
  public:
    // Removing a run of t consecutive bars merges t+1 lines of cells
    // into one span, so each axis contributes side = longest run + 1 and
    // the square is limited by the smaller side. Only the bar lists
    // matter — n and m only bound where bars may sit. The area is at
    // most 101^2, well inside int.
    int longestRun(vector<int> &bars) {
        sort(bars.begin(), bars.end());
        int best = 1;
        int cur = 1;
        for (int i = 1; i < (int)bars.size(); ++i) {
            cur = bars[i] == bars[i - 1] + 1 ? cur + 1 : 1;
            best = max(best, cur);
        }
        return best;
    }

    int maximizeSquareHoleArea(int n, int m, vector<int> &hBars, vector<int> &vBars) {
        int side = min(longestRun(hBars), longestRun(vBars)) + 1;
        return side * side;
    }
};
