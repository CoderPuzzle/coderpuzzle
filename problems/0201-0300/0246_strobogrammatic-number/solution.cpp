class Solution {
  public:
    bool isStrobogrammatic(string num) {
        // A 180-degree turn reverses digit order and rotates each digit, and
        // only 0, 1, 8 (to themselves) and 6, 9 (to each other) survive it.
        unordered_map<char, char> rotated = {{'0', '0'}, {'1', '1'}, {'8', '8'}, {'6', '9'}, {'9', '6'}};
        int left = 0, right = num.size() - 1;
        while (left <= right) {
            // Each digit must be the rotation of the digit standing opposite.
            auto turn = rotated.find(num[left]);
            if (turn == rotated.end() || turn->second != num[right])
                return false;
            ++left;
            --right;
        }
        return true;
    }
};
