class Solution {

    public int maxDistance(String moves) {
        int x = 0;
        int y = 0;
        int wildcard = 0;
        for (int i = 0; i < moves.length(); i++) {
            char move = moves.charAt(i);
            if (move == 'R') x++;
            else if (move == 'L') x--;
            else if (move == 'U') y++;
            else if (move == 'D') y--;
            else wildcard++;
        }
        return Math.abs(x) + Math.abs(y) + wildcard;
    }
}
