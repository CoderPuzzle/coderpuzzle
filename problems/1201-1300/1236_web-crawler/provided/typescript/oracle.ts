// Problem-provided oracle (HtmlParser), TypeScript side. Compiled with
// every submission by the judge; never editable in the editor.
// Constructed from the case state: the url library and the edge list
// (generic values) and the query budget.
class HtmlParser {
    private index: Map<string, number>;
    private links: string[][];
    private fetched: Set<string>;
    private budget: number;

    constructor(construction: any[], budget: any) {
        const names: string[] = construction[0].map((entry: any) => String(entry));
        this.index = new Map(names.map((name, i) => [name, i]));
        this.links = names.map(() => [] as string[]);
        for (const pair of construction[1]) {
            this.links[Number(pair[0])].push(names[Number(pair[1])]);
        }
        this.budget = Number(budget);
        this.fetched = new Set<string>();
    }

    // The crawl's observable effect: every page the crawler fetched.
    verdict(): string[] {
        return [...this.fetched].sort();
    }

    getUrls(url: string): string[] {
        if (this.budget <= 0) {
            throw new Error("HtmlParser query budget exhausted");
        }
        this.budget -= 1;
        this.fetched.add(url);
        const position = this.index.get(url);
        return position === undefined ? [] : this.links[position].slice();
    }
}
