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
        int best_nodes = 1;           // a single node is always a valid special path
        vector<long long> dist_path;  // prefix distances per depth
        unordered_map<int, int> last; // value -> depth of last occurrence
        // Window starts over the current root-to-node path: top keeps every
        // value distinct, second additionally tolerates one repeated value.
        int top = 0, second = 0;
        vector<int> last_restore;
        vector<int> top_restore;
        vector<int> second_restore;

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
                top = top_restore.back();
                top_restore.pop_back();
                second = second_restore.back();
                second_restore.pop_back();
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
            top_restore.push_back(top);
            second_restore.push_back(second);
            if (prev_last >= top) {
                // The repeat enters the all-distinct window: that window can
                // still serve as the one-repeat window.
                second = top;
                top = prev_last + 1;
            } else if (prev_last >= second) {
                second = prev_last + 1;
            }
            last[val] = depth;
            long long length = d - dist_path[second];
            int nodes = depth - second + 1;
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
