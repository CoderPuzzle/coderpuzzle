class Solution {
  public:
    bool stoneGameIX(vector<int> &stones) {
        array<int, 3> counts{};
        for (int stone : stones)
            ++counts[stone % 3];

        if (counts[0] % 2 == 0)
            return counts[1] > 0 && counts[2] > 0;
        return abs(counts[1] - counts[2]) > 2;
    }
};
