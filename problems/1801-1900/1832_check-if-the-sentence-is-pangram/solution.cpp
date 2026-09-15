class Solution {
  public:
    // A sentence is a pangram exactly when its set of distinct characters
    // is the whole lowercase alphabet, so collect the distinct characters
    // and compare the set's size with 26.
    bool checkIfPangram(string sentence) {
        unordered_set<char> seen;
        for (char c : sentence) {
            seen.insert(c);
            if (seen.size() == 26) {
                return true;
            }
        }
        return false;
    }
};
