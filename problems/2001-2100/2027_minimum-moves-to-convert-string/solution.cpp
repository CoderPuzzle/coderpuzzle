class Solution {
  public:
    int minimumMoves(string s) {
        int moves = 0;
        int index = 0;
        while (index < (int)s.size()) {
            if (s[index] == 'X') {
                ++moves;
                index += 3;
            } else {
                ++index;
            }
        }
        return moves;
    }
};
