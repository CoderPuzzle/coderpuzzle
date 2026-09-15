class Solution {
  public:
    string decodeMessage(string key, string message) {
        // First appearances in key fill the substitution table in order,
        // each new letter taking the next alphabet letter; spaces map to
        // spaces, then message is translated through the table.
        vector<char> table(26, '?');
        char next = 'a';
        for (char ch : key) {
            if (ch != ' ' && table[ch - 'a'] == '?') {
                table[ch - 'a'] = next;
                next++;
            }
        }
        string out;
        out.reserve(message.size());
        for (char ch : message) {
            out.push_back(ch == ' ' ? ' ' : table[ch - 'a']);
        }
        return out;
    }
};
