class Solution {
  public:
    int numDifferentIntegers(string word) {
        // A digit run can be up to 1000 digits long, far beyond any
        // fixed-width integer, so runs are never parsed: each is stripped
        // of leading zeros and compared as a string in a hash set. The
        // strip loop keeps one digit, so an all-zero run stays "0".
        unordered_set<string> seen;
        int n = (int)word.size();
        int i = 0;
        while (i < n) {
            char c = word[i];
            if (c < '0' || c > '9') {
                i++;
                continue;
            }
            int j = i;
            while (j < n && word[j] >= '0' && word[j] <= '9') {
                j++;
            }
            int k = i;
            while (k + 1 < j && word[k] == '0') {
                k++;
            }
            seen.insert(word.substr(k, j - k));
            i = j;
        }
        return (int)seen.size();
    }
};
