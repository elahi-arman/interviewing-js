import { Heap } from "./heap";
import { Tree } from "./tree";

export type ID = number;

export interface Edge<> {
  source: ID;
  target: ID;
  weight: number;
}

export interface Vertex {
  edges: Edge[];
}

export class Graph {
  vertices: Record<ID, Vertex> = {};

  addVertex = (v: ID) => {
    if (!this.vertices[v]) {
      this.vertices[v] = {
        edges: [],
      };
    }
  };

  addEdge = (source: ID, target: ID, weight: number) => {
    this.addVertex(source);
    this.addVertex(target);

    this.vertices[source].edges.push({ source, target, weight });
  };

  bfs = (start: ID, cb: (edge: Edge) => void) => {
    if (!this.vertices[start]) {
      return -1;
    }

    for (const v of Object.values(this.vertices)) {
      console.log(v.edges);
    }

    const queue = [start];
    const visited = new Set<ID>();
    for (
      let vertex = queue.shift();
      vertex !== undefined;
      vertex = queue.shift()
    ) {
      visited.add(vertex);
      const edges = this.vertices[vertex].edges;
      for (const e of edges) {
        if (!visited.has(e.target)) {
          cb(e);
          queue.push(e.target);
        }
      }
    }
  };

  mst = (start: ID): Array<Edge> => {
    if (!this.vertices[start]) {
      throw new Error("Vertex doesn't exist");
    }

    const h = new Heap((a: Edge, b: Edge) => a.weight < b.weight);
    for (const e of this.vertices[start].edges) {
      h.insert(e);
    }

    const cumulativeSourceWeights: Record<ID, number> = {
      [start]: 0,
    };

    const minimalEdges: Array<Edge> = [];
    const visited = new Set<ID>([start]);

    while (h.size() > 0) {
      let e = h.pop();
      if (e === undefined) {
        break;
      }

      minimalEdges.push(e);
      cumulativeSourceWeights[e.target] =
        cumulativeSourceWeights[e.source] + e.weight;
      visited.add(e.target);

      for (const targetsEdge of this.vertices[e.target].edges) {
        if (!visited.has(targetsEdge.target)) {
          h.insert({
            ...targetsEdge,
            weight: targetsEdge.weight + cumulativeSourceWeights[e.target],
          });
        }
      }
    }

    return minimalEdges;
  };
}
