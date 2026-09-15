#include <unordered_map>
#include <vector>

using namespace std;

class Solution {
  public:
    int minLength(vector<int> &nums, int k) {
        // One pass, right end expanding: freq counts each value inside the
        // window and distinctSum tracks the sum of the distinct values
        // present — a value joins the sum when its first copy enters and
        // leaves it when its last copy departs.
        unordered_map<int, int> freq;
        long long distinctSum = 0;
        long long best = -1;
        int left = 0;
        for (int right = 0; right < (int)nums.size(); right++) {
            if (++freq[nums[right]] == 1) {
                distinctSum += nums[right];
            }
            // Shrink from the left while the window stays qualified; every
            // prefix of a kept window is dropped only after recording it.
            while (distinctSum >= k && left <= right) {
                int length = right - left + 1;
                if (best == -1 || length < best) {
                    best = length;
                }
                int out = nums[left];
                if (freq[out] == 1) {
                    distinctSum -= out;
                }
                freq[out]--;
                left++;
            }
        }
        return (int)best;
    }
};
