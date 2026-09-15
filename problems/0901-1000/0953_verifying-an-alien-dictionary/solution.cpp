class Solution {
  public:
    bool isAlienSorted(vector<string> &words, string order) {
        // Rank of every letter under the alien alphabet.
        int rank[26];
        for (int index = 0; index < (int)order.size(); ++index) {
            rank[order[index] - 'a'] = index;
        }
        // Adjacent pairs decide the whole list: any out-of-order pair
        // falsifies it, and each pair's verdict is final.
        for (size_t i = 0; i + 1 < words.size(); ++i) {
            const string &first = words[i];
            const string &second = words[i + 1];
            // March to the first differing position — the only one that
            // orders this pair.
            size_t length = min(first.size(), second.size());
            size_t j = 0;
            while (j < length && first[j] == second[j]) {
                ++j;
            }
            // A shared prefix: the shorter word is smaller, so only the
            // left word may be short; otherwise the first differing
            // letters decide, and the left word must lose that duel.
            if (j == length) {
                if (first.size() > second.size()) {
                    return false;
                }
            } else if (rank[first[j] - 'a'] > rank[second[j] - 'a']) {
                return false;
            }
        }
        return true;
    }
};
