class Solution {
  public:
    vector<int> exclusiveTime(int n, vector<string> &logs) {
        vector<int> res(n, 0);
        vector<int> stackFid;
        vector<int> stackResume;
        for (const string &log : logs) {
            size_t c1 = log.find(':');
            size_t c2 = log.find(':', c1 + 1);
            int fid = stoi(log.substr(0, c1));
            bool start = log[c1 + 1] == 's';
            int ts = stoi(log.substr(c2 + 1));
            if (start) {
                if (!stackFid.empty()) {
                    res[stackFid.back()] += ts - stackResume.back();
                }
                stackFid.push_back(fid);
                stackResume.push_back(ts);
            } else {
                res[stackFid.back()] += ts - stackResume.back() + 1;
                stackFid.pop_back();
                stackResume.pop_back();
                if (!stackFid.empty()) {
                    stackResume.back() = ts + 1;
                }
            }
        }
        return res;
    }
};
