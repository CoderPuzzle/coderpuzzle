class ATM {
  public:
    static constexpr long long DENOMS[5] = {20, 50, 100, 200, 500};

    ATM() : counts(5, 0) {}

    void deposit(vector<long long> banknotesCount) {
        for (int i = 0; i < 5; i++) {
            counts[i] += banknotesCount[i];
        }
    }

    vector<long long> withdraw(long long amount) {
        vector<long long> taken(5, 0);
        long long remaining = amount;
        for (int i = 4; i >= 0; i--) {
            long long take = min(counts[i], remaining / DENOMS[i]);
            taken[i] = take;
            remaining -= take * DENOMS[i];
        }
        if (remaining != 0) {
            return {-1};
        }
        for (int i = 0; i < 5; i++) {
            counts[i] -= taken[i];
        }
        return taken;
    }

  private:
    vector<long long> counts;
};
