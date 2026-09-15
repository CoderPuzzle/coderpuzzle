class Solution {
  public:
    int carFleet(int target, vector<int> &position, vector<int> &speed) {
        int n = position.size();
        // Cars cannot pass each other, so sweep from the car nearest
        // the target backward.
        vector<int> idx(n);
        iota(idx.begin(), idx.end(), 0);
        sort(idx.begin(), idx.end(), [&](int a, int b) {
            if (position[a] != position[b]) {
                return position[a] > position[b];
            }
            return speed[a] > speed[b];
        });
        int fleets = 0;
        double lastTime = 0.0;
        for (int i : idx) {
            // A car's fate is its alone-time to the target.
            double time = (double)(target - position[i]) / speed[i];
            // Strictly later never catches the fleet ahead: a new
            // fleet lead. Otherwise it merges (equality at the target
            // merges), and lastTime — the current fleet's arrival
            // time — stays put.
            if (time > lastTime) {
                fleets++;
                lastTime = time;
            }
        }
        return fleets;
    }
};
