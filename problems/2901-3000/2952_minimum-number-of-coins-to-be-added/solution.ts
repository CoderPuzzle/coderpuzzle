function minimumAddedCoins(coins: number[], target: number): number {
    const sorted = coins.slice().sort((a, b) => a - b);
    let reach = 0; // every value in [1, reach] is obtainable
    let added = 0;
    let i = 0;
    while (reach < target) {
        if (i < sorted.length && sorted[i] <= reach + 1) {
            reach += sorted[i];
            i++;
        } else {
            // must add the coin worth reach + 1
            reach += reach + 1;
            added++;
        }
    }
    return added;
}
