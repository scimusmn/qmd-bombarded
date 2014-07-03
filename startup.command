#! /bin/bash

rm -r ~/Documents/chromeTemp
cp -r ~/Documents/chromeData ~/Documents/chromeTemp

open -a Google\ Chrome --args --kiosk --user-data-dir="/Users/admin/Documents/chromeTemp" "https://EngineeringStudio-03.local/pingPong"

killall -9 node

cd ~/Sites/pingPong
node nodeJS_serialToWS.js