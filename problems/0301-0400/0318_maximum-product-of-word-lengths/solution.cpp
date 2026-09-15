class Solution {
  public:
    int maxProduct(vector<string> &words) {
        int n = words.size();
        // Only the set of distinct letters matters: compress each word into
        // a 26-bit mask (bit set per letter present) plus its length.
        vector<int> masks(n, 0);
        vector<int> lens(n, 0);
        for (int i = 0; i < n; i++) {
            int mask = 0;
            for (char ch : words[i]) {
                mask |= 1 << (ch - 'a');
            }
            masks[i] = mask;
            lens[i] = (int)words[i].size();
        }
        int best = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // Masks AND to zero exactly when the words share no letter.
                if ((masks[i] & masks[j]) == 0 && lens[i] * lens[j] > best) {
                    best = lens[i] * lens[j];
                }
            }
        }
        return best;
    }
};
