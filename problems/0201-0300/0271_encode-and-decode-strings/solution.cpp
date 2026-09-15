#include <string>
#include <vector>

// Length-prefixed chunks: each string travels as its decimal length, a
// colon, then the string itself, concatenated in order. The prefix says
// exactly how many characters belong to the piece, so no colon or digit
// inside a string can be mistaken for structure.
class Codec {
  public:
    string encode(vector<string> strs) {
        string out;
        for (const string &word : strs) {
            out += to_string(word.size());
            out += ':';
            out += word;
        }
        return out;
    }

    // The mirror walk: digits up to the next colon are the decimal length,
    // that many characters are the next string, and the cursor lands on
    // the following length.
    vector<string> decode(string s) {
        vector<string> words;
        size_t position = 0;
        while (position < s.size()) {
            size_t colon = s.find(':', position);
            size_t length = stoull(s.substr(position, colon - position));
            words.push_back(s.substr(colon + 1, length));
            position = colon + 1 + length;
        }
        return words;
    }
};
