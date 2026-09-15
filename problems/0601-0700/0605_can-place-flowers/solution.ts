function canPlaceFlowers(flowerbed: number[], n: number): boolean {
    // Greedy left-to-right scan: plant any empty plot whose previous
    // and next plots are both empty, reading a missing neighbor at
    // either end as empty. A plant never blocks more than it enables,
    // so the running count is the bed's true capacity.
    let count = 0;
    let prev = 0;
    for (let i = 0; i < flowerbed.length; i++) {
        const nxt = i + 1 < flowerbed.length ? flowerbed[i + 1] : 0;
        if (flowerbed[i] === 0 && prev === 0 && nxt === 0) {
            count++;
            prev = 1;
        } else {
            // prev carries the previous plot's effective value: 1 when a
            // flower was just planted there, otherwise the plot as read.
            prev = flowerbed[i];
        }
    }
    return count >= n;
}
