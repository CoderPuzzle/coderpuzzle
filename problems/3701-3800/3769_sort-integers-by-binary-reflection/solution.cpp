class Solution {
  public:
    vector<int> sortByReflection(vector<int> &nums) {
        // Reflect every value once — reverse its binary string and parse
        // it back, which drops any leading zeros the reversal produced —
        // then sort on the composite key (reflection, value) so ties break
        // by ascending original value regardless of sort stability.
        auto reflect = [](int value) {
            string bits = bitset<32>(value).to_string();
            bits = bits.substr(bits.find('1'));
            reverse(bits.begin(), bits.end());
            return stoll(bits, nullptr, 2);
        };
        vector<pair<long long, int>> keyed;
        keyed.reserve(nums.size());
        for (int value : nums) {
            keyed.emplace_back(reflect(value), value);
        }
        sort(keyed.begin(), keyed.end());
        vector<int> sorted;
        sorted.reserve(nums.size());
        for (auto &[reflection, value] : keyed) {
            sorted.push_back(value);
        }
        return sorted;
    }
};
