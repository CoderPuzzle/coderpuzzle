class Solution {

    public int minimumMoves(String s) {
        int moves = 0;
        int index = 0;
        while (index < s.length()) {
            if (s.charAt(index) == 'X') {
                ++moves;
                index += 3;
            } else {
                ++index;
            }
        }
        return moves;
    }
}
