(function() {
	let appModule = angular.module('ngblog');

	appModule.controller('LoginController', function($rootScope, $scope) {
		this.username = '';
		this.visible = true;
		this.validateUsername = () => {
			if (this.username && this.username.length > 0) {
				localStorage.setItem('username', this.username);
				this.loggedIn();
			}
		};
		this.loggedIn = () => {
			$rootScope.$broadcast('loggedIn');
			this.visible = false;
		}
		// Initialisation du controller.
		if (localStorage.hasOwnProperty('username')) {
			this.username = localStorage.getItem('username');
			setTimeout(() => {
				$scope.$apply(() => this.loggedIn());
			});
		}
	});
})();