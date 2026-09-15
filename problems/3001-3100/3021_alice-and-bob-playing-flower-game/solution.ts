function flowerGame(n: number, m: number): number {
    // Each turn removes exactly one flower, so a game started with x + y
    // flowers always lasts exactly x + y turns, and the mover of that
    // final turn empties the field and captures the opponent. Alice moves
    // on odd-numbered turns, so she wins exactly when x + y is odd.
    // Counting odd-sum pairs: odd x against even y plus even x against
    // odd y, where [1, k] holds ceil(k / 2) odds and floor(k / 2) evens.
    // Doubles hold the 5e9 maximum answer exactly.
    const oddN = Math.floor((n + 1) / 2);
    const evenN = Math.floor(n / 2);
    const oddM = Math.floor((m + 1) / 2);
    const evenM = Math.floor(m / 2);
    return oddN * evenM + evenN * oddM;
}
