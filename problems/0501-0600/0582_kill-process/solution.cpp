class Solution {
  public:
    vector<int> killProcess(vector<int> &pid, vector<int> &ppid, int kill) {
        // Killing a process kills its whole subtree, so group the processes
        // by parent — children of one parent keep pid-array order — and walk
        // down from kill. The queue doubles as the answer: every process
        // enters it in exactly the required breadth-first order, so each
        // dequeue is one more confirmed kill.
        int n = pid.size();
        unordered_map<int, vector<int>> children;
        for (int i = 0; i < n; ++i)
            children[ppid[i]].push_back(pid[i]);
        vector<int> killed;
        killed.reserve(n);
        killed.push_back(kill);
        for (int head = 0; head < (int)killed.size(); ++head) {
            auto kids = children.find(killed[head]);
            if (kids != children.end())
                killed.insert(killed.end(), kids->second.begin(), kids->second.end());
        }
        return killed;
    }
};
