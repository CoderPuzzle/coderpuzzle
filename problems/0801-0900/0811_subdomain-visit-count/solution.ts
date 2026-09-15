function subdomainVisits(cpdomains: string[]): string[] {
    // One pass: each entry fans its count out over every dot-suffix of
    // its domain — the domain itself and each subdomain cut at a dot.
    const counts = new Map<string, number>();
    for (const cpdomain of cpdomains) {
        const space = cpdomain.indexOf(" ");
        const rep = Number(cpdomain.slice(0, space));
        const domain = cpdomain.slice(space + 1);
        let from = 0;
        for (;;) {
            const subdomain = domain.slice(from);
            counts.set(subdomain, (counts.get(subdomain) || 0) + rep);
            const dot = domain.indexOf(".", from);
            if (dot === -1) {
                break;
            }
            from = dot + 1;
        }
    }
    // Pinned output order: ascending lexicographic by domain name — an
    // explicit comparator, never Map insertion order.
    const names = [...counts.keys()].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    return names.map((name) => `${counts.get(name)} ${name}`);
}
