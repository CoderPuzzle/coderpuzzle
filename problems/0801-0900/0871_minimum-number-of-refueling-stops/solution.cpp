class Solution {
  public:
    int minRefuelStops(int target, int startFuel, vector<vector<int>> &stations) {
        long long fuel = startFuel;
        priority_queue<long long> available; // max-heap of fuels at stations passed
        int stops = 0;
        size_t i = 0;
        size_t n = stations.size();
        while (true) {
            if (fuel >= target) {
                return stops;
            }
            while (i < n && stations[i][0] <= fuel) {
                available.push(stations[i][1]);
                i++;
            }
            if (available.empty()) {
                return -1;
            }
            fuel += available.top();
            available.pop();
            stops++;
        }
    }
};
