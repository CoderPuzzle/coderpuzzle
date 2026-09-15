class Solution {
  public:
    int minSetSize(vector<int> &arr) {
        // A k-value set removes the sum of k frequencies; accumulate the
        // largest frequencies first until half the array is gone.
        unordered_map<int, int> counts;
        for (int value : arr) {
            ++counts[value];
        }
        vector<int> freqs;
        freqs.reserve(counts.size());
        for (const auto &[value, freq] : counts) {
            freqs.push_back(freq);
        }
        sort(freqs.begin(), freqs.end(), greater<int>());
        int need = ((int)arr.size() + 1) / 2;
        int removed = 0;
        for (int size = 1; size <= (int)freqs.size(); ++size) {
            removed += freqs[size - 1];
            if (removed >= need) {
                return size;
            }
        }
        return (int)freqs.size();
    }
};
