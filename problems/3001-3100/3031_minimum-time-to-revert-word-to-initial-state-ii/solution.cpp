class Solution {
  public:
    int minimumTimeToInitialState(string word, int k) {
        int n = word.size();
        vector<int> fail(n, 0);
        int length = 0;
        for (int i = 1; i < n; i++) {
            char c = word[i];
            while (length && word[length] != c) {
                length = fail[length - 1];
            }
            if (word[length] == c) {
                length++;
            }
            fail[i] = length;
        }
        vector<bool> isBorder(n + 1, false);
        for (int cut = fail[n - 1]; cut; cut = fail[cut - 1]) {
            isBorder[cut] = true;
        }
        int t = 1;
        while (t * k < n && !isBorder[n - t * k]) {
            t++;
        }
        return t;
    }
};
