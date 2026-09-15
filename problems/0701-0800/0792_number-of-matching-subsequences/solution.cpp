class Solution {
  public:
    int numMatchingSubseq(string s, vector<string> &words) {
        // Bucket each word by the next character it waits for: stream s
        // once and advance every word waiting on the arriving character.
        // bucket[wordIndex] = (nextIndex) grouped by the next char awaited
        array<vector<pair<int, int>>, 26> waiting; // char -> list of (wordIndex, nextIndex)
        int count = 0;
        for (int wi = 0; wi < (int)words.size(); wi++) {
            const string &w = words[wi];
            // Empty words match trivially (defensive; constraints say
            // non-empty).
            if (w.empty()) {
                count++;
            } else {
                waiting[w[0] - 'a'].push_back({wi, 1});
            }
        }
        for (char c : s) {
            // Take the bucket so re-filed entries are not reprocessed
            // within this step.
            auto its = std::move(waiting[c - 'a']);
            waiting[c - 'a'].clear();
            // The greedy subsequence check, distributed: a matched word
            // either completes or waits on its next character, and each
            // pointer only moves forward.
            for (auto &[wi, i] : its) {
                const string &w = words[wi];
                if (i == (int)w.size()) {
                    count++;
                } else {
                    waiting[w[i] - 'a'].push_back({wi, i + 1});
                }
            }
        }
        return count;
    }
};
