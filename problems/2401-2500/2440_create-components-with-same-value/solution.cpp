class Solution {
  public:
    int componentValue(vector<int> &nums, vector<vector<int>> &edges) {
        int n = (int)nums.size();
        vector<vector<int>> adjacency(n);
        for (const auto &edge : edges) {
            adjacency[edge[0]].push_back(edge[1]);
            adjacency[edge[1]].push_back(edge[0]);
        }

        // iterative DFS from node 0: parents + a visitation order whose
        // reverse is a valid post-order
        vector<int> parent(n, -1);
        vector<int> order;
        order.reserve(n);
        vector<int> stack;
        stack.reserve(n);
        stack.push_back(0);
        while (!stack.empty()) {
            int node = stack.back();
            stack.pop_back();
            order.push_back(node);
            for (int nxt : adjacency[node]) {
                if (nxt != parent[node]) {
                    parent[nxt] = node;
                    stack.push_back(nxt);
                }
            }
        }

        // subtree sums: everything a node keeps after its own greedy cuts
        vector<int> sums = nums;
        int largest = *max_element(nums.begin(), nums.end());
        for (int i = n - 1; i >= 0; i--) {
            int node = order[i];
            if (parent[node] >= 0) {
                sums[parent[node]] += sums[node];
            }
        }

        int total = sums[0];
        vector<int> counts;
        for (int divisor = 1; (long long)divisor * divisor <= total; divisor++) {
            if (total % divisor == 0) {
                counts.push_back(divisor);
                if (divisor != total / divisor) {
                    counts.push_back(total / divisor);
                }
            }
        }
        sort(counts.begin(), counts.end(), greater<int>());
        for (int k : counts) {
            int value = total / k;
            if (value < largest) {
                continue;
            }
            int components = 0;
            for (int s : sums) {
                if (s % value == 0) {
                    components++;
                }
            }
            if (components == k) {
                return k - 1;
            }
        }
        return 0;
    }
};
