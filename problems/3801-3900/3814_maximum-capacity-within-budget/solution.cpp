#include <algorithm>
#include <vector>

class Solution {
  public:
    int maxCapacity(vector<int> &costs, vector<int> &capacity, int budget) {
        // Costs and capacities are at most 1e5 and budget at most 2e5, so
        // every cost sum stays below budget and every capacity sum is at
        // most 2e5 — int carries them all. Sort the machines by cost with
        // capacities aligned; every affordable pair is then reachable from
        // its dearer machine with a prefix of cheaper partners, so a
        // prefix maximum of capacities answers "best partner" in constant
        // time per machine.
        int n = (int)costs.size();
        vector<pair<int, int>> machines(n);
        for (int i = 0; i < n; i++)
            machines[i] = {costs[i], capacity[i]};
        sort(machines.begin(), machines.end());
        vector<int> sortedCosts(n);
        vector<int> prefMax(n);
        int run = 0;
        for (int i = 0; i < n; i++) {
            sortedCosts[i] = machines[i].first;
            run = max(run, machines[i].second);
            prefMax[i] = run;
        }
        // The empty selection costs 0 < budget (budget >= 1), so 0 is
        // always achievable and the answer only improves from there.
        // Partners are read only from indices before i, so a machine can
        // never pair with itself while every pair is still counted from
        // its dearer end.
        int ans = 0;
        for (int i = 0; i < n; i++) {
            int cost = sortedCosts[i];
            int cap = machines[i].second;
            if (cost < budget)
                ans = max(ans, cap);
            // Largest j with sortedCosts[j] < budget - cost.
            int j = (int)(lower_bound(sortedCosts.begin(), sortedCosts.end(), budget - cost) - sortedCosts.begin()) - 1;
            int t = min(j, i - 1);
            if (t >= 0)
                ans = max(ans, cap + prefMax[t]);
        }
        return ans;
    }
};
