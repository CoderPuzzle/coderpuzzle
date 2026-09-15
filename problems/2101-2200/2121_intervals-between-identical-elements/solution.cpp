class Solution {
  public:
    vector<long long> getDistances(vector<int> &arr) {
        vector<long long> answer(arr.size());
        unordered_map<int, long long> counts;
        unordered_map<int, long long> sums;
        for (int index = 0; index < static_cast<int>(arr.size()); ++index) {
            answer[index] += static_cast<long long>(index) * counts[arr[index]] - sums[arr[index]];
            ++counts[arr[index]];
            sums[arr[index]] += index;
        }
        counts.clear();
        sums.clear();
        for (int index = static_cast<int>(arr.size()) - 1; index >= 0; --index) {
            answer[index] += sums[arr[index]] - static_cast<long long>(index) * counts[arr[index]];
            ++counts[arr[index]];
            sums[arr[index]] += index;
        }
        return answer;
    }
};
