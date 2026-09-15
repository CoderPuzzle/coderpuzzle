function miceAndCheese(reward1: number[], reward2: number[], k: number): number {
    // Start from the second mouse eating everything, then hand k cheeses to
    // the first mouse. Swapping cheese i changes the total by
    // reward1[i] - reward2[i], so the k swaps with the largest gains are
    // optimal — gains may be negative when forced, and taking the top k
    // regardless is exactly what "exactly k" demands.
    let total = 0;
    const gains = new Array<number>(reward1.length);
    for (let i = 0; i < reward1.length; i++) {
        total += reward2[i];
        gains[i] = reward1[i] - reward2[i];
    }
    gains.sort((a, b) => b - a);
    for (let i = 0; i < k; i++) total += gains[i];
    return total;
}
