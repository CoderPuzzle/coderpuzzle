class Solution {
  public:
    vector<int> executeInstructions(int n, vector<int> &startPos, string s) {
        vector<int> answer(s.size(), 0);
        for (int start = 0; start < static_cast<int>(s.size()); ++start) {
            int row = startPos[0];
            int col = startPos[1];
            for (int index = start; index < static_cast<int>(s.size()); ++index) {
                int nextRow = row;
                int nextCol = col;
                if (s[index] == 'L') {
                    --nextCol;
                } else if (s[index] == 'R') {
                    ++nextCol;
                } else if (s[index] == 'U') {
                    --nextRow;
                } else {
                    ++nextRow;
                }
                if (nextRow < 0 || nextRow >= n || nextCol < 0 || nextCol >= n) {
                    break;
                }
                row = nextRow;
                col = nextCol;
                ++answer[start];
            }
        }
        return answer;
    }
};
