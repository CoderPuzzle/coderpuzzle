class Solution {
  public:
    int similarPairs(vector<string> &words) {
        // Similarity ignores multiplicity and order: a 26-bit signature with
        // one bit per letter identifies each character set, and adding the
        // map entry before bumping the count pairs the word with every
        // earlier occurrence of the same set.
        unordered_map<int, int> counts;
        int total = 0;
        for (const string &word : words) {
            int signature = 0;
            for (char ch : word) {
                signature |= 1 << (ch - 'a');
            }
            total += counts[signature]++;
        }
        return total;
    }
};
