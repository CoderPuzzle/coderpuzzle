class Solution {
  public:
    // Mark (bench, student) pairs in a fixed grid; the first sight of a
    // pair is the only one that bumps its bench's unique count.
    int maxStudentsOnBench(vector<vector<int>> &students) {
        vector<vector<char>> seen(101, vector<char>(101, 0));
        vector<int> count(101, 0);
        for (auto &entry : students) {
            if (!seen[entry[1]][entry[0]]) {
                seen[entry[1]][entry[0]] = 1;
                count[entry[1]]++;
            }
        }
        int best = 0;
        for (int bench = 1; bench <= 100; bench++) {
            best = max(best, count[bench]);
        }
        return best;
    }
};
