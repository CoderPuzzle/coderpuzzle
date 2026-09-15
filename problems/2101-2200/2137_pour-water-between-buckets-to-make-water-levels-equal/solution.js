var equalizeWater = function (buckets, loss) {
    let low = 0;
    let high = 0;
    for (const water of buckets) {
        high = Math.max(high, water);
    }
    const retained = (100 - loss) / 100;
    for (let iteration = 0; iteration < 100; iteration++) {
        const middle = (low + high) / 2;
        let needed = 0;
        let available = 0;
        for (const water of buckets) {
            if (water < middle) {
                needed += middle - water;
            } else {
                available += water - middle;
            }
        }
        if (available * retained >= needed) {
            low = middle;
        } else {
            high = middle;
        }
    }
    return low;
};
