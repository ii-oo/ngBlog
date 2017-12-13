(function() {
	let appModule = angular.module('ngblog');

	appModule.controller('BlogController', function($scope, ArticleFactory, ArticleService) {
		this.listVisible = false;
		this.formVisible = false;
		this.article = {};
		ArticleService.mock(5);
		this.articles = ArticleService.list();
		console.log('test');
		this.displayArticleForm = (show) => {
			this.listVisible = !show;
			this.formVisible = show;
			if(!show){
				this.article = {};
			}
		};
		this.editArticle = (article) => {
			this.displayArticleForm(true);
			this.article = ArticleFactory.clone(article);
		};
		this.validateArticleForm = (e) => {
			if (this.article.id) {
				// Mise à jour de l'article.
				let index = this.articles
					.findIndex((article) => this.article.id === article.id);
				this.articles.splice(index, 1, this.article);
			} else {
				// Nouvel article.
				this.articles.push(
				ArticleService.create(this.article.title,
					this.article.description));
			}
			this.displayArticleForm(false);			 
		};
		this.deleteArticle = (articleId) => {
			ArticleService.delete(articleId);
		};
		$scope.$on('loggedIn', () => {
			this.listVisible = true;
		});
	});
})();