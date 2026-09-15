class Solution {
  public:
    vector<string> splitWordsBySeparator(vector<string> &words, string separator) {
        // Split each word at every occurrence of separator and keep the non-empty
        // pieces: leading/trailing separators give empty edge pieces and adjacent
        // ones empty middle pieces; the statement excludes empties, so appending
        // the survivors in walk order yields exactly the required strings.
        vector<string> result;
        for (const string &word : words) {
            string piece;
            for (char c : word) {
                if (c == separator[0]) {
                    if (!piece.empty()) {
                        result.push_back(piece);
                    }
                    piece.clear();
                } else {
                    piece += c;
                }
            }
            if (!piece.empty()) {
                result.push_back(piece);
            }
        }
        return result;
    }
};
