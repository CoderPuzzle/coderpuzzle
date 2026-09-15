class Solution {
  public:
    bool makeStringsEqual(string s, string target) {
        // The operation maps (0,0)->(0,0), (0,1)/(1,0)->(1,1), and
        // (1,1)->(1,0): an all-zero string is frozen forever, and once
        // a 1 exists it can never be the last one destroyed. "Contains
        // a 1" is therefore invariant in both directions, and any two
        // strings that agree on it are mutually reachable.
        bool hasS = s.find('1') != string::npos;
        bool hasTarget = target.find('1') != string::npos;
        return hasS == hasTarget;
    }
};
