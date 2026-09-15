class Solution {
  public:
    vector<vector<string>> deleteDuplicateFolder(vector<vector<string>> &paths) {
        // trie nodes: children maps name -> node id; node 0 is the root
        vector<map<string, int>> children(1);
        for (auto &path : paths) {
            int node = 0;
            for (auto &name : path) {
                auto it = children[node].find(name);
                if (it == children[node].end()) {
                    int next = (int)children.size();
                    children.push_back(map<string, int>());
                    children[node].emplace(name, next);
                    node = next;
                } else {
                    node = it->second;
                }
            }
        }
        size_t total = children.size();

        // collect all nodes (parents always appear before their children)
        vector<int> nodes;
        nodes.reserve(total);
        vector<int> stack = {0};
        while (!stack.empty()) {
            int u = stack.back();
            stack.pop_back();
            nodes.push_back(u);
            for (auto &kv : children[u])
                stack.push_back(kv.second);
        }

        // assign subtree signature ids in post-order (children before parents)
        unordered_map<string, int> sigToId;
        unordered_map<int, int> sigCounts;
        vector<int> nodeSig(total, 0);
        for (int ni = (int)nodes.size() - 1; ni >= 0; ni--) {
            int node = nodes[ni];
            // map iterates in sorted key order already
            string key;
            for (auto &kv : children[node]) {
                key += kv.first;
                key += '\x01';
                key += to_string(nodeSig[kv.second]);
                key += '\x02';
            }
            int sid;
            auto found = sigToId.find(key);
            if (found == sigToId.end()) {
                sid = (int)sigToId.size();
                sigToId.emplace(key, sid);
            } else {
                sid = found->second;
            }
            nodeSig[node] = sid;
            sigCounts[sid]++;
        }

        vector<char> marked(total, 0);
        for (int node : nodes) {
            if (!children[node].empty() && sigCounts[nodeSig[node]] >= 2) {
                vector<int> markStack = {node};
                while (!markStack.empty()) {
                    int cur = markStack.back();
                    markStack.pop_back();
                    marked[cur] = 1;
                    for (auto &kv : children[cur])
                        markStack.push_back(kv.second);
                }
            }
        }

        vector<vector<string>> result;
        vector<pair<int, vector<string>>> collectStack;
        collectStack.push_back(make_pair(0, vector<string>()));
        while (!collectStack.empty()) {
            auto top = collectStack.back();
            collectStack.pop_back();
            for (auto &kv : children[top.first]) {
                if (marked[kv.second])
                    continue;
                vector<string> newPath = top.second;
                newPath.push_back(kv.first);
                result.push_back(newPath);
                collectStack.push_back(make_pair(kv.second, newPath));
            }
        }
        sort(result.begin(), result.end());
        return result;
    }
};
