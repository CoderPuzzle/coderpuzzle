class Solution {
  public:
    int maxEvents(vector<vector<int>> &events) {
        // Day sweep over events sorted by start day; a min-heap of end days
        // holds the events available today.
        sort(events.begin(), events.end());
        int n = events.size();
        int i = 0;
        int day = 1;
        int attended = 0;
        priority_queue<int, vector<int>, greater<int>> openEnds;
        while (i < n || !openEnds.empty()) {
            // Heap empty: skip idle days by jumping the clock straight to
            // the next event's start day.
            if (openEnds.empty()) {
                day = max(day, events[i][0]);
            }
            // Every event that has started becomes available today.
            while (i < n && events[i][0] <= day) {
                openEnds.push(events[i][1]);
                i++;
            }
            // Discard events whose end day already passed — lost regardless.
            while (!openEnds.empty() && openEnds.top() < day) {
                openEnds.pop();
            }
            // Attend the soonest-ending (most perishable) event; an exchange
            // argument shows swapping it in never breaks feasibility.
            if (!openEnds.empty()) {
                openEnds.pop();
                attended++;
            }
            day++;
        }
        return attended;
    }
};
