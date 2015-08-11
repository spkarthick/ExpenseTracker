
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
				showTooltips: false
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

expenseApp.controller("addEntryController",["$scope","$rootScope","$animate","$timeout","expenseTrackerService",function($scope,$rootScope,$animate,$timeout,expenseTrackerService){
	
	/*Adds new Entry when using in higher resolutions*/
	$scope.addEntry = function() {
		if($scope.addentryform.$valid) {
			$rootScope.loading=true;
			expenseTrackerService.addEntry($scope.newEntry);
		}
		else {
			$scope.bounceValidation = true;
			$timeout(function(){
				$scope.bounceValidation = false;
			},1000);
		}
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