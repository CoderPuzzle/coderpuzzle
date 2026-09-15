class Solution {

    public boolean judgeCircle(String moves) {
        // Vertical and horizontal movement never interact, so the plane
        // splits into two independent lines: the U/D balance and the L/R
        // balance. One sweep with two counters captures all there is to
        // check.
        int vertical = 0;
        int horizontal = 0;
        for (int i = 0; i < moves.length(); ++i) {
            char ch = moves.charAt(i);
            if (ch == 'U') {
                vertical++;
            } else if (ch == 'D') {
                vertical--;
            } else if (ch == 'L') {
                horizontal--;
            } else {
                horizontal++;
            }
        }
        // The robot is home exactly when both counters cancel to zero; a
        // leftover on either axis leaves it displaced no matter how the
        // moves were ordered.
        return vertical == 0 && horizontal == 0;
    }
}
