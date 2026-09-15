class Solution {
  public:
    int lengthLongestPath(string input) {
        // depths[d] is the absolute-path length of the most recent entry seen
        // at depth d; a name at depth d extends the entry at depth d - 1.
        vector<int> depths(1, 0);
        int longest = 0;
        int start = 0;
        while (start <= (int)input.size()) {
            int end = input.find('\n', start);
            if (end == string::npos) {
                end = input.size();
            }
            int depth = 0;
            while (start + depth < end && input[start + depth] == '\t') {
                depth++;
            }
            string name = input.substr(start + depth, end - start - depth);
            // The path to this entry is its parent's path, one '/' separator,
            // then the name itself (the root level has no separator).
            int path = (depth > 0 ? depths[depth - 1] + 1 : 0) + (int)name.size();
            if (depth < (int)depths.size()) {
                depths[depth] = path;
            } else {
                depths.push_back(path);
            }
            // Files are exactly the names that contain a dot.
            if (name.find('.') != string::npos) {
                longest = max(longest, path);
            }
            start = end + 1;
        }
        return longest;
    }
};
