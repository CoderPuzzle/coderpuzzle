class Solution {
  public:
    vector<string> findHighAccessEmployees(vector<vector<string>> &accessTimes) {
        // Bucket per employee; "HHMM" becomes 60 * HH + MM so the one-hour
        // rule is a plain integer span. After sorting a bucket, the employee
        // is high-access iff some three consecutive stamps span < 60: any
        // qualifying triple's earliest three members are consecutive, and a
        // consecutive triple under an hour is itself a witness.
        unordered_map<string, vector<int>> buckets;
        for (const auto &entry : accessTimes) {
            int minutes = 60 * stoi(entry[1].substr(0, 2)) + stoi(entry[1].substr(2));
            buckets[entry[0]].push_back(minutes);
        }
        vector<string> answer;
        for (auto &[name, minutes] : buckets) {
            sort(minutes.begin(), minutes.end());
            for (int k = 0; k + 2 < (int)minutes.size(); ++k) {
                if (minutes[k + 2] - minutes[k] < 60) {
                    answer.push_back(name);
                    break;
                }
            }
        }
        return answer;
    }
};
