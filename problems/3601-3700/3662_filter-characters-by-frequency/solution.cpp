class Solution {
  public:
    string filterCharacters(string s, int k) {
        // Tally every occurrence into a fixed 26-slot table; the
        // lowercase-only input makes each index a plain offset from 'a'.
        array<int, 26> counts{};
        for (char ch : s) {
            counts[ch - 'a']++;
        }
        // Scan left to right, keeping exactly the characters whose total
        // count is strictly below the threshold; original order falls out
        // of the scan for free.
        string result;
        for (char ch : s) {
            if (counts[ch - 'a'] < k) {
                result += ch;
            }
        }
        return result;
    }
};
