class Solution {
  public:
    vector<string> validateCoupons(vector<string> &code, vector<string> &businessLine, vector<bool> &isActive) {
        // Category rank: electronics < grocery < pharmacy < restaurant.
        unordered_map<string, int> rank = {{"electronics", 0}, {"grocery", 1}, {"pharmacy", 2}, {"restaurant", 3}};
        vector<pair<int, string>> valid;
        for (int i = 0; i < (int)code.size(); ++i) {
            if (!isActive[i] || !rank.count(businessLine[i]))
                continue;
            if (!codeOk(code[i]))
                continue;
            valid.emplace_back(rank[businessLine[i]], code[i]);
        }
        // Sort by (category rank, code); the code tiebreak is plain
        // lexicographic string order.
        sort(valid.begin(), valid.end());
        vector<string> answer;
        answer.reserve(valid.size());
        for (auto &p : valid)
            answer.push_back(p.second);
        return answer;
    }

    bool codeOk(const string &name) {
        if (name.empty())
            return false;
        for (char c : name) {
            bool alnum = ('a' <= c && c <= 'z') || ('A' <= c && c <= 'Z') || ('0' <= c && c <= '9');
            if (!alnum && c != '_')
                return false;
        }
        return true;
    }
};
