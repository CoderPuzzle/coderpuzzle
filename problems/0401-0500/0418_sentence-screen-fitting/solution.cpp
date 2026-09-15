#include <numeric>
#include <string>
#include <vector>

class Solution {
  public:
    int wordsTyping(vector<string> &sentence, int rows, int cols) {
        int n = (int)sentence.size();
        vector<int> lengths(n);
        // One sentence "packet": every word plus its trailing space.
        for (int i = 0; i < n; ++i)
            lengths[i] = (int)sentence[i].size();
        int packet = n + accumulate(lengths.begin(), lengths.end(), 0);
        vector<int> nextStart(n, -1);
        vector<int> rowWords(n, 0);
        int total = 0;
        int start = 0;
        for (int row = 0; row < rows; ++row) {
            if (nextStart[start] < 0) {
                // A row's fill depends only on the word it starts from, so
                // memoize (next start, words placed) per start index.
                int used = 0;
                int placed = 0;
                int j = start;
                // Finish the in-progress sentence pass, reaching word 0.
                while (j < n && used + lengths[j] <= cols) {
                    used += lengths[j] + 1;
                    ++placed;
                    ++j;
                }
                if (j == n) {
                    j = 0;
                    if (used <= cols) {
                        // Aligned at word 0: whole packets fit wholesale,
                        // (cols - used) / packet of them, in one step.
                        int full = (cols - used) / packet;
                        placed += full * n;
                        used += full * packet;
                    }
                    // A sub-packet remainder: fewer than `packet` columns
                    // left, so at most n more words, one by one.
                    while (j < n && used + lengths[j] <= cols) {
                        used += lengths[j] + 1;
                        ++placed;
                        ++j;
                    }
                    if (j == n) {
                        j = 0;
                    }
                }
                nextStart[start] = j;
                rowWords[start] = placed;
            }
            total += rowWords[start];
            start = nextStart[start];
        }
        // Every n consecutive words placed completes the sentence once.
        return total / n;
    }
};
