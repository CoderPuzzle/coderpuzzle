class Solution {
  public:
    int countPoints(string rings) {
        array<int, 10> masks{};
        for (int index = 0; index < static_cast<int>(rings.size()); index += 2) {
            char color = rings[index];
            int bit = color == 'R' ? 1 : color == 'G' ? 2 : 4;
            masks[rings[index + 1] - '0'] |= bit;
        }
        return count(masks.begin(), masks.end(), 7);
    }
};
