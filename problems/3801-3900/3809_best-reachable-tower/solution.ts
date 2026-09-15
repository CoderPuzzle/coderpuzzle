function bestTower(towers: number[][], center: number[], radius: number): number[] {
    const [cx, cy] = center;
    let best: number[] | null = null;
    let bestQuality = -1;
    for (const [x, y, quality] of towers) {
        if (Math.abs(x - cx) + Math.abs(y - cy) > radius) {
            continue;
        }
        // Strictly better quality wins; on a quality tie the
        // lexicographically smaller coordinate wins.
        if (
            best === null ||
            quality > bestQuality ||
            (quality === bestQuality && (x < best[0] || (x === best[0] && y < best[1])))
        ) {
            best = [x, y];
            bestQuality = quality;
        }
    }
    return best !== null ? best : [-1, -1];
}
