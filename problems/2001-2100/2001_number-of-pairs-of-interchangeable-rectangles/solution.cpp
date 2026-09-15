class Solution {
  public:
    long long interchangeableRectangles(vector<vector<int>> &rectangles) {
        long long total = 0;
        unordered_map<long long, long long> counts;
        for (const auto &rectangle : rectangles) {
            int divisor = gcd(rectangle[0], rectangle[1]);
            long long key = (long long)(rectangle[0] / divisor) * 100001 + rectangle[1] / divisor;
            total += counts[key];
            counts[key]++;
        }
        return total;
    }
};
