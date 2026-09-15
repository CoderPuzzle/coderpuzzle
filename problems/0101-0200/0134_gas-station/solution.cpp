class Solution {
  public:
    int canCompleteCircuit(vector<int> &gas, vector<int> &cost) {
        long long total = 0;
        long long tank = 0;
        int start = 0;
        for (int i = 0; i < (int)gas.size(); i++) {
            long long diff = (long long)gas[i] - cost[i];
            // total witnesses whether the whole circuit is feasible at all.
            total += diff;
            // tank is the running surplus measured from the candidate start.
            tank += diff;
            if (tank < 0) {
                // Restarting anywhere in [start, i] forfeits a non-negative
                // surplus, so an intermediate start reaches i with even less
                // fuel: the whole stretch is disqualified in one stroke.
                start = i + 1;
                tank = 0;
            }
        }
        // total >= 0 certifies the final candidate can finish the circuit.
        return total >= 0 ? start : -1;
    }
};
