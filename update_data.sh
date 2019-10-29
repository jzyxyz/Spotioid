cp -r /Users/zhongyuanjin/Sourcecode/SpotifyLens/data/country .
mv data old_data/data`date +%m-%d-%Y`
mv country data
node indexer.js
