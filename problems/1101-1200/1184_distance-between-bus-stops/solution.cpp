class Solution {
  public:
    int distanceBetweenBusStops(vector<int> &distance, int start, int destination) {
        // Order the stops: edge i leads from stop i to stop i+1, so the
        // clockwise arc between them uses exactly the entries in between.
        int lo = min(start, destination);
        int hi = max(start, destination);
        long long total = 0;
        long long clockwise = 0;
        for (int i = 0; i < (int)distance.size(); i++) {
            total += distance[i];
            if (i >= lo && i < hi) {
                clockwise += distance[i];
            }
        }
        long long other = total - clockwise;
        return (int)min(clockwise, other);
    }
};
