class Solution {
  public:
    long long modeWeight(vector<int> &nums, int k) {
        // cnt holds each value's frequency inside the window; bucket[f]
        // counts how many distinct values sit at frequency f, so the top
        // frequency tracks entries and exits in O(1). Heap entries are
        // (-frequency, value) pairs under a greater comparator, so the heap
        // top is the smallest value of the top frequency; stale entries
        // (their recorded frequency has since moved) are skimmed off when
        // they reach the top — every revisit of a state pushes a fresh
        // copy, so discarding them early is safe. Weights reach 10^10 and
        // the total 2.5 * 10^14, so the sum widens to long long.
        unordered_map<int, int> cnt;
        unordered_map<int, int> bucket;
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> heap;
        int topFreq = 0;
        long long total = 0;
        for (int right = 0; right < (int)nums.size(); ++right) {
            // Enter: lift the arriving value one frequency up.
            int entering = ++cnt[nums[right]];
            bucket[entering]++;
            if (entering > 1) {
                bucket[entering - 1]--;
            }
            topFreq = max(topFreq, entering);
            heap.push({-entering, nums[right]});
            if (right >= k) {
                // Leave: drop the exiting value one frequency down; only a
                // one-step fall of the top frequency is ever possible.
                int exiting = --cnt[nums[right - k]];
                bucket[exiting + 1]--;
                if (exiting > 0) {
                    bucket[exiting]++;
                    heap.push({-exiting, nums[right - k]});
                }
                if (bucket[topFreq] == 0) {
                    topFreq--;
                }
            }
            if (right >= k - 1) {
                // Skim stale tops, then score mode * top frequency.
                while (cnt[heap.top().second] != -heap.top().first) {
                    heap.pop();
                }
                total += (long long)heap.top().second * topFreq;
            }
        }
        return total;
    }
};
