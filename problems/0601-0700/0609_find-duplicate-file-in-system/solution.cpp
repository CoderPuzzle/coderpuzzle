class Solution {
  public:
    vector<vector<string>> findDuplicate(vector<string> &paths) {
        // One scan groups every file by what it contains. Inside a directory
        // info string the directory path comes first, then its files; a file
        // token keeps its name before the first '(' and its content between
        // that '(' and the token's last ')'. Contents hold no space — the
        // space-separated tokenization could not carry one — so every file
        // lands in exactly one bucket, its path appended in scan order. The
        // greater<> comparator walks the keys in the pinned descending
        // content order already.
        map<string, vector<string>, greater<string>> groups;
        for (const string &info : paths) {
            size_t cursor = info.find(' ');
            const string directory = info.substr(0, cursor);
            while (cursor != string::npos) {
                size_t next = info.find(' ', cursor + 1);
                size_t end = next == string::npos ? info.size() : next;
                const string token = info.substr(cursor + 1, end - cursor - 1);
                const size_t openAt = token.find('(');
                const size_t closeAt = token.rfind(')');
                const string content = token.substr(openAt + 1, closeAt - openAt - 1);
                groups[content].push_back(directory + "/" + token.substr(0, openAt));
                cursor = next;
            }
        }
        // A bucket answers the question only once a second file joins it.
        vector<vector<string>> results;
        for (const auto &entry : groups) {
            if (entry.second.size() >= 2) {
                results.push_back(entry.second);
            }
        }
        return results;
    }
};
