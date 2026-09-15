class Solution {
  public:
    vector<string> partitionString(string s) {
        // Greedy replay of the procedure: grow the current segment one
        // character at a time and emit it the first moment it is not in the
        // seen set, then start a new segment at the next index. A tail that
        // reaches the end of s while still seen is never emitted — the loop
        // simply ends (Example 2's final "a" is dropped).
        vector<string> segments;
        unordered_set<string> seen;
        int start = 0;
        for (int stop = 1; stop <= (int)s.size(); ++stop) {
            string candidate = s.substr(start, stop - start);
            if (seen.insert(candidate).second) {
                segments.push_back(candidate);
                start = stop;
            }
        }
        return segments;
    }
};
