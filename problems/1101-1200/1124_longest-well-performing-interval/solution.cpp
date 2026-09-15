class Solution {
  public:
    int longestWPI(vector<int> &hours) {
        // earliest index each prefix value has been seen; {0: -1} lets
        // intervals starting at index 0 be handled uniformly
        unordered_map<int, int> first;
        first[0] = -1;
        int prefix = 0;
        int best = 0;
        for (int i = 0; i < (int)hours.size(); i++) {
            // tiring day scores +1, other -1: a well-performing interval is
            // exactly a subarray whose sum is strictly positive
            prefix += hours[i] > 8 ? 1 : -1;
            if (prefix > 0) {
                // the whole prefix hours[0..i] is already well-performing
                best = i + 1;
            } else if (first.count(prefix - 1)) {
                // cut just after the earliest prefix-1: the remainder sums to
                // exactly 1, and since steps are unit-sized no longer interval
                // can end at i
                best = max(best, i - first[prefix - 1]);
            }
            if (!first.count(prefix)) {
                // record only the first sighting so stored indices stay leftmost
                first[prefix] = i;
            }
        }
        return best;
    }
};
