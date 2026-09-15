class Solution {
  public:
    vector<int> recoverArray(vector<int> &nums) {
        vector<int> values = nums;
        sort(values.begin(), values.end());
        int targetLength = values.size() / 2;
        for (int candidateIndex = 1; candidateIndex < static_cast<int>(values.size()); candidateIndex++) {
            int difference = values[candidateIndex] - values[0];
            if (difference <= 0 || difference % 2 != 0) {
                continue;
            }

            unordered_map<int, int> counts;
            for (int value : values) {
                counts[value]++;
            }
            vector<int> recovered;
            recovered.reserve(targetLength);
            for (int lower : values) {
                if (counts[lower] == 0) {
                    continue;
                }
                int higher = lower + difference;
                if (counts[higher] == 0) {
                    break;
                }
                counts[lower]--;
                counts[higher]--;
                recovered.push_back(lower + difference / 2);
            }
            if (static_cast<int>(recovered.size()) == targetLength) {
                return recovered;
            }
        }
        return {};
    }
};
