expenseApp.run(function($rootScope,$route,$location,$timeout){
	/*Dummy data to display the spent chart*/
	debugger;
	$rootScope.statistics = {
		data:[
			{ name: "Most Spent" , value: "$100" ,icon:"cart"}, 
			{ name: "Least Spent" , value: "$2" ,icon:"coin-dollar"},
			{ name: "Most Spent Category" , value: "Shopping",icon:"cart"},
			{ name: "Least Spent Category" , value: "Cash",icon:"coin-dollar"}
		]
	};
	
	/*Dummy data to display the prediction chart*/
	
	$rootScope.prediction = {
		data:[
			{ name: "Over Budget" , value: "Home - $800" ,icon:"home"}, 
			{ name: "Over Budget" , value: "Health - $300" ,icon:"heart"},
			{ name: "Too Low" , value: "Shopping - $50",icon:"cart"},
			{ name: "Too Low" , value: "Cash - $3",icon:"coin-dollar"}
		]
	};

	/*Dummy data to display the List on home screen*/
	
	$rootScope.categories = {
		getLabels: function() {
			var labels=[];
			for(i = 0 ; i < this.data.length ; i++)
			{
				labels.push(this.data[i].name);
			}
			return labels;
		},
		getValues: function() {
			var values=[];
			for(i = 0 ; i < this.data.length ; i++)
			{
				values.push(this.data[i].amount);
			}
			return values;
		},
		getTotal: function() {
			var sum=0;
			for(i = 0 ; i < this.data.length ; i++)
			{
				sum+=this.data[i].amount;
			}
			return sum;
		},
		getColors: function() {
			var values=[];
			for(i = 0 ; i < this.data.length ; i++)
			{
				values.push(this.data[i].color);
			}
			return values;
		},
		data: [
				{name: "Food",icon: "spoon-knife",amount: 400,color:"#F7464A",entries:{}},
				{name: "Housing",icon: "home",amount: 300,color:"#2196F3",entries:{}},
				{name: "Shopping",icon: "cart",amount: 600,color:"#CDDC39",entries:{}},
				{name: "Bills",icon: "credit-card",amount: 450,color:"#009688",entries:{}},
				{name: "Cash",icon: "coin-dollar",amount: 350,color:"#FFC107",entries:{}},
				{name: "Health",icon: "heart",amount: 200,color:"#FF5722",entries:{}}
			]
	};
});


/*Service to fetch/post data  to/from server*/

expenseApp.service('expenseTrackerService', function($http){
	this.addEntry=function(newEntry){
		//$http.post("/",newEntry).success(function(args,data){
			
		//});
		history.back();
	}
});