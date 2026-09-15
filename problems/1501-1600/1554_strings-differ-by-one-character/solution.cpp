class Solution {
  public:
    bool differByOne(vector<string> &words) {
        int n = (int)words.size();
        if (n < 2)
            return false;
        int length = (int)words[0].size();
        // Fix one position at a time; within that position, hash every word
        // with that single character masked out.
        for (int pos = 0; pos < length; ++pos) {
            unordered_set<string> seen;
            for (const string &word : words) {
                string masked = word;
                masked[pos] = '*';
                // insert().second is false on a repeat: two words agree
                // everywhere except pos, and uniqueness means they differ
                // there and nowhere else.
                if (!seen.insert(masked).second)
                    return true;
            }
        }
        return false;
    }
};
