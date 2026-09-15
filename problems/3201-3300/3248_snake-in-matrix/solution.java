class Solution {

    public int finalPositionOfSnake(int n, String[] commands) {
        // Each command moves exactly one coordinate by one step; the
        // statement's guarantee keeps both within [0, n), so no boundary
        // checks are needed.
        int row = 0;
        int col = 0;
        for (String command : commands) {
            switch (command) {
                case "UP":
                    --row;
                    break;
                case "DOWN":
                    ++row;
                    break;
                case "LEFT":
                    --col;
                    break;
                default: // "RIGHT"
                    ++col;
            }
        }
        return row * n + col;
    }
}
