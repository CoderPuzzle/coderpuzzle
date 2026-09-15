class Solution {
  public:
    int minimumOperationsToMakeKPeriodic(string word, int k) {
        // An operation copies one existing k-block over another, so the
        // set of block contents only shrinks and every block must end up
        // equal to some original block. Keeping the most frequent one
        // untouched, each of the other blocks is fixed by a single copy.
        unordered_map<string, int> counts;
        int blocks = static_cast<int>(word.size()) / k;
        int best = 0;
        for (int i = 0; i < static_cast<int>(word.size()); i += k) {
            string block = word.substr(i, k);
            int next = ++counts[block];
            if (next > best) {
                best = next;
            }
        }
        return blocks - best;
    }
};
