class Solution {
  public:
    // Odd days bank their maximum, so the ceil(d/2) odd days claim the
    // top weights first; each even day then banks the second pizza of a
    // consecutive top pair. The total reaches 5e9, so it accumulates in
    // a long long.
    long long maxWeight(vector<int> &pizzas) {
        sort(pizzas.begin(), pizzas.end());
        int n = pizzas.size();
        int oddDays = (n / 4 + 1) / 2;
        long long total = 0;
        int top = n - 1;
        for (int i = 0; i < oddDays; i++) {
            total += pizzas[top];
            top--;
        }
        for (int i = 0; i < n / 4 - oddDays; i++) {
            top--;
            total += pizzas[top];
            top--;
        }
        return total;
    }
};
