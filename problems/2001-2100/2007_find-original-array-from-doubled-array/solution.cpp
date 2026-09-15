class Solution {
  public:
    vector<int> findOriginalArray(vector<int> &changed) {
        if (changed.size() % 2 == 1) {
            return {};
        }

        sort(changed.begin(), changed.end());
        unordered_map<int, int> counts;
        for (int value : changed) {
            ++counts[value];
        }

        vector<int> original;
        original.reserve(changed.size() / 2);
        for (int value : changed) {
            if (counts[value] == 0) {
                continue;
            }
            --counts[value];
            int doubled = value * 2;
            if (counts[doubled] == 0) {
                return {};
            }
            --counts[doubled];
            original.push_back(value);
        }
        return original;
    }
};
