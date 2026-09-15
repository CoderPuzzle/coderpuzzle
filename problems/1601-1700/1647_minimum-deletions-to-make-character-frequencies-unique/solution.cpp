class Solution {
  public:
    int minDeletions(string s) {
        // Count how often each letter occurs, then process the frequencies
        // from largest to smallest. Whenever a frequency repeats a value we
        // have already committed to, shrink it by one deletion at a time
        // until it lands on an unused value (or hits zero, meaning that
        // letter is deleted away entirely).
        vector<int> counts(26, 0);
        for (char c : s) {
            counts[c - 'a']++;
        }
        sort(counts.begin(), counts.end(), greater<int>());

        unordered_set<int> used;
        int deletions = 0;
        for (int freq : counts) {
            while (freq > 0 && used.count(freq)) {
                freq--;
                deletions++;
            }
            if (freq > 0) {
                used.insert(freq);
            }
        }
        return deletions;
    }
};
