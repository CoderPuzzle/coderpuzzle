class Solution {
  public:
    int minMaxWaitingTime(vector<int> &demand, vector<int> &fuel) {
        // Level sweep over cars. A state packs (fuel0, fuel1, busy0, busy1)
        // -- remaining fuel and remaining busy time per dispenser, measured
        // from when the current car becomes allowed -- in base 51, mapped
        // to the smallest maximum waiting time achievable so far.
        const int B = 51;
        auto bestOf = [](const unordered_map<int, int> &m) {
            int ans = INT_MAX;
            for (const auto &[key, worst] : m) {
                ans = min(ans, worst);
            }
            return ans;
        };
        unordered_map<int, int> states;
        states[((fuel[0] * B + fuel[1]) * B) * B] = 0;
        for (int i = 0; i < (int)demand.size(); i++) {
            int d = demand[i];
            unordered_map<int, int> nxt;
            for (const auto &[key, worst] : states) {
                int f0 = key / (B * B * B);
                int f1 = (key / (B * B)) % B;
                int r0 = (key / B) % B;
                int r1 = key % B;
                auto relax = [&](int nk, int nv) {
                    auto it = nxt.find(nk);
                    if (it == nxt.end() || nv < it->second) {
                        nxt[nk] = nv;
                    }
                };
                if (f0 >= d) {
                    // Serve car i on dispenser 0; the other dispenser's
                    // clock runs down by r0 while it waits.
                    relax((((f0 - d) * B + f1) * B + d) * B + max(r1 - r0, 0), max(worst, r0));
                }
                if (f1 >= d) {
                    relax(((f0 * B + (f1 - d)) * B + max(r0 - r1, 0)) * B + d, max(worst, r1));
                }
            }
            if (nxt.empty()) {
                // The process terminates here and no car may be skipped,
                // so every live state has served exactly i cars.
                return i == 0 ? -1 : bestOf(states);
            }
            states = move(nxt);
        }
        return bestOf(states);
    }
};
