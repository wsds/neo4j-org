var request=require("request");

exports.load = function (app) {
    var locals = app.locals;
    
    locals.versions = {};

    locals({
        neo4j:{
            version:"1.9.M03",
            date:"Dec 21, 2012",
            summary:"Cypher improvements, Gremlin refactoring",
            readme:"http://blog.neo4j.org/2012/12/neo4j-19m03-released.html"
        }, neo4jGA:{
            version:"1.8.1", date:"Dec 14, 2012", summary:"General Availability", readme:"http://blog.neo4j.org/2012/12/neo4j-1-8-1-release-stability-and-cypher-performance.html"
        }, neo4jP:{
            version:"2.0.0-M01", date:"Apr 03, 2013", summary:"Preview", readme:"http://blog.neo4j.org"
        }, neo4jS:{
            version:"1.9-SNAPSHOT",
            date:"2013",
            summary:"Unstable Snapshot, for resolution issue verification"
        }
    });

    function temp_update_version(current, data, current_date) {
        if (current != data.version) {
            data.version = current;
            data.date = current_date || "2013";
            data.readme = "http://blog.neo4j.org";
        }
    }

    request("https://raw.github.com/neo4j/current-versions/master/versions.json",
        function (err, res, body) {
            if (err || res.statusCode != 200) {
                console.log("Error retrieving versions ", err, res, body);
                return;
            }
            locals.versions = JSON.parse(body) || {};
            console.log(locals.versions);
            temp_update_version(locals.versions.stable, locals.neo4jGA, locals.versions.stable_date);
            temp_update_version(locals.versions.milestone, locals.neo4j, locals.versions.milestone_date);
            temp_update_version(locals.versions.preview, locals.neo4jP, locals.versions.preview_date);
            temp_update_version(locals.versions.snapshot, locals.neo4jS);
        }
    )
};