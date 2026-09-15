class Solution {
  public:
    vector<int> findSubstring(string s, vector<string> &words) {
        int wordLength = words[0].size();
        // Required multiset of words; a window matches when its counts equal it.
        unordered_map<string, int> target;
        for (const string &word : words)
            target[word]++;
        vector<int> result;
        // One sliding window per alignment offset: a match can only start at a
        // position congruent to some r in 0..wordLength-1 modulo wordLength.
        for (int offset = 0; offset < wordLength; offset++) {
            unordered_map<string, int> window;
            int count = 0; // Words currently inside the window.
            int left = offset;
            for (int right = offset; right + wordLength <= (int)s.size(); right += wordLength) {
                string word = s.substr(right, wordLength);
                if (target.find(word) == target.end()) {
                    // A non-word block can never appear in a match, so the
                    // window empties and resumes after it.
                    window.clear();
                    count = 0;
                    left = right + wordLength;
                    continue;
                }
                window[word]++;
                count++;
                // Too many copies of word: release blocks from the left end
                // until the surplus is gone.
                while (window[word] > target[word]) {
                    window[s.substr(left, wordLength)]--;
                    count--;
                    left += wordLength;
                }
                if (count == (int)words.size()) {
                    result.push_back(left);
                    // Release the leftmost block so the window can keep sliding
                    // toward the next (possibly adjacent) match.
                    window[s.substr(left, wordLength)]--;
                    count--;
                    left += wordLength;
                }
            }
        }
        // Each offset emits ascending indices within its residue class; one
        // sort merges the classes into the pinned ascending order.
        sort(result.begin(), result.end());
        return result;
    }
};
