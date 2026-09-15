class Solution {
  public:
    // Sweep indices left to right with the queries sorted by start; a
    // max-heap by right endpoint holds the queries covering the current
    // index. Whenever the running coverage of already selected queries
    // falls short of nums[i], select the query reaching farthest right
    // and retire its coverage one step past r via a difference array.
    // Return -1 when the heap runs dry on a deficit.
    int maxRemoval(vector<int> &nums, vector<vector<int>> &queries) {
        sort(queries.begin(), queries.end(), [](const vector<int> &a, const vector<int> &b) { return a[0] < b[0]; });
        priority_queue<int> heap;
        vector<int> delta(nums.size() + 1, 0);
        int cover = 0;
        int selected = 0;
        int j = 0;
        for (int i = 0; i < (int)nums.size(); i++) {
            cover += delta[i];
            while (j < (int)queries.size() && queries[j][0] <= i) {
                heap.push(queries[j][1]);
                j++;
            }
            while (cover < nums[i]) {
                while (!heap.empty() && heap.top() < i) {
                    heap.pop();
                }
                if (heap.empty()) {
                    return -1;
                }
                int r = heap.top();
                heap.pop();
                cover++;
                delta[r + 1]--;
                selected++;
            }
        }
        return (int)queries.size() - selected;
    }
};
