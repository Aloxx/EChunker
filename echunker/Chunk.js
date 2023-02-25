import { ErrorType } from "./Errors.js";

export class Chunk {
    constructor (echunker, x , y) {
        this.echunker = echunker;

        this.objectsIn = [];

        this.x = x;
        this.y = y;
        this.gridSize = this.echunker.chunk_size;
    }
    insertObject (obj) {
        /**
         * If given argument is not object we throw error
         */
        if(typeof obj != 'object')
            return SyntaxError(ErrorType.EPOOL_NON_OBJECT)

        /**
         * If object not contains required data we throw error
         */
        if(obj['x'] == null || obj['y'] == null || obj['id'] == null) 
            return ReferenceError(ErrorType.EPOOL_PARAMS);

        /**
         * Getting object from chunk to test if it exists
         */
        const ifExists = this.getObject(obj.id);
        
        /**
         * Throwing if exists
         */
        if(ifExists) 
            return SyntaxError(ErrorType.EPOOL_EXISTS);

        /**
         * Adding object to chunk
         */
        this.objectsIn.push(obj);
    }
    moveObjects() {
        /**
         * Mult x , y to grid size as need to do
         */
        let x = this.x * this.gridSize;
        let y = this.y * this.gridSize;

        /**
         * Looping through chunk
         */
        for(let i = 0; i < this.objectsIn.length; i++) {
            const entity = this.objectsIn[i];

            if(!(entity.x >= x && entity.x <= x + this.gridSize  && entity.y >= y && entity.y <= y + this.gridSize)) {
                /**
                 * If object is not inside given area we move it to new chunk ^
                 */
                this.echunker.moveToChunk(entity, this);
                this.removeObject(entity.id);
            }
        }
    }
    /**
     * Removing ChunkObject by Id
     */
    removeObject(id) {
        const newList = this.objectsIn.filter(o => o.id != id);
        this.objectsIn = newList;
    }
    /**
     * Getting ChunkObject by Id
     */
    getObject (id) {
        return this.objectsIn.find(eo => eo.id == id);
    }
 }