class Solution {
  public:
    string longestDiverseString(int a, int b, int c) {
        int cnt[3] = {a, b, c};
        char letters[3] = {'a', 'b', 'c'};
        string result;
        // most plentiful letter first: burning rare letters while a common
        // one dominates would strand it in a forced aaa/bbb/ccc run
        while (true) {
            int idx[3] = {0, 1, 2};
            sort(idx, idx + 3, [&](int x, int y) {
                if (cnt[x] != cnt[y]) {
                    return cnt[x] > cnt[y];
                }
                return letters[x] < letters[y];
            });
            int pick = idx[0];
            if (cnt[pick] == 0) {
                break;
            }
            size_t len = result.size();
            if (len >= 2 && result[len - 1] == letters[pick] && result[len - 2] == letters[pick]) {
                // head letter just placed twice -> switch to the runner-up; if
                // the runner-up is out of budget, only one letter remains and it
                // is already doubled — cap here rather than emit a triple
                pick = idx[1];
                if (cnt[pick] == 0) {
                    break;
                }
            }
            result.push_back(letters[pick]);
            cnt[pick]--;
        }
        return result;
    }
};
