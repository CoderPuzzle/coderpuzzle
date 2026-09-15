class Solution {
  public:
    vector<int> findNumOfValidWords(vector<string> &words, vector<string> &puzzles) {
        unordered_map<int, int> counts;
        // bucket words by their distinct-letter mask (repeats are irrelevant)
        // so each puzzle avoids scanning all words
        for (auto &w : words) {
            int m = 0;
            for (char ch : w)
                m |= 1 << (ch - 'a');
            counts[m] += 1;
        }

        vector<int> answer;
        for (auto &puzzle : puzzles) {
            // a valid word mask must contain the puzzle's first letter
            int first = 1 << (puzzle[0] - 'a');
            int puzzle_mask = 0;
            for (char ch : puzzle)
                puzzle_mask |= 1 << (ch - 'a');
            int total = 0;
            // enumerate every submask of the 7-letter puzzle mask (at most
            // 127); sub = (sub - 1) & puzzle_mask walks them all in order
            int sub = puzzle_mask;
            while (sub) {
                if (sub & first) {
                    auto it = counts.find(sub);
                    if (it != counts.end())
                        total += it->second;
                }
                sub = (sub - 1) & puzzle_mask;
            }
            answer.push_back(total);
        }
        return answer;
    }
};
