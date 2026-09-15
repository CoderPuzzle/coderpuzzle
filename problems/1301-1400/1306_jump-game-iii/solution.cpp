class Solution {
  public:
    bool canReach(vector<int> &arr, int start) {
        // BFS over indexes: from i, the only successors are i +/- arr[i]. Each
        // index is visited once, so cycles cannot loop forever and a chain of
        // 5*10^4 indexes never touches the recursion stack.
        int n = (int)arr.size();
        vector<bool> visited(n, false);
        queue<int> pending;
        pending.push(start);
        visited[start] = true;
        while (!pending.empty()) {
            int i = pending.front();
            pending.pop();
            if (arr[i] == 0) {
                return true;
            }
            int next = i + arr[i];
            if (next >= 0 && next < n && !visited[next]) {
                visited[next] = true;
                pending.push(next);
            }
            next = i - arr[i];
            if (next >= 0 && next < n && !visited[next]) {
                visited[next] = true;
                pending.push(next);
            }
        }
        return false;
    }
};
