function minArrivalsToDiscard(arrivals: number[], w: number, m: number): number {
    // cnt holds how many kept arrivals of each type sit inside the current
    // w-day window; kept[i] records whether day i was kept, since a
    // discarded arrival never entered the counts and must not be
    // decremented when its day slides out of the window. Type keys are small
    // integers, exact in a Map.
    const cnt = new Map<number, number>();
    const kept: boolean[] = new Array(arrivals.length).fill(false);
    let discards = 0;
    for (let i = 0; i < arrivals.length; i++) {
        if (i >= w && kept[i - w]) {
            cnt.set(arrivals[i - w], cnt.get(arrivals[i - w])! - 1);
        }
        const count = cnt.get(arrivals[i]) ?? 0;
        if (count === m) {
            discards++;
        } else {
            kept[i] = true;
            cnt.set(arrivals[i], count + 1);
        }
    }
    return discards;
}
