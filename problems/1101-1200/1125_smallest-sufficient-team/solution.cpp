class Solution {
  public:
    vector<int> smallestSufficientTeam(vector<string> &req_skills, vector<vector<string>> &people) {
        unordered_map<string, int> skill_index;
        for (int i = 0; i < (int)req_skills.size(); i++)
            skill_index[req_skills[i]] = i;

        int np = (int)people.size();
        // compress each person to the bitmask of skills they contribute
        vector<int> masks(np, 0);
        for (int i = 0; i < np; i++) {
            for (auto &skill : people[i])
                masks[i] |= 1 << skill_index[skill];
        }

        int full = (1 << (int)req_skills.size()) - 1;

        // Emulate an insertion-ordered dict: state -> team. The dp maps each
        // covered-skill mask to the smallest team achieving it, seeded empty.
        vector<int> order;           // states in insertion order
        vector<vector<int>> teams;   // team for each state in `order`
        unordered_map<int, int> pos; // state -> index into order/teams
        order.push_back(0);
        teams.push_back({});
        pos[0] = 0;

        // people are processed in index order, so every subset of people is
        // tried as a candidate team
        for (int i = 0; i < np; i++) {
            int snap = (int)order.size();
            // new_entries: insertion-ordered small map
            vector<int> neOrder;
            vector<vector<int>> neTeams;
            unordered_map<int, int> nePos;
            for (int s = 0; s < snap; s++) {
                int state = order[s];
                const vector<int> &team = teams[s];
                int newState = state | masks[i];
                vector<int> candidate = team;
                candidate.push_back(i);
                auto it = pos.find(newState);
                // keep the candidate only when it beats the recorded team
                bool accept = (it == pos.end()) || (int)teams[it->second].size() > (int)candidate.size();
                if (accept) {
                    auto it2 = nePos.find(newState);
                    bool accept2 = (it2 == nePos.end()) || (int)neTeams[it2->second].size() > (int)candidate.size();
                    if (accept2) {
                        if (it2 == nePos.end()) {
                            nePos[newState] = (int)neOrder.size();
                            neOrder.push_back(newState);
                            neTeams.push_back(candidate);
                        } else {
                            neTeams[it2->second] = candidate;
                        }
                    }
                }
            }
            for (int k = 0; k < (int)neOrder.size(); k++) {
                int ns = neOrder[k];
                auto it = pos.find(ns);
                if (it != pos.end()) {
                    teams[it->second] = neTeams[k];
                } else {
                    pos[ns] = (int)order.size();
                    order.push_back(ns);
                    teams.push_back(neTeams[k]);
                }
            }
        }

        // team covering every required skill, sorted for a deterministic order
        vector<int> res = teams[pos[full]];
        sort(res.begin(), res.end());
        return res;
    }
};
