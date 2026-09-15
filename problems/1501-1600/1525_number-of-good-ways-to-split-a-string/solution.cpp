class Solution {
  public:
    int numSplits(string s) {
        int n = s.size();

        // prefix[i]: number of distinct letters in s[0..i]
        vector<int> prefix(n);
        vector<bool> seen(26, false);
        int distinct = 0;
        for (int i = 0; i < n; i++) {
            int idx = s[i] - 'a';
            if (!seen[idx]) {
                seen[idx] = true;
                distinct++;
            }
            prefix[i] = distinct;
        }

        // suffix[i]: number of distinct letters in s[i..n-1]
        vector<int> suffix(n);
        fill(seen.begin(), seen.end(), false);
        distinct = 0;
        for (int i = n - 1; i >= 0; i--) {
            int idx = s[i] - 'a';
            if (!seen[idx]) {
                seen[idx] = true;
                distinct++;
            }
            suffix[i] = distinct;
        }

        int count = 0;
        for (int i = 0; i < n - 1; i++) {
            if (prefix[i] == suffix[i + 1]) {
                count++;
            }
        }
        return count;
    }
};
