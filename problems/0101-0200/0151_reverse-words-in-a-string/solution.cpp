class Solution {
  public:
    string reverseWords(string s) {
        // C++ strings are mutable, so this is the true in-place pass the
        // follow-up asks for: flip the whole line once, then one compacting
        // sweep puts each word's letters back.
        reverse(s.begin(), s.end());
        int n = (int)s.size(), write = 0, read = 0;
        while (read < n) {
            // Skip the run of spaces before the next word.
            while (read < n && s[read] == ' ')
                read++;
            if (read == n)
                break;
            // One separating space between words, none before the first.
            if (write > 0)
                s[write++] = ' ';
            int start = write;
            while (read < n && s[read] != ' ')
                s[write++] = s[read++];
            // The word just copied still has its letters flipped; restore them.
            reverse(s.begin() + start, s.begin() + write);
        }
        s.resize(write);
        return s;
    }
};
