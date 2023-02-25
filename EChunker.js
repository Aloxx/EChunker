import { Chunk } from "./echunker/Chunk.js";
import { ChunkGenerator } from "./echunker/ChunkGenerator.js";

export class EChunker {
    constructor (config = {}) {
        this.min_x = config.min_x ?? 0;
        this.max_x = config.max_x ?? 10000;
        
        this.min_y = config.min_y ?? 0;
        this.max_y = config.max_y ?? 10000;

        this.chunk_size = config.chunk_size ?? 100; // should be Integer only

        this.chunks = {};

        this.chunkGenerator = new ChunkGenerator(this);

    }

    /**
     * Generating whole map
     */
    generate_chunks() {

        /**
         * Looping through X
         */
        for(let x = this.min_x; x < this.max_x + this.chunk_size; x += this.chunk_size) {
              /**
              * Firstly we need to generate [x] part of object before adding an [y] part
              */
            this.chunks[x / this.chunk_size] = {};

            /**
             * Looping through Y
             */
            for(let y = this.min_y; y < this.max_y + this.chunk_size; y += this.chunk_size) {
                /**
                 * After [x] was generated we need to generate simple chunk with [x][y]
                 * And push it to chunkArea
                 */
                this.chunks[x / this.chunk_size][y / this.chunk_size] = new Chunk(this, x / this.chunk_size, y / this.chunk_size)
            }
        }
    }
    /**
     * 
     * @param {*} x x position 
     * @param {*} y y position
     * @param {*} shouldUseDivision should we divide x , y values to chunk-size values 
     * @param {*} generateIfNotExists should we generate if chunk not loaded
     * @returns 
     */
    getChunkAt(x,y, shouldUseDivision = true, generateIfNotExists = false) {
    
        /**
         * Just mappers for x , y
         */
        let x_ = x, y_ = y;

        /**
         * Divide given data
         */
        if(shouldUseDivision) {
            x_ = ~~(x_ / this.chunk_size);
            y_ = ~~(y_ / this.chunk_size);
        }
        
        /**
         * Getting mapped chunk
         */
        const chunkmapped = this.chunks[x];

        /**
         * Generating mapped chunk if it no exists
         */
        if(!chunkmapped && generateIfNotExists) 
            return this.chunkGenerator.generate_chunk(x_ , y_);;

        /**
         * Getting chunk if exists
         */
        const chunk = this.chunks[x][y];

        /**
         * If no chunk we just generate it
         */
        if(!chunk && generateIfNotExists) 
            return this.chunkGenerator.generate_chunk(x_ , y_);

        /**
         * An return of chunk.
         */
        return chunk;
    }

    /**
     * 
     * @param {Object} object Definetly write object to new chunk
     * @param {Chunk} oldChunk Depcreated
     */
    moveToChunk(object, oldChunk) {
        /**
         * Just mappers for x , y
         */
        
        let chunkX = object.x;
        let chunkY = object.y;

        /**
         * Divide given data
         */
        if(this.chunk_size > 1) {
            chunkX = ~~(chunkX / this.chunk_size);
            chunkY = ~~(chunkY / this.chunk_size)
        }

        /**
         * Reading chunk at chunkX , chunkY
         */
        const chunk = this.getChunkAt(chunkX , chunkY, false, true);
        
        /**
         * Adding chunkObject to new Chunk
         */
        chunk.insertObject(object);
    }
}


