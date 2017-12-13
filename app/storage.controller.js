(function() {
	let appModule = angular.module('ngblog');
    const STORAGE_KEY = "sessionData";
	appModule.controller('StorageController', function($scope, ArticleFactory, ArticleService) {
        this.save = () => {
            this.articles = ArticleService.list();
            console.log('Sauvegarde');
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.articles));
        };
        
        this.reload = () => {
            console.log('Recharger');
        }
	});
})();
/*
// On convertit l'objet en une chaîne JSON
// et on enregistre cette valeur avec le nom 'session'
localStorage.setItem('session', JSON.stringify(session));

// Ici, on reconvertit la chaîne en un objet 
// JSON.stringify and saved in localStorage in JSON object again
var sessionRestaurée = JSON.parse(localStorage.getItem('session'));

// La variable sessionRestaurée contient désormais l'objet précédent
// qui avait été sauvegardé dans localStorage
console.log(sessionRestaurée);
*/