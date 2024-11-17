# parkingDrop

An way to take images turn it into bricks

then rearrange bricks according to fisher yates algorithm

but I used the pixel array in order to try and get a performance improvement

Friday April 19.

found and fixed a bug.

Tiles were being repeated. I only noticed after uploading a face

and there were two tiles with a nose

the problem was the board[] array was not being cleared when a new image

was loaded, so mappings to indexes were being repeated

I fixed the bug by clearing the array each time a new image is loaded
