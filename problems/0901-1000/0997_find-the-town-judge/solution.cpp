class Solution {
  public:
    int findJudge(int n, vector<vector<int>> &trust) {
        vector<int> score(n + 1, 0);
        for (auto &pair : trust) {
            int a = pair[0];
            int b = pair[1];
            score[a]--;
            score[b]++;
        }

        for (int person = 1; person <= n; person++) {
            if (score[person] == n - 1) {
                return person;
            }
        }
        return -1;
    }
};
