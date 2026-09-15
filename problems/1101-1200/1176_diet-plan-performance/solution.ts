function dietPlanPerformance(calories: number[], k: number, lower: number, upper: number): number {
    let points = 0;
    // Sum the first window once; every later window shares k-1 days with
    // its predecessor.
    let window = 0;
    for (let i = 0; i < k; i++) {
        window += calories[i];
    }
    if (window < lower) {
        points--;
    } else if (window > upper) {
        points++;
    }
    for (let i2 = k; i2 < calories.length; i2++) {
        window += calories[i2] - calories[i2 - k];
        if (window < lower) {
            points--;
        } else if (window > upper) {
            points++;
        }
    }
    return points;
}
