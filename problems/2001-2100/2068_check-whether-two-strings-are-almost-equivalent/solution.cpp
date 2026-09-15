class Solution {
  public:
    bool checkAlmostEquivalent(string word1, string word2) {
        array<int, 26> differences{};
        for (int index = 0; index < static_cast<int>(word1.size()); ++index) {
            ++differences[word1[index] - 'a'];
            --differences[word2[index] - 'a'];
        }
        return all_of(differences.begin(), differences.end(), [](int difference) { return abs(difference) <= 3; });
    }
};
