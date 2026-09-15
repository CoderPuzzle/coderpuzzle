class Solution {
  public:
    vector<int> corpFlightBookings(vector<vector<int>> &bookings, int n) {
        // difference array (n + 1 slots keeps the stamp at index last in
        // bounds when last == n): each booking costs two writes instead of
        // touching every flight in [first, last]
        vector<int> diff(n + 1, 0);
        for (const auto &b : bookings) {
            diff[b[0] - 1] += b[2];
            // -seats one slot past the range end, so flight `last` still
            // sees the seats and every later flight does not
            diff[b[1]] -= b[2];
        }
        // one prefix sum over the stamps: each +/- pair cancels exactly
        // beyond its range, so the running total is each flight's occupancy
        vector<int> answer;
        answer.reserve(n);
        int running = 0;
        for (int i = 0; i < n; i++) {
            running += diff[i];
            answer.push_back(running);
        }
        return answer;
    }
};
