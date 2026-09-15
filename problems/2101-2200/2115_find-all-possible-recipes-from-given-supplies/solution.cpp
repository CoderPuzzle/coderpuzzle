class Solution {
  public:
    vector<string> findAllRecipes(vector<string> &recipes, vector<vector<string>> &ingredients,
                                  vector<string> &supplies) {
        unordered_set<string> have(supplies.begin(), supplies.end());
        unordered_map<string, int> index;
        for (int i = 0; i < (int)recipes.size(); i++) {
            index[recipes[i]] = i;
        }
        int n = recipes.size();
        vector<vector<int>> dependents(n);
        vector<int> indegree(n, 0);
        vector<bool> impossible(n, false);
        for (int i = 0; i < n; i++) {
            unordered_set<int> seen;
            for (const string &item : ingredients[i]) {
                // An initial supply satisfies the requirement outright.
                if (have.count(item)) {
                    continue;
                }
                auto it = index.find(item);
                if (it == index.end()) {
                    // Neither supply nor recipe: never makeable.
                    impossible[i] = true;
                } else if (seen.insert(it->second).second) {
                    // seen dedupes repeated ingredients so the indegree
                    // counts each recipe dependency once.
                    indegree[i]++;
                    dependents[it->second].push_back(i);
                }
            }
        }

        // Kahn's algorithm: recipes needing nothing beyond the supplies start
        // made; cycles never reach indegree zero and drop out automatically.
        vector<int> queue;
        for (int i = 0; i < n; i++) {
            if (indegree[i] == 0 && !impossible[i]) {
                queue.push_back(i);
            }
        }
        vector<string> made;
        for (size_t head = 0; head < queue.size(); head++) {
            int i = queue[head];
            made.push_back(recipes[i]);
            for (int j : dependents[i]) {
                // Skip impossible recipes so their failure never blocks or
                // corrupts the rest.
                if (impossible[j]) {
                    continue;
                }
                if (--indegree[j] == 0) {
                    queue.push_back(j);
                }
            }
        }
        sort(made.begin(), made.end());
        return made;
    }
};
