class Solution {
  public:
    // Slides a fixed-length-k window holding a value->count map, so the map
    // size is always the current window's distinct count. Window sums reach
    // n * max(nums[i]) = 2 * 10^4 * 10^9 = 2 * 10^13, past int range, so
    // they accumulate in long long; no intermediate exceeds that, far below
    // the ~9.2 * 10^18 long long ceiling.
    long long maxSum(vector<int> &nums, int m, int k) {
        long long best = 0;
        unordered_map<int, int> freq;
        long long win_sum = 0;
        for (int right = 0; right < static_cast<int>(nums.size()); ++right) {
            ++freq[nums[right]];
            win_sum += nums[right];
            if (right >= k) {
                const int old = nums[right - k];
                if (--freq[old] == 0) {
                    freq.erase(old);
                }
                win_sum -= old;
            }
            if (right + 1 >= k && static_cast<int>(freq.size()) >= m && win_sum > best) {
                best = win_sum;
            }
        }
        return best;
    }
};
