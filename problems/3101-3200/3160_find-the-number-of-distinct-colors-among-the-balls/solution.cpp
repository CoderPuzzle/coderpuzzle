class Solution {
  public:
    vector<int> queryResults(int limit, vector<vector<int>> &queries) {
        // Two maps carry the whole state: ball -> its current color, and
        // color -> how many balls currently wear it. A query is a pair of
        // counter bumps around a map lookup, and the size of the live-color
        // map answers the query without ever rescanning the balls.
        unordered_map<int, int> ballColor;
        unordered_map<int, int> colorCount;
        vector<int> result;
        result.reserve(queries.size());
        for (const vector<int> &query : queries) {
            int ball = query[0];
            int color = query[1];
            auto previous = ballColor.find(ball);
            if (previous != ballColor.end()) {
                int oldColor = previous->second;
                // The old color vanishes only when its last ball left.
                if (--colorCount[oldColor] == 0) {
                    colorCount.erase(oldColor);
                }
            }
            ++colorCount[color];
            ballColor[ball] = color;
            result.push_back(colorCount.size());
        }
        return result;
    }
};
