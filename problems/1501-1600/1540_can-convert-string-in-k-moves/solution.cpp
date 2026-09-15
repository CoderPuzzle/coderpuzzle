class Solution {
  public:
    bool canConvertString(string s, string t, int k) {
        // equal length is guaranteed by the constraints
        if (s.size() != t.size())
            return false;
        // count how many positions need each shift amount d in 1..25
        int needCount[26] = {0};
        for (size_t i = 0; i < s.size(); i++) {
            int d = (t[i] - s[i] + 26) % 26;
            if (d != 0)
                needCount[d]++;
        }
        // the j-th position needing shift d must use move d + 26*(j-1)
        for (int d = 1; d < 26; d++) {
            int count = needCount[d];
            if (count == 0)
                continue;
            long long lastMove = (long long)d + 26LL * (count - 1);
            if (lastMove > k)
                return false;
        }
        return true;
    }
};
