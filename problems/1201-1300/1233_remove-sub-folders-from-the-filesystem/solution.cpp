class Solution {
  public:
    vector<string> removeSubfolders(vector<string> &folder) {
        vector<string> sorted(folder.begin(), folder.end());
        sort(sorted.begin(), sorted.end());
        vector<string> out;
        for (const string &path : sorted) {
            // The slash separates a true child ("/a" + "/") from a longer
            // sibling sharing the name prefix ("/ab" vs "/a/").
            if (out.empty() || path.compare(0, out.back().size() + 1, out.back() + "/") != 0) {
                out.push_back(path);
            }
        }
        return out;
    }
};
