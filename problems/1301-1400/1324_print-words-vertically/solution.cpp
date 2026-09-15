class Solution {
  public:
    vector<string> printVertically(string s) {
        // Row k takes character k of every word in order; short words pad
        // with a space, and trailing spaces are trimmed off each row.
        vector<string> words;
        string current;
        for (char ch : s) {
            if (ch == ' ') {
                words.push_back(current);
                current.clear();
            } else {
                current.push_back(ch);
            }
        }
        words.push_back(current);
        size_t height = 0;
        for (const string &word : words) {
            height = max(height, word.size());
        }
        vector<string> rows;
        string buffer(words.size(), ' ');
        for (size_t k = 0; k < height; ++k) {
            size_t last = 0;
            for (size_t w = 0; w < words.size(); ++w) {
                if (k < words[w].size()) {
                    buffer[w] = words[w][k];
                    last = w + 1;
                } else {
                    buffer[w] = ' ';
                }
            }
            rows.push_back(buffer.substr(0, last));
        }
        return rows;
    }
};
