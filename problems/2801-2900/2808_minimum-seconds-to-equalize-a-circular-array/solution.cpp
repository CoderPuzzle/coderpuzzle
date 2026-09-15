class Solution {
  public:
    int minimumSeconds(vector<int> &nums) {
        // Every circular gap is at most n <= 10^5 and the answer halves the
        // widest one, so all intermediates stay far inside int.
        unordered_map<int, int> first_seen;
        unordered_map<int, int> last_seen;
        unordered_map<int, int> max_forward_gap;
        for (int i = 0; i < (int)nums.size(); i++) {
            int num = nums[i];
            if (first_seen.count(num)) {
                max_forward_gap[num] = max(max_forward_gap[num], i - last_seen[num]);
            } else {
                first_seen[num] = i;
                max_forward_gap[num] = 0;
            }
            last_seen[num] = i;
        }
        int n = nums.size();
        int answer = n;
        for (auto &[num, start] : first_seen) {
            int gap = max(max_forward_gap[num], n - last_seen[num] + start);
            answer = min(answer, gap / 2);
        }
        return answer;
    }
};
