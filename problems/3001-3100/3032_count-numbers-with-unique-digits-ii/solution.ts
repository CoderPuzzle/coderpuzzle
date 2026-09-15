function numberCount(a: number, b: number): number {
    const hasUniqueDigits = (value: number): boolean => {
        let seen = 0;
        while (value > 0) {
            const bit = 1 << (value % 10);
            if ((seen & bit) !== 0) {
                return false;
            }
            seen |= bit;
            value = Math.floor(value / 10);
        }
        return true;
    };
    let count = 0;
    for (let value = a; value <= b; value++) {
        if (hasUniqueDigits(value)) {
            count++;
        }
    }
    return count;
}
