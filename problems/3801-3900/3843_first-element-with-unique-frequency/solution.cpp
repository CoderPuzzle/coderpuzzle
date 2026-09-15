class Solution {
  public:
    int firstUniqueFreq(vector<int> &nums) {
        // Values, frequencies, and counts of frequencies are all at most
        // 10^5, so int arithmetic carries everything without overflow.
        unordered_map<int, int> freq;
        for (int x : nums) {
            freq[x]++;
        }
        // freqCount maps each frequency to how many distinct values share
        // it; a value's frequency is unique exactly when that count is 1.
        unordered_map<int, int> freqCount;
        for (auto &[value, f] : freq) {
            freqCount[f]++;
        }
        // Scan in index order: the first element whose value has a unique
        // frequency wins, even if a "smaller" qualifying value appears later.
        for (int x : nums) {
            if (freqCount[freq[x]] == 1) {
                return x;
            }
        }
        return -1;
    }
};
