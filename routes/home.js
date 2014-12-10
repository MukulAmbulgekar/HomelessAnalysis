
var ejs = require("ejs");

var mysql = require('./mysql.js');
var state=null;


function homepage(req,res) {

	ejs.renderFile('./views/homepage.ejs',function(err, result)
			{
	   // render on success
	   if (!err) 
	   {
	            res.end(result);
	   }
	   // render or error
	   else
	   {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
}



function stateDataForm(req,res) {
	ejs.renderFile('./views/stateData.ejs',function(err, result)
			{
	   // render on success
	   if (!err) 
	   {
	            res.end(result);
	   }
	   // render or error
	   else
	   {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });

}
function stateData(req,res) {
	
	var year=null;
	year=req.param("year");
	
	console.log("Year:-"+year);
	var query = "select st.statename,st.stateabbrv,sc.count,sc.year from state_count sc,state st where st.state_id=sc.stateid_sc and  year='"+year+"';";
	console.log("Query is:" + query);
	
	
	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			if (results.length > 0) {
				for ( var i = 0; i < results.length; i++) {
					console.log(results[i].count);
				}
				
				state = results;
				console.log(state);
				res.render('stateDataGraph', {
					state : state,
					
				});
			
			}

		}
	}, query);

	
}

exports.homepage=homepage;
exports.stateDataForm=stateDataForm;
exports.stateData=stateData;