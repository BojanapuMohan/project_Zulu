angular.module('clinikoApp').config(function($translateProvider){
	
    $translateProvider.useStaticFilesLoader({
      prefix: 'assets/angular/common/language/lang-',
      suffix: '.json'
    });

    /*language translator*/


  $translateProvider.preferredLanguage('en');
    });