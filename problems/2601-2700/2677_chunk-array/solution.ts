// One fixed-stride walk: every chunk starts at a multiple of `size` and
// spans to the next boundary or the end of the array, whichever comes
// first — slice() hands over each window already copied, so the output
// never aliases the input. The stride loop terminates on arr.length, an
// empty input producing zero chunks for free.

function chunk(arr: any[], size: number): any[][] {
    const chunks: any[][] = [];
    for (let start = 0; start < arr.length; start += size) {
        chunks.push(arr.slice(start, start + size));
    }
    return chunks;
}

class Solution {
    run(chunkCase: ChunkCase): void {
        chunkCase.drive(chunk);
    }
}
