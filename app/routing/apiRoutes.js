var friendsData = require("../data/friends.js");


module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        return res.json(friendsData);
    });

    app.post("/api/friends", function(req, res) {
        friendsData.push(req.body);

        // pseudo code for finding the best match

        // score total for the newewst entry
        var newScore = 0;

        for (var i = 0; i < 10; i++) {
            newScore += parseInt(req.body.scores[i]);
        };

        console.log("this is the new score - score of the newest friend submitted: " + newScore);

        //set target var to 0
        var targetScore = 0;
        console.log("starting targetScore: " + targetScore);
        //set counter for index of friendsData
        var x = 0;
        console.log("starting index counter to move through friendsData array: " + x);
        var friendScore = 0;
        // console.log("starting friendScore placeholder for the score of each scoreindex of friendsData: " + friendScore);
        findScore();
        //function to find the score of existing data one at a time using parseInt
        function findScore() {
            console.log("\n------------------------------" + "\nThe goal is for difference to match the targetScore");
            console.log("The current friend is: " + friendsData[x].name)
            var s = friendsData[x].scores.map(Number);
            // parseInt(s);
            console.log("should be an array of numbers for the current friend: " + s);
            // console.log("this data type is actually: " + typeOf(s));
            var friendScore = s.reduce(function(sum, value) {
                return sum + value;
            }, 0);
            console.log("updated friend score: " + friendScore);
            console.log("newest entry score: " + newScore);
            //find the difference between first index of friendData vs newScore using math.abs
            difference = Math.abs(newScore - friendScore);
            console.log("difference: " + difference);
            matchScore();
        }


        //call the function to match the diff to the target
        //function match the difference to a "target" - starting at 0
        function matchScore() {
            if (difference === targetScore) {
                //if diff equals target, return that index of friendsData
                console.log("this is the info that matches: ");
                console.log(friendsData[x]);
                return friendsData[x];
            }
            //else increase counter and start again
            else {
                x++;
                // targetScore++;
                if (x === friendsData.length -1) {
                    x = 0;
                    targetScore++;
                }

                // if (x % friendsData.length - 1 === 0) {
                //   targetScore++;
                // }
                console.log("new round targetScore: " + targetScore);
                console.log("new round index of friends counter: " + x);
                findScore();
            }
        }

        res.json(friendsData[x]);
    });
};
