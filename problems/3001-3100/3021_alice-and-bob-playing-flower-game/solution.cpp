class Solution {
  public:
    long long flowerGame(int n, int m) {
        // Each turn removes exactly one flower, so a game started with
        // x + y flowers always lasts exactly x + y turns, and the mover of
        // that final turn empties the field and captures the opponent.
        // Alice moves on odd-numbered turns, so she wins exactly when
        // x + y is odd. Counting odd-sum pairs: odd x against even y plus
        // even x against odd y, where [1, k] holds ceil(k / 2) odds and
        // floor(k / 2) evens. Widen to 64 bits before multiplying: the
        // answer reaches 5e9 at the bounds, past what an int can hold.
        long long oddN = (n + 1) / 2;
        long long evenN = n / 2;
        long long oddM = (m + 1) / 2;
        long long evenM = m / 2;
        return oddN * evenM + evenN * oddM;
    }
};
