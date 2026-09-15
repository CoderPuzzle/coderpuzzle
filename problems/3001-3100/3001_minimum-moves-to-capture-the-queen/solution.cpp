class Solution {
  public:
    int minMovesToCaptureTheQueen(int a, int b, int c, int d, int e, int f) {
        // The answer is 1 or 2. It is 1 exactly when a white piece already
        // attacks the queen through an unobstructed line; the other white
        // piece is the only thing that can stand between.
        if (a == e && !(c == a && ((b < d && d < f) || (f < d && d < b)))) {
            return 1; // rook shares the queen's rank, bishop not between
        }
        if (b == f && !(d == b && ((a < c && c < e) || (e < c && c < a)))) {
            return 1; // rook shares the queen's file, bishop not between
        }
        if (c - e == d - f || c - e == f - d) {
            bool on_diag = a - c == b - d || a - c == d - b;
            bool in_span = a - e == b - f || a - e == f - b;
            bool between = (c < a && a < e) || (e < a && a < c);
            if (!(on_diag && in_span && between)) {
                return 1; // bishop's diagonal is clear down to the queen
            }
        }
        return 2; // no immediate attack; a staging move always exists
    }
};
