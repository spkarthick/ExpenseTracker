var expenseApp = angular.module("expenseApp",["ngRoute"]).run(function($rootScope,$route,$location){
	$rootScope.appName = "";
	$rootScope.showData=true;
	$rootScope.showReport=false;
	$rootScope.toggleIcon='stats-dots';
	$rootScope.activeSwitcher = "List";
	$rootScope.period="week";
	$rootScope.statisticIndex=0;
	$rootScope.loading=true;
	$rootScope.statistics = {
		data:[
			{ name: "Most Spent" , value: "$100" ,icon:"cart"}, 
			{ name: "Least Spent" , value: "$2" ,icon:"coin-dollar"},
			{ name: "Most Spent Category" , value: "Shopping",icon:"cart"},
			{ name: "Least Spent Category" , value: "Cash",icon:"coin-dollar"}
		]
	};
	$rootScope.prediction = {
		data:[
			{ name: "Over Budget" , value: "Home - $800" ,icon:"home"}, 
			{ name: "Over Budget" , value: "Health - $300" ,icon:"heart"},
			{ name: "Too Low" , value: "Shopping - $50",icon:"cart"},
			{ name: "Too Low" , value: "Cash - $3",icon:"coin-dollar"}
		]
	};
	/*$rootScope.onClick = function() {
		$location.path("addentry");
	}
	*/
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
	}
	$rootScope.addEntry = function() {
		$("#addentryform").submit();
	}
	$rootScope.$on("$routeChangeStart",function(scope){
		$rootScope.loading=true;
	});
	$rootScope.$on("$routeChangeSuccess",function(scope){
		$rootScope.appName = $route.current.data.title;
		$rootScope.loading=false;
	});
});

expenseApp.service("fetchData",function() {
	
});

expenseApp.controller("homeController",["$scope","$rootScope",function($scope,$rootScope){
	$scope.init = function(){
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
		var myLineChart = new Chart(ctx).Radar(data, {
			pointDot: false,
			scaleOverride: true,
			scaleSteps: 10,
			responsive: true,
			scaleStepWidth: 100,
			scaleStartValue: 0
		});
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
		var myPredictLineChart = new Chart(ctx).Radar(data, {
			pointDot: false,
			scaleOverride: true,
			scaleSteps: 10,
			responsive: true,
			scaleStepWidth: 100,
			scaleStartValue: 0
		});
		$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
			var categories = $rootScope.categories.getLabels();
			var values = $rootScope.categories.getValues();
			var total = $rootScope.categories.getTotal();
			var colors = $rootScope.categories.getColors();
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
}]);

expenseApp.controller("addEntryController",["$scope","$rootScope",function($scope,$rootScope){
	$scope.category="Food";
	$scope.typeOfTransaction="Debit";
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
		dd='0'+dd
	} 

	if(mm<10) {
		mm='0'+mm
	} 

	today = mm+'/'+dd+'/'+yyyy;
	$scope.todayDate=today;
}]);

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
/*$(function(){
			
		});*/