class Solution {
  public:
    int percentageLetter(string s, string letter) {
        // One pass counts the matches; multiplying before dividing keeps the
        // rounded-down percentage entirely in integer arithmetic.
        int count = 0;
        for (char character : s)
            if (character == letter[0])
                count++;
        return count * 100 / static_cast<int>(s.size());
    }
};
