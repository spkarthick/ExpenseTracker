var expenseApp = angular.module("expenseApp",["ngRoute"]);

expenseApp.run(function($rootScope,$route,$location,$timeout){
	
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
