var expenseApp = angular.module("expenseApp",["ngRoute"]).run(function($rootScope,$route,$location,$timeout){
	
	//sets the text on the header
	$rootScope.appName = "";
	
	//used to toggle List page
	$rootScope.showData=true;
	
	//used to toggle reports page
	$rootScope.showReport=false;
	
	//used to toggle icon on the top right corner on lower resolutions
	$rootScope.toggleIcon='stats-dots';
	
	//set the preferred way to show data(switcher in homescreen)
	$rootScope.activeSwitcher = "List";
	
	//set the preferred period to display on home screen and report screen
	$rootScope.period="week";
	
	//set to true to show waitingpopup
	$rootScope.loading=true;
	
	/*triggers event to share method for adding Entry with addEntryController*/
	
	$rootScope.addEntry = function() {
		$rootScope.$broadcast("addEntry");
	}
	
	/*Dummy data to display the spent chart*/
	
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
	
	/*to Switch view on home screen*/
	
	$rootScope.toggleContent = function(args){
		if(args) {
			var list = (args == "List");
			$rootScope.activeSwitcher = args;
			$rootScope.showData = list;
			$rootScope.showReport = !list;
		}
		else { 
			$rootScope.showData = !$rootScope.showData;
			$rootScope.showReport = !$rootScope.showReport;
			$rootScope.activeSwitcher = $rootScope.showData ? "List" : "Report"
		}
		$rootScope.toggleIcon = $rootScope.showData ? 'stats-dots' : 'list';
		/*$timeout(function(){
			$rootScope.$broadcast("switchView");
		});*/
	}
	
	/*routeChangeStart triggers at the start of view change*/
	
	$rootScope.$on("$routeChangeStart",function(scope){
		$rootScope.loading=true;
	});
	
	/*routeChangeStart triggers at the end of view change*/
	
	$rootScope.$on("$routeChangeSuccess",function(scope){
		$rootScope.appName = $route.current.data.title;
		$rootScope.loading=false;
	});
	
});

expenseApp.controller("homeController",["$scope","$rootScope",function($scope,$rootScope){
	
	/*Init the Home screen*/
	
	$scope.init = function(){
		
		/*Renders the Spent Chart*/
		
		var ctx = $("#spendpattern")[0].getContext("2d");
		var data = {
			labels: $rootScope.categories.getLabels(),
			datasets: [
						{
							label: "Expected",
							fillColor: "rgba(55, 71, 79, 0.5)",
							strokeColor: "rgba(55, 71, 79, 0.5)",
							pointColor: "rgba(55, 71, 79, 0.5)",
							pointStrokeColor: "#fff",
							pointHighlightFill: "#fff",
							pointHighlightStroke: "rgba(220,220,220,0.5)",
							data: [500,400,300,350,700,200]
						}/*,
						{
							label: "Actual",
							fillColor: "rgba(3, 169, 244, 0.5)",
							strokeColor: "rgba(3, 169, 244, 0.5)",
							pointColor: "rgba(3, 169, 244, 0.5)",
							pointStrokeColor: "#fff",
							pointHighlightFill: "#fff",
							pointHighlightStroke: "rgba(220,220,220,1)",
							data: $rootScope.categories.getValues()
						}*/
				]
		};
		$scope.myLineChart = new Chart(ctx).Radar(data, {
			pointDot: false,
			scaleOverride: true,
			scaleSteps: 10,
			responsive: true,
			scaleStepWidth: 100,
			scaleStartValue: 0
		});
		
		/*Renders the Prediction Chart*/
		
		var ctx = $("#prediction")[0].getContext("2d");
		var data = {
			labels: $rootScope.categories.getLabels(),
			datasets: [
						{
							label: "Expected",
							fillColor: "rgba(55, 71, 79, 0.5)",
							strokeColor: "rgba(55, 71, 79, 0.5)",
							pointColor: "rgba(55, 71, 79, 0.5)",
							pointStrokeColor: "#fff",
							pointHighlightFill: "#fff",
							pointHighlightStroke: "rgba(220,220,220,0.5)",
							data: [600,500,600,450,700,450]
						}
				]
		};
		$scope.myPredictLineChart = new Chart(ctx).Radar(data, {
			pointDot: false,
			scaleOverride: true,
			scaleSteps: 10,
			responsive: true,
			scaleStepWidth: 100,
			scaleStartValue: 0
		});
		
		/*ngRepeatFinished will be invoked after ng-repeat generates the elements*/
		
		$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
			var categories = $rootScope.categories.getLabels();
			var values = $rootScope.categories.getValues();
			var total = $rootScope.categories.getTotal();
			var colors = $rootScope.categories.getColors();
			
			/*Renders all the doughnut charts on the home content*/
			
			var doughnutOptions = {
				segmentShowStroke : true,
				segmentStrokeColor : "#a3a3a3",
				segmentStrokeWidth : 1,
				percentageInnerCutout : 50,
				animationSteps : 100,
				animationEasing : "easeOutBounce",
				animateRotate : false,
				animateScale : false,
			}
			for(i = 0;i < categories.length;i++)
			{
				var myDoughnutChart = new Chart($("#" + categories[i])[0].getContext("2d")).Doughnut([{value: values[i],color:"#607D8B"},{value: total - values[i],color:"#FFFFFF"}],doughnutOptions);
			}
		});
	}
	$scope.init();
	
	/*$scope.$on("switchView",function(){
		debugger;
		$scope.myPredictLineChart.render();
		$scope.myLineChart.render();
	});*/
}]);

expenseApp.controller("addEntryController",["$scope","$rootScope","expenseTrackerService",function($scope,$rootScope,expenseTrackerService){
	
	/*Adds new Entry when using in higher resolutions*/
	
	$scope.addEntry = function() {
		if($scope.addentryform.$valid)
			expenseTrackerService.addEntry($scope.newEntry);
	};
	$scope.newEntry={};
	$scope.newEntry.category="Food";
	$scope.newEntry.typeOfTransaction="Debit";
	$scope.newEntry.todayDate=new Date();
	
	/*Adds new Entry when using in lower resolutions*/
	
	$scope.$on("addEntry",function(args,data){
		$scope.addEntry();
	});
}]);

/*Specifies route for the application*/

expenseApp.config(["$routeProvider",function($routeProvider){
	$routeProvider
	.when("/stats",{
		templateUrl:"stats.html",
		controller:"homeController",
		data:{
			title:"Expense Tracker"
		}
	})
	.when("/addentry",{
		templateUrl:"addentry.html",
		controller:"addEntryController",
		data:{
			title:"Add Entry"
		}		
	})
	.otherwise({
		redirectTo:"/stats"
	});
}]);

/*Directive for triggering on ng-repeat completion*/

expenseApp.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
});

/*Service to fetch/post data  to/from server*/

expenseApp.service('expenseTrackerService', function($http){
	this.addEntry=function(newEntry){
		//$http.post("/",newEntry).success(function(args,data){
			
		//});
		history.back();
	}
});