function countPoints(rings: string): number {
    const masks = new Array<number>(10).fill(0);
    const bits: Record<string, number> = { R: 1, G: 2, B: 4 };
    for (let index = 0; index < rings.length; index += 2) {
        masks[Number(rings[index + 1])] |= bits[rings[index]];
    }
    return masks.filter((mask) => mask === 7).length;
}
