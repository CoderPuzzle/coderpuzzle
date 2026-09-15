class Solution {
  public:
    int minMeetingRooms(vector<vector<int>> &intervals) {
        if (intervals.empty())
            return 0;
        sort(intervals.begin(), intervals.end(),
             [](const vector<int> &a, const vector<int> &b) { return a[0] < b[0]; });
        priority_queue<int, vector<int>, greater<int>> heap; // end times of ongoing meetings
        for (const auto &interval : intervals) {
            int start = interval[0], end = interval[1];
            if (!heap.empty() && heap.top() <= start) {
                heap.pop();
                heap.push(end);
            } else {
                heap.push(end);
            }
        }
        return (int)heap.size();
    }
};
