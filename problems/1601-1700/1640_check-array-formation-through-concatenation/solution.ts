function canFormArray(arr: number[], pieces: number[][]): boolean {
    // Every value across pieces is distinct, so a piece is uniquely
    // identified by its first element. Map that value to the piece,
    // then walk arr and match pieces to consecutive slices.
    const first = new Map<number, number[]>();
    for (const piece of pieces) first.set(piece[0], piece);

    let index = 0;
    while (index < arr.length) {
        const piece = first.get(arr[index]);
        if (!piece || index + piece.length > arr.length) return false;
        for (let offset = 0; offset < piece.length; offset++) {
            if (arr[index + offset] !== piece[offset]) return false;
        }
        index += piece.length;
    }
    return true;
}
