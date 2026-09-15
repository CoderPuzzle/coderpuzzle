function addPoly(poly1: number[][], poly2: number[][]): number[][] {
    const result: number[][] = [];
    let i = 0;
    let j = 0;
    while (i < poly1.length && j < poly2.length) {
        const power1 = poly1[i][0];
        const power2 = poly2[j][0];
        if (power1 === power2) {
            const coefficient = poly1[i][1] + poly2[j][1];
            if (coefficient !== 0) {
                result.push([power1, coefficient]);
            }
            i++;
            j++;
        } else if (power1 > power2) {
            result.push(poly1[i]);
            i++;
        } else {
            result.push(poly2[j]);
            j++;
        }
    }
    while (i < poly1.length) {
        result.push(poly1[i]);
        i++;
    }
    while (j < poly2.length) {
        result.push(poly2[j]);
        j++;
    }
    return result;
}
