class Solution {
  public:
    // Split at the star: the fixed prefix must occur somewhere and the
    // fixed suffix somewhere after it; the star absorbs whatever sits
    // between the two.
    bool hasMatch(string s, string p) {
        size_t star = p.find('*');
        string pre = p.substr(0, star);
        string suf = p.substr(star + 1);
        size_t first = s.find(pre);
        size_t last = s.rfind(suf);
        return first != string::npos && last != string::npos && first + pre.size() <= last;
    }
};
