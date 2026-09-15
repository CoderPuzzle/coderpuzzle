class Solution {
  public:
    long long minCost(vector<int> &basket1, vector<int> &basket2) {
        // A cost can only be balanced if its combined frequency across the
        // two baskets is even; an odd count makes equality impossible no
        // matter how fruits are swapped.
        unordered_map<int, long long> diff;
        for (int x : basket1)
            ++diff[x];
        for (int x : basket2)
            --diff[x];
        // Every |diff| / 2 surplus copies become relocation tickets. Real
        // swaps always pair one export with one import, so among all pooled
        // tickets only the cheapest half genuinely travels far. A ticket
        // costing more than twice the global minimum m is never paid
        // directly: shuttle m out and back around it and the same unit of
        // imbalance clears for a flat 2*m. At most n tickets pay at most
        // n * 2 * 10^9 <= 2*10^14, long-long-safe.
        vector<long long> tickets;
        for (auto &[value, delta] : diff) {
            if (delta % 2 != 0)
                return -1;
            long long magnitude = delta < 0 ? -delta : delta;
            for (long long k = 0; k < magnitude / 2; ++k)
                tickets.push_back(value);
        }
        long long smallest =
            min(*min_element(basket1.begin(), basket1.end()), *min_element(basket2.begin(), basket2.end()));
        sort(tickets.begin(), tickets.end());
        long long answer = 0;
        size_t half = tickets.size() / 2;
        for (size_t i = 0; i < half; ++i) {
            answer += min(tickets[i], 2 * smallest);
        }
        return answer;
    }
};
