class Solution {
  public:
    vector<string> fullJustify(vector<string> &words, int maxWidth) {
        // Greedy packing: the current line keeps accepting words while its
        // letters plus one joining space per gap still fit in maxWidth; the
        // first word that would overflow opens a new line.
        vector<vector<string>> lines;
        vector<string> current;
        int letters = 0;
        for (const string &word : words) {
            if (!current.empty() && letters + (int)word.size() + (int)current.size() > maxWidth) {
                lines.push_back(current);
                current.clear();
                letters = 0;
            }
            current.push_back(word);
            letters += (int)word.size();
        }
        lines.push_back(current);

        vector<string> justified;
        for (size_t index = 0; index < lines.size(); ++index) {
            const vector<string> &line = lines[index];
            // The last line, and any line holding a single word, is
            // left-justified: single spaces, padding all on the tail.
            if (index == lines.size() - 1 || line.size() == 1) {
                string text;
                for (const string &word : line) {
                    if (!text.empty())
                        text += ' ';
                    text += word;
                }
                text.append(maxWidth - text.size(), ' ');
                justified.push_back(text);
                continue;
            }
            letters = 0;
            for (const string &word : line)
                letters += (int)word.size();
            int gaps = (int)line.size() - 1;
            int base = (maxWidth - letters) / gaps;
            int extra = (maxWidth - letters) % gaps;
            string text;
            for (int gap = 0; gap < gaps; ++gap) {
                text += line[gap];
                // Every gap gets `base` spaces and the leftmost `extra` gaps
                // one more, so left slots are never narrower than right ones.
                text.append(base + (gap < extra ? 1 : 0), ' ');
            }
            text += line[gaps];
            justified.push_back(text);
        }
        return justified;
    }
};
