class Solution {
  public:
    int countRoutes(vector<int> &locations, int start, int finish, int fuel) {
        int n = locations.size();
        vector<vector<long long>> memo(n, vector<long long>(fuel + 1, -1));
        return (int)routesFrom(locations, finish, start, fuel, memo);
    }

  private:
    static constexpr long long MOD = 1'000'000'007;

    long long routesFrom(vector<int> &locations, int finish, int city, int remaining, vector<vector<long long>> &memo) {
        if (memo[city][remaining] != -1)
            return memo[city][remaining];
        // A route may stop here (only valid when this city is the destination)
        // or continue on to any other city that still leaves non-negative
        // fuel; both possibilities are counted.
        long long total = city == finish ? 1 : 0;
        for (int neighbor = 0; neighbor < (int)locations.size(); ++neighbor) {
            if (neighbor == city)
                continue;
            int cost = abs(locations[city] - locations[neighbor]);
            if (cost <= remaining)
                total += routesFrom(locations, finish, neighbor, remaining - cost, memo);
        }
        total %= MOD;
        memo[city][remaining] = total;
        return total;
    }
};
