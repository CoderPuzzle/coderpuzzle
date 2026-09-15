function findRadius(houses: number[], heaters: number[]): number {
    // Only the heaters need order: each house binds to its nearest one.
    // Numeric comparator — the default sort would order as strings.
    heaters.sort((a, b) => a - b);
    let radius = 0;
    for (const house of houses) {
        // Binary search for the first heater at or right of the house; the
        // nearest heater is it, or the one just before.
        let low = 0;
        let high = heaters.length;
        while (low < high) {
            const mid = (low + high) >> 1;
            if (heaters[mid] < house) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        let nearest: number;
        if (low === 0) {
            nearest = heaters[0] - house;
        } else if (low === heaters.length) {
            nearest = house - heaters[low - 1];
        } else {
            nearest = Math.min(house - heaters[low - 1], heaters[low] - house);
        }
        radius = Math.max(radius, nearest);
    }
    return radius;
}
