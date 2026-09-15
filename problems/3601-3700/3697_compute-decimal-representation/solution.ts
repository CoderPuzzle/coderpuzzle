function decimalRepresentation(n: number): number[] {
    // Each nonzero digit contributes exactly one base-10 component -- its
    // digit times the place it sits at -- and this count is optimal: adding
    // terms can only merge nonzero positions, never create them.
    const components: number[] = [];
    let rest = n;
    let place = 1;
    while (rest > 0) {
        const digit = rest % 10;
        if (digit > 0) {
            components.push(digit * place);
        }
        // Integer division only: Math.floor keeps the peel exact.
        rest = Math.floor(rest / 10);
        place *= 10;
    }
    // Peeled from the ones place up, so reverse into descending order.
    components.reverse();
    return components;
}
