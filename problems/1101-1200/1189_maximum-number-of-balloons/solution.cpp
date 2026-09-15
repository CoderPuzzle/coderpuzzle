class Solution {
  public:
    int maxNumberOfBalloons(string text) {
        int counts[26] = {0};
        for (char ch : text) {
            counts[ch - 'a']++;
        }
        // balloon needs b, a, n once and l, o twice; the scarcest letter
        // caps the whole word.
        return min(
            {counts['b' - 'a'], counts['a' - 'a'], counts['n' - 'a'], counts['l' - 'a'] / 2, counts['o' - 'a'] / 2});
    }
};
