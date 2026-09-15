class Solution {
  public:
    string shortestSuperstring(string s1, string s2) {
        // Containment first: the shorter answer is then always a merge that
        // overlaps a suffix of one string with a prefix of the other, so
        // the scan takes the largest such overlap in either direction and
        // lets the first direction win ties.
        auto maxOverlap = [](const string &a, const string &b) {
            for (int k = min(a.size(), b.size()); k > 0; --k) {
                if (a.compare(a.size() - k, k, b, 0, k) == 0) {
                    return k;
                }
            }
            return 0;
        };
        if (s1.find(s2) != string::npos) {
            return s1;
        }
        if (s2.find(s1) != string::npos) {
            return s2;
        }
        int ov1 = maxOverlap(s1, s2); // suffix of s1 == prefix of s2
        int ov2 = maxOverlap(s2, s1);
        if (ov1 >= ov2) {
            return s1 + s2.substr(ov1);
        }
        return s2 + s1.substr(ov2);
    }
};
