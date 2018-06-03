'use strict';

/**
 * @ngdoc function
 * @name invProduct.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the invProduct
 */
angular.module('invProduct')
  .controller('MainCtrl',['$http','$scope','$location','localStorageService', function ($http,$scope,location,localStorageService) {
    
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var vm = this;


// Begining of http json fetch



this.loadComputers = function()
{
  $http(
  	{
  		method:'GET',
  		url:'https://cdn.rawgit.com/atismohanty/KiBiz/2ca8edd2/macbookcatog.json'	
  	})
  .then(
      function(response)
  			{
  				console.log(response.data);
  				$scope.productResponse = response.status;
  				$scope.productData = response.data;
  				
  			},
      function(response)
  			{
    			$scope.productData = 'Response Failed';
    			console.log("failed");
  			}
		    ); //end of then function scopr
}
    
function navigateSection( primaryPath, subpath)
{

  //$location.path('/contacts');
  //navModule.setModulePartials(subpath);
  window.location.assign('#!/'+ primaryPath);

  console.log(subpath);
}



this.showRegPanel = function()
{
  this.switchLoginPanel = ! this.switchLoginPanel;
  console.log("switchpanel");
}


this.validateUser = function(event)
{
  var userlist ; 
  var usererror;
  var validUser ;
  $http({
    method:'GET',
    url:'json/user.json'
      })
  .then( function success(result)
    {
      userlist = result.data; 

       for (var i = 0 ; i < userlist.length ; i++)
        {
          if (userlist[i].name  == vm.username && userlist[i].password==vm.password) 
            {
              if (localStorageService.isSupported) 
                {
                  localStorageService.set('validUser', true ,'localStorage');
                  validUser = true;
                  vm.userName = userlist[i].name;
                  vm.access = userlist[i].userAccess;
                  vm.id = userlist[i].userid;
                  vm.fullname = userlist[i].fullname;
                  var d = new Date();
                  vm.loggedinTime= d.getHours() + ':' + d.getMinutes() + ":" + d.getSeconds();
                  vm.stafImage = "images/stafImage.jpg";
                }
             }
         }

       if (validUser) 
        {

          console.log("validation passed");
          window.location.assign('#!/');
        }
        else
        {
          vm.errorData = "Incorrect username or password";
        }
        
    },function failure(result)
        {
          usererror = result.data;
        });
  
}

this.triggerCheck = function(e)
{
  //var keyNum = String.fromCharCode(Event.keyCode||Event.which) ;
  console.log(event.charCode);
  
  if (event.charCode==13) 
  {
    this.validateUser();
  }
}


$(document).ready(function(){
    $(".dropdown").hover(            
        function() {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideDown("400");
            $(this).toggleClass('open');        
              },
        function() {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideUp("400");
            $(this).toggleClass('open');       
              }
    );
});

// java script code for adding event listener to navigation menu

$(document).ready(function()
{

$("#submnu001").click ( function(event){
  event.preventDefault();
  event.stopPropagation();
  navigateSection('contacts','views/partials/newcontact.html');
});
$("#submnu002").click ( function(event){
  event.preventDefault();
  event.stopPropagation();
  navigateSection('contacts','views/partials/searchcontact.html');
});
$("#submnu003").click ( function(event){
  event.preventDefault();
  event.stopPropagation();
  navigateSection('contacts','views/partials/contactdetails.html');
});
$("#submnu005").click ( function(event){
  event.preventDefault();
  event.stopPropagation();
  navigateSection('contacts','views/partials/contactlocation.html');
});
$("#submnu007").click ( function(event){
  event.preventDefault();
  event.stopPropagation();
  navigateSection('products','views/partials/searchproduct.html');
});
$("#submnu008").click ( function(event){
  event.preventDefault();
  event.stopPropagation();
  navigateSection('products','views/partials/newproduct.html');
});
});

 }]);
