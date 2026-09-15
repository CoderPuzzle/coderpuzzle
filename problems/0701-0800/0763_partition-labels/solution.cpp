class Solution {
  public:
    vector<int> partitionLabels(string s) {
        int n = s.size();
        // A part must extend to the last occurrence of every letter it
        // contains, so record where each letter finally appears.
        array<int, 26> last;
        last.fill(-1);
        for (int i = 0; i < n; i++) {
            last[s[i] - 'a'] = i;
        }
        vector<int> parts;
        int start = 0, end = 0;
        for (int i = 0; i < n; i++) {
            // end = farthest last occurrence among letters opened so far.
            end = max(end, last[s[i] - 'a']);
            // i == end: every letter opened in this span also closes in
            // it, so a cut here is legal.
            if (i == end) {
                parts.push_back(end - start + 1);
                start = i + 1;
            }
        }
        return parts;
    }
};
