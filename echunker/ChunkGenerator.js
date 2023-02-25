import { Chunk } from "./Chunk.js";

export class ChunkGenerator {
    constructor (echunker) {
        this.echunker = echunker;

    }
     /**
     * Generates simple chunk
     * @param {*} x x position 
     * @param {*} y y position
     */
    generate_chunk(x = null,y = null) {
        /**
         * We generate chunk at x if it no exists
         */
        if(x != null && !this.echunker.chunks[x]) this.echunker.chunks[x] = {};

        /**
         * We generate chunk at x[y] if it no exists
         */
        if(y != null && !this.echunker.chunks[x][y]) this.echunker.chunks[x][y] = new Chunk(this.echunker,x,y);
        
        /**
         * Then returns chunk
         */
        return this.echunker.chunks[x][y]
    }
}