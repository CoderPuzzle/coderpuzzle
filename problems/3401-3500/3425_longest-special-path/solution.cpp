class Solution {
  public:
    vector<int> longestSpecialPath(vector<vector<int>> &edges, vector<int> &nums) {
        int n = (int)nums.size();
        vector<vector<pair<int, int>>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back({e[1], e[2]});
            adj[e[1]].push_back({e[0], e[2]});
        }

        struct Event {
            int u, par, depth;
            long long d;
            int is_exit;
        };

        long long best_len = 0;
        int best_nodes = 1; // a single node is always a valid special path
        vector<long long> dist_path;
        unordered_map<int, int> last; // value -> depth of last occurrence
        int start_depth = 0;
        vector<int> last_restore;
        vector<int> start_restore;

        // Events on an explicit stack.
        vector<Event> st;
        st.push_back({0, -1, 0, 0, 0});
        while (!st.empty()) {
            Event ev = st.back();
            st.pop_back();
            if (ev.is_exit) {
                dist_path.pop_back();
                int val = nums[ev.u];
                int prev_last = last_restore.back();
                last_restore.pop_back();
                if (prev_last >= 0) {
                    last[val] = prev_last;
                } else {
                    last.erase(val);
                }
                start_depth = start_restore.back();
                start_restore.pop_back();
                continue;
            }
            // Enter node u.
            int u = ev.u, par = ev.par, depth = ev.depth;
            long long d = ev.d;
            dist_path.push_back(d);
            int val = nums[u];
            auto it = last.find(val);
            int prev_last = it == last.end() ? -1 : it->second;
            last_restore.push_back(prev_last);
            start_restore.push_back(start_depth);
            if (prev_last >= start_depth) {
                start_depth = prev_last + 1;
            }
            last[val] = depth;
            long long length = d - dist_path[start_depth];
            int nodes = depth - start_depth + 1;
            if (length > best_len) {
                best_len = length;
                best_nodes = nodes;
            } else if (length == best_len && nodes < best_nodes) {
                best_nodes = nodes;
            }
            st.push_back({u, par, depth, d, 1});
            for (auto &[v, w] : adj[u]) {
                if (v != par) {
                    st.push_back({v, u, depth + 1, d + w, 0});
                }
            }
        }
        return {(int)best_len, best_nodes};
    }
};
