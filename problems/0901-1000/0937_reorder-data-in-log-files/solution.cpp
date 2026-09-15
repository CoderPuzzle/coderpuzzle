class Solution {
  public:
    vector<string> reorderLogFiles(vector<string> &logs) {
        // Each letter entry carries (content, identifier, original log);
        // digit logs are set aside untouched.
        vector<tuple<string, string, string>> letter;
        vector<string> digit;
        for (const string &log : logs) {
            size_t space = log.find(' ');
            string ident = log.substr(0, space);
            string content = log.substr(space + 1);
            // The content's first character classifies the log: a digit
            // makes it a digit-log, which the sort never touches.
            if (isdigit(static_cast<unsigned char>(content[0]))) {
                digit.push_back(log);
            } else {
                letter.emplace_back(content, ident, log);
            }
        }
        // Letter-logs order by (content, identifier) — tuple comparison is
        // exactly that key pair, and equal keys mean identical logs — then
        // every digit-log follows in its input position.
        stable_sort(letter.begin(), letter.end());
        vector<string> result;
        result.reserve(logs.size());
        for (const auto &[content, ident, log] : letter) {
            result.push_back(log);
        }
        for (const string &log : digit) {
            result.push_back(log);
        }
        return result;
    }
};
