class Solution {
  public:
    vector<long long> mostFrequentIDs(vector<int> &nums, vector<int> &freq) {
        // Only one ID's count moves per step, so a lazy max-heap of (count,
        // id) snapshots answers "most frequent" without ever hunting down
        // the previous snapshot: push the touched ID's new count, then pop
        // entries whose count no longer matches the live table. A count can
        // reach 10^5 * 10^5 = 10^10, beyond int, so counts and entries are
        // long longs.
        int n = nums.size();
        vector<long long> counts(100001, 0);
        priority_queue<pair<long long, int>> heap;
        vector<long long> answer;
        answer.reserve(n);
        for (int i = 0; i < n; i++) {
            int ident = nums[i];
            counts[ident] += freq[i];
            heap.push({counts[ident], ident});
            while (heap.top().first != counts[heap.top().second]) {
                heap.pop();
            }
            answer.push_back(heap.top().first);
        }
        return answer;
    }
};
