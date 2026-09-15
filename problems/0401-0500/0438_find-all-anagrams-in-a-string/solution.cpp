class Solution {
  public:
    vector<int> findAnagrams(string s, string p) {
        int length = (int)p.size();
        int n = (int)s.size();
        vector<int> result;
        if (n < length)
            return result;
        int delta[128] = {0};
        for (char ch : p)
            delta[(unsigned char)ch]++;
        int diff = 0;
        for (int d : delta)
            if (d != 0)
                diff++;
        for (int i = 0; i < n; i++) {
            int c = (unsigned char)s[i];
            if (delta[c] == 0)
                diff++;
            delta[c]--;
            if (delta[c] == 0)
                diff--;
            if (i >= length) {
                int out = (unsigned char)s[i - length];
                if (delta[out] == 0)
                    diff++;
                delta[out]++;
                if (delta[out] == 0)
                    diff--;
            }
            if (i >= length - 1 && diff == 0)
                result.push_back(i - length + 1);
        }
        return result;
    }
};
