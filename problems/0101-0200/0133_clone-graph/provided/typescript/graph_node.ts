// Problem-provided graph node (LC 133 contract). The judge's decoder
// builds nodes with new GraphNode(val) and adjacency through neighbors.
class GraphNode {
    val: number;
    neighbors: GraphNode[];
    constructor(val?: number, neighbors?: GraphNode[]) {
        this.val = val ?? 0;
        this.neighbors = neighbors ?? [];
    }
}
