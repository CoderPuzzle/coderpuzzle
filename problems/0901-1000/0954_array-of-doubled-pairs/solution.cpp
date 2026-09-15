class Solution {
  public:
    bool canReorderDoubled(vector<int> &arr) {
        // A pair is (x, 2x), so the value of smallest absolute value has no
        // choice: its half is smaller in magnitude and cannot be waiting for
        // it, so every copy must claim a double. Walk the distinct values in
        // ascending absolute value, carrying each value's unclaimed copies
        // forward as a demand on its double; a demand that outruns the
        // supply, or aims at a value the array never held, makes the
        // pairing impossible. Zero is its own double, so its count must be
        // even.
        unordered_map<int, int> count;
        for (int value : arr) {
            ++count[value];
        }
        vector<int> values;
        values.reserve(count.size());
        for (const auto &entry : count) {
            values.push_back(entry.first);
        }
        sort(values.begin(), values.end(), [](int a, int b) { return abs(a) < abs(b); });
        unordered_map<int, int> need;
        for (int value : values) {
            if (value == 0) {
                if (count[0] % 2 != 0) {
                    return false;
                }
                continue;
            }
            int demanded = need[value];
            if (demanded > count[value]) {
                return false;
            }
            int extra = count[value] - demanded;
            if (extra > 0 && count.find(2 * value) == count.end()) {
                return false;
            }
            need[2 * value] += extra;
        }
        return true;
    }
};
