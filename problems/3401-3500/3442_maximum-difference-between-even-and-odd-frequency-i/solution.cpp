class Solution {
  public:
    // To maximize freq(a1) - freq(a2), take the largest odd frequency
    // and the smallest even one; one counting pass decides both.
    int maxDifference(string s) {
        int freq[26] = {0};
        for (char ch : s)
            ++freq[ch - 'a'];
        int odd = -1, even = 101;
        for (int f : freq) {
            if (f == 0)
                continue;
            if (f & 1)
                odd = max(odd, f);
            else
                even = min(even, f);
        }
        return odd - even;
    }
};
