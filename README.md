# Snappet X-mas programming challenge

Santa seems to have a bit of an issue. The elves that are charged with packing all gifts in Santa's sleigh are on strike! But Santa is not one to bow under pressure. He wrote a program to automatically pack the gift boxes into his many sleighs (hope you didn't think that everything would fit into one). However, he could use some help: his program approaches the bin packing problem in a very naive way.

## Your assignment
Create a better packing implementation. Try to pack as many packs as possible, using as little and small sleighs as possible. This implementation should be created in the file packer.js. You are not allowed to change any of the other files. You can, however, add as many new files as you like. It is allowed to use existing libraries. You may want to check out https://github.com/jakesgordon/bin-packing and https://en.wikipedia.org/wiki/Bin_packing_problem, but you don't have to.

It is not known in advance how many packs will have to be packed and how many sleighs will be available. The challenge comes with 2 small demo data sets, but these will not be used for scoring your submission. Your solution will be tested on a recent version of Chrome on Windows, Linux or OSX. You earn points for packing more/larger packs and using less/smaller sleighs. The fastest solution for each data set gets a bonus.

## Testing
To view the files in your browser, you can host the files in any web server. One way is using node.js:

    npm install http-server -g
    http-server

To see a short demo look at this YouTube video: https://www.youtube.com/watch?v=uMBi1Jj-rX0 The dummy algorithm in master can be seen in action here: https://rawgit.com/Teun/xmas2016/master/index.htm

## Point scoring
Multiple sets of bins and packets will be run. For each of these sets independently, points can be earned. The total score is the sum of points earned for all data sets. 
  1. A data set cannot earn you negative points
  2. A data set earns you nothing when the packing of one of the packets is illegal (partly outside the assigned bin, overlapping with another packet, etc.). 
  3. Each packet correctly packed scores you its surface in points (h x w)
  4. Bins used subtract 10 times their circumference from your points (2h + 2w)*10
  5. The fastest solution in each of the data sets earns 20% bonus points (for that set)
  6. If the highest number of points in a data set is above 1000, all points earned for that set are scaled down to make the highest score 1000. (this is to make all sets score more or less the same number of points)

## Submitting your solution
Create a pull request with your solution. You may push changes to your branch until 1 hour before the final demo (Monday January 9, 11:30 CET).

## Design
Yes, I know, it doesn't look very pretty. Yet. If you think you can make the page look nicer, feel free, tinker with it and submit a pull request. Of course, if you contribute to the design, you ARE allowed to touch more files than just packer.js.

## Prizes
There will be awesome prizes. 
