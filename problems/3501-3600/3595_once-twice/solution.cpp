class Solution {
  public:
    vector<int> onceTwice(vector<int> &nums) {
        // Exactly one value occurs once, one occurs twice, the rest thrice;
        // a frequency table over the distinct values finds the two specials.
        unordered_map<int, int> counts;
        for (int x : nums)
            counts[x]++;
        int once = 0, twice = 0;
        // First answer is the count-1 value, second the count-2 value.
        for (auto &kv : counts) {
            if (kv.second == 1)
                once = kv.first;
            else if (kv.second == 2)
                twice = kv.first;
        }
        return {once, twice};
    }
};
