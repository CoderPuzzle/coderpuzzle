function numWaterBottles(numBottles: number, numExchange: number): number {
    // Every bottle is drunk exactly once, whether it started full or was
    // obtained by trading in empties. Track how many empties are on hand
    // and repeatedly trade in as many full groups as possible.
    let drunk = numBottles;
    let empty = numBottles;
    while (empty >= numExchange) {
        const newFull = Math.floor(empty / numExchange);
        empty = (empty % numExchange) + newFull;
        drunk += newFull;
    }
    return drunk;
}
