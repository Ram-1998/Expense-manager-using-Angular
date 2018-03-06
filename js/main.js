var app = angular.module("expenseManager", []); 
    app.filter('convertToRupee',function(){
      return function (price) {
        return  price+'₹' ;
       };
    });
    app.controller("myCtrl", function($scope) {
    var groceryTotal = 0;
    var entertainmentTotal = 0;
    var vehicleTotal = 0;
    var foodTotal = 0;
    var miscellaneousTotal = 0;

    var grocery;
    var entertainment;
    var vehicle ;
    var food;
    var miscellaneous;

    

    if(angular.fromJson(localStorage.getItem('grocery')) == null){
      grocery = [];
    }else{
      grocery = angular.fromJson(localStorage.getItem('grocery'));
      for (var i = 0; i < grocery.length; i++) {
              groceryTotal += grocery[i].price;
      }
     } 

    if(angular.fromJson(localStorage.getItem('entertainment')) == null){
      entertainment = [];
    }else{
      entertainment = angular.fromJson(localStorage.getItem('entertainment'));
      for (var i = 0; i < entertainment.length; i++) {
              entertainmentTotal += entertainment[i].price;
      }
    }

    if(angular.fromJson(localStorage.getItem('vehicle')) == null){
      vehicle = [];
    }else{
      vehicle = angular.fromJson(localStorage.getItem('vehicle'));
      for (var i = 0; i < vehicle.length; i++) {
              vehicleTotal += vehicle[i].price;
      }
    } 
       

    if(angular.fromJson(localStorage.getItem('food')) == null){
      food = [];
    }else{
      food = angular.fromJson(localStorage.getItem('food')); 
      for (var i = 0; i < food.length; i++) {
              foodTotal += food[i].price;
      }
    }
      
    if(angular.fromJson(localStorage.getItem('miscellaneous')) == null){
      miscellaneous = [];
    }else{
      miscellaneous = angular.fromJson(localStorage.getItem('miscellaneous'));
      for (var i = 0; i < miscellaneous.length; i++) {
              miscellaneousTotal += miscellaneous[i].price;
      }             
    }

    $scope.groceryTotal = groceryTotal;
    $scope.entertainmentTotal = entertainmentTotal;
    $scope.vehicleTotal = vehicleTotal;
    $scope.foodTotal = foodTotal;
    $scope.miscellaneousTotal = miscellaneousTotal;

    $scope.grocery = grocery;
    $scope.entertainment = entertainment;
    $scope.vehicle = vehicle;
    $scope.food = food;
    $scope.miscellaneous = miscellaneous;

    $scope.showReport = function(){
        var report = [
        {'name':"grocery",'value':groceryTotal},
        {'name':"entertainment",'value':entertainmentTotal},
        {'name':"vehicle",'value':vehicleTotal},
        {'name':"food",'value':foodTotal},
        {'name':"miscellaneous",'value':miscellaneousTotal},
      ];

      var chart = anychart.pie();
      chart.title("This Shows your report");
      chart.data(report);
      chart.container('report');
      chart.draw();
      chart.legend().position("right");
      // set items layout
      chart.legend().itemsLayout("vertical");
      $scope.loadReport = true;
    }
    $scope.hideReport = function(){
      var myEl = angular.element( document.querySelector('#report'));
      myEl.empty();
      $scope.loadReport = false;
    }

    
    

    $scope.addNewItem = function () {
      item = {
        name:$scope.name,
        price:$scope.price
      };
        $scope.errortext = "";
        if (!$scope.name) {
          NameError = true;
          return;
        }
        if($scope.category == "grocery"){
            grocery.push(item);
            groceryTotal = 0;
            for (var i = 0; i < grocery.length; i++) {
              groceryTotal += grocery[i].price;
            }
            $scope.grocery = grocery;
            $scope.groceryTotal = groceryTotal; 
            localStorage.setItem( 'grocery', angular.toJson(grocery));     
        }
        else if($scope.category == "entertainment"){
            entertainment.push(item);
            entertainmentTotal = 0;
            for (var i = 0; i < entertainment.length; i++) {
              entertainmentTotal += entertainment[i].price;
            } 
            $scope.entertainmentTotal = entertainmentTotal; 
            localStorage.setItem( 'entertainment', angular.toJson(entertainment));    
        }
        else if($scope.category == "vehicle"){
            vehicle.push(item);
            vehicleTotal = 0; 
            for (var i = 0; i < vehicle.length; i++) {
              vehicleTotal += vehicle[i].price;
            }  
            $scope.vehicleTotal = vehicleTotal;
            localStorage.setItem( 'vehicle', angular.toJson(vehicle));   
        }
        else if($scope.category == "food"){
            food.push(item);
            foodTotal = 0;
            for (var i = 0; i < food.length; i++) {
              foodTotal += food[i].price;
            }  
            $scope.foodTotal = foodTotal;    
            localStorage.setItem( 'food', angular.toJson(food));
        }
        else{
            miscellaneous.push(item);
            miscellaneousTotal = 0;
            for (var i = 0; i < miscellaneous.length; i++) {
              miscellaneousTotal += miscellaneous[i].price;
            }      
            $scope.miscellaneousTotal = miscellaneousTotal;
            localStorage.setItem( 'miscellaneous', angular.toJson(miscellaneous));
        };     
        
        
                      
    }
    $scope.removeItem = function (x) {
        $scope.errortext = "";    
        $scope.products.splice(x, 1);
    }
});