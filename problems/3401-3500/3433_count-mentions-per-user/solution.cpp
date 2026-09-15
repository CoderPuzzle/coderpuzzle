class Solution {
  public:
    // Chronological sweep: order events by timestamp, offline events
    // ahead of messages at the same moment (a status change applies
    // before any message sharing its timestamp). Each user's return
    // time is the offline timestamp + 60; a message at time t sees the
    // user once that return time has passed.
    vector<int> countMentions(int numberOfUsers, vector<vector<string>> &events) {
        auto rank = [](const string &kind) { return kind == "OFFLINE" ? 0 : 1; };
        sort(events.begin(), events.end(), [&](const vector<string> &a, const vector<string> &b) {
            int ta = stoi(a[1]);
            int tb = stoi(b[1]);
            if (ta != tb) {
                return ta < tb;
            }
            return rank(a[0]) < rank(b[0]);
        });
        vector<int> mentions(numberOfUsers, 0);
        vector<int> backAt(numberOfUsers, 0);
        for (const auto &event : events) {
            int time = stoi(event[1]);
            if (event[0] == "OFFLINE") {
                backAt[stoi(event[2])] = time + 60;
                continue;
            }
            istringstream tokens(event[2]);
            string token;
            while (tokens >> token) {
                if (token == "ALL") {
                    for (int user = 0; user < numberOfUsers; user++) {
                        mentions[user]++;
                    }
                } else if (token == "HERE") {
                    for (int user = 0; user < numberOfUsers; user++) {
                        if (backAt[user] <= time) {
                            mentions[user]++;
                        }
                    }
                } else {
                    mentions[stoi(token.substr(2))]++;
                }
            }
        }
        return mentions;
    }
};
