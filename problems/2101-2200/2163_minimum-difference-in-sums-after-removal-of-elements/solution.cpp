class Solution {
  public:
    long long minimumDifference(vector<int> &nums) {
        int total = nums.size();
        int n = total / 3;

        // left_min[i] = sum of the n smallest values among nums[0..i] (valid when i >= n-1)
        vector<long long> leftMin(total, 0);
        priority_queue<long long> heap; // keeps the n smallest so far (max-heap)
        long long running = 0;
        for (int i = 0; i < total; i++) {
            long long value = nums[i];
            heap.push(value);
            running += value;
            if ((int)heap.size() > n) {
                running -= heap.top(); // drop the largest kept
                heap.pop();
            }
            if ((int)heap.size() == n) {
                leftMin[i] = running;
            }
        }

        // right_max[i] = sum of the n largest values among nums[i..] (valid when total - i >= n)
        vector<long long> rightMax(total, 0);
        priority_queue<long long, vector<long long>, greater<long long>> heap2; // keeps the n largest so far
        long long running2 = 0;
        for (int i = total - 1; i >= 0; i--) {
            long long value = nums[i];
            heap2.push(value);
            running2 += value;
            if ((int)heap2.size() > n) {
                running2 -= heap2.top(); // drop the smallest kept
                heap2.pop();
            }
            if ((int)heap2.size() == n) {
                rightMax[i] = running2;
            }
        }

        bool hasAnswer = false;
        long long answer = 0;
        for (int i = n - 1; i <= 2 * n - 1; i++) {
            long long candidate = leftMin[i] - rightMax[i + 1];
            if (!hasAnswer || candidate < answer) {
                answer = candidate;
                hasAnswer = true;
            }
        }
        return answer;
    }
};
