class Solution {
  public:
    vector<int> platesBetweenCandles(string s, vector<vector<int>> &queries) {
        int length = static_cast<int>(s.size());
        vector<int> platePrefix(length + 1, 0);
        vector<int> leftNearest(length, -1);
        int nearest = -1;
        for (int index = 0; index < length; ++index) {
            platePrefix[index + 1] = platePrefix[index] + (s[index] == '*' ? 1 : 0);
            if (s[index] == '|')
                nearest = index;
            leftNearest[index] = nearest;
        }

        vector<int> rightNearest(length, -1);
        nearest = -1;
        for (int index = length - 1; index >= 0; --index) {
            if (s[index] == '|')
                nearest = index;
            rightNearest[index] = nearest;
        }

        vector<int> answer;
        answer.reserve(queries.size());
        for (const auto &query : queries) {
            int leftCandle = rightNearest[query[0]];
            int rightCandle = leftNearest[query[1]];
            if (leftCandle != -1 && rightCandle != -1 && leftCandle < rightCandle)
                answer.push_back(platePrefix[rightCandle] - platePrefix[leftCandle]);
            else
                answer.push_back(0);
        }
        return answer;
    }
};
