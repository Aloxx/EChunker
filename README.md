# EChunker
A Faster Object storage for 2d browser games written in JavaScript

# How it can help?
It is very slow to store, use objects in Java-Script in large volumes, since Java-Script is a Single-Thread Language, for faster access to objects by mappings, I wrote the EChunker Library, this will help the code to work 50 times faster.


# Simple tutorial 
Creating chunkerInstance not that hard, just use **new EChunker();**

![image](https://user-images.githubusercontent.com/105514122/221362477-5c766705-8c16-485e-a78c-96b4575edb46.png)

EChunker is configurable , so you can use your configurations for different needs.

![image](https://user-images.githubusercontent.com/105514122/221362615-3e68abf2-09ca-4a66-8152-2374260e05df.png)


If you need to manually generate a chunk you can use chunkGenerator

![image](https://user-images.githubusercontent.com/105514122/221362665-486d875c-ccce-467e-a7e0-a8f0d189c351.png)

For getting any chunk you can use **getChunkAt(x,y, shouldUseDivision, generateIfNotExists)**

![image](https://user-images.githubusercontent.com/105514122/221362708-8a763255-0a25-42cd-931f-5230352d755c.png)

If you want update chunk with objects and move objects in just use chunk.moveObjects()

![image](https://user-images.githubusercontent.com/105514122/221362752-a64b93fd-bac4-4de8-86b1-ff11b6bfcf31.png)

Other methods for Chunk:

    chunk.insertObject(obj) <-- Inserts object into chunk , object should have x , y , id
    removeObject(id) <-- remove object from chunk
    getObject(id) <-- getting object in chunk by id
    getObjectAt(x,y) <-- getting first object from x , y coordinates


~ Other methods will be added in future
