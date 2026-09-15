class Solution {
  public:
    bool hasAllCodes(string s, int k) {
        // all 2^k codes present <=> distinct length-k substrings reach 2^k;
        // a string shorter than k cannot host even one code of length k
        int need = 1 << k;
        if ((int)s.size() < k)
            return false;
        unordered_set<string> seen;
        for (int i = 0; i + k <= (int)s.size(); i++) {
            seen.insert(s.substr(i, k));
            // early exit: codes exhausted before the string ends
            if ((int)seen.size() == need)
                return true;
        }
        return (int)seen.size() == need;
    }
};
