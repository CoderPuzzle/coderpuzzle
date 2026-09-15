class Solution {
  public:
    string rearrangeString(string s, string x, string y) {
        sort(s.begin(), s.end()); // groups equal letters into one block each
        if (x[0] < y[0]) {
            reverse(s.begin(), s.end());
        }
        return s;
    }
};
