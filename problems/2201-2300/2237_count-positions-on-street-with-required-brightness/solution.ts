function meetRequirement(n: number, lights: number[][], requirement: number[]): number {
    const delta = new Array<number>(n + 1).fill(0);
    for (const [position, range] of lights) {
        delta[Math.max(0, position - range)]++;
        delta[Math.min(n, position + range + 1)]--;
    }
    let brightness = 0;
    let count = 0;
    for (let i = 0; i < n; i++) {
        brightness += delta[i];
        if (brightness >= requirement[i]) {
            count++;
        }
    }
    return count;
}
