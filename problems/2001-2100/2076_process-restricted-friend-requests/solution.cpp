class Solution {
  public:
    vector<bool> friendRequests(int n, vector<vector<int>> &restrictions, vector<vector<int>> &requests) {
        vector<int> parent(n);
        vector<int> size(n, 1);
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }

        vector<bool> answer;
        answer.reserve(requests.size());
        for (const vector<int> &request : requests) {
            int rootU = find(parent, request[0]);
            int rootV = find(parent, request[1]);
            bool allowed = true;
            for (const vector<int> &restriction : restrictions) {
                int rootX = find(parent, restriction[0]);
                int rootY = find(parent, restriction[1]);
                if ((rootX == rootU && rootY == rootV) || (rootX == rootV && rootY == rootU)) {
                    allowed = false;
                    break;
                }
            }

            answer.push_back(allowed);
            if (allowed && rootU != rootV) {
                if (size[rootU] < size[rootV]) {
                    swap(rootU, rootV);
                }
                parent[rootV] = rootU;
                size[rootU] += size[rootV];
            }
        }
        return answer;
    }

  private:
    int find(vector<int> &parent, int node) {
        while (parent[node] != node) {
            parent[node] = parent[parent[node]];
            node = parent[node];
        }
        return node;
    }
};
