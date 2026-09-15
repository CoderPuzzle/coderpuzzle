function badSensor(sensor1: number[], sensor2: number[]): number {
    // A defective readout agrees with the truth up to the dropped point
    // and then matches the truth shifted one place left, so each
    // candidacy is a single scan; when both scans succeed (or both fail),
    // the defect cannot be pinned on either sensor.
    const one = shifted(sensor1, sensor2);
    const two = shifted(sensor2, sensor1);
    if (one === two) return -1;
    return one ? 1 : 2;
}

function shifted(a: number[], b: number[]): boolean {
    let i = 0;
    while (i < a.length && a[i] === b[i]) i++;
    while (i < a.length - 1) {
        if (a[i] !== b[i + 1]) return false;
        i++;
    }
    return true;
}
