class Solution {
  public:
    long long numberOfWeeks(vector<int> &milestones) {
        // Only the largest project can block the schedule: every milestone
        // of the other projects acts as a separator letting one extra
        // milestone of the largest project be placed without adjacency. If
        // rest (all other milestones) is at least mx - 1, every milestone
        // is schedulable (total weeks); otherwise the best is rest
        // separator-and-large pairs plus one final large milestone, i.e.
        // 2 * rest + 1 weeks.
        long long total = 0;
        int mx = 0;
        for (int m : milestones) {
            total += m;
            if (m > mx)
                mx = m;
        }
        long long rest = total - mx;
        return min(total, 2 * rest + 1);
    }
};
