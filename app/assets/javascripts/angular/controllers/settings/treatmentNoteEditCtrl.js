app.controller('treatmentNoteEditCtrl',['$scope', "$location", "$rootScope", "$http", "filterFilter", "Data", "$stateParams", "$state", function ($scope, $location, $rootScope, $http, filterFilter, Data, $stateParams, $state) {
	
$rootScope.editDisabled = true;
	$rootScope.exportDisabled = true;
	$rootScope.updateDisabled = false;
	$rootScope.updateBtnTxt = 'UPDATE';
	$rootScope.cancelBtnTxt = 'CANCEL';
	$rootScope.clonebtn = false;
	$rootScope.templateText = 'Editing'
	$scope.removed_ans = [];
	$scope.removed_que = [];
	$rootScope.cancelDislable = true;
	$scope.addSection = function(){
		$scope.template_note.temp_sections_attributes.push({name:'',questions_attributes:[]})
	}
	$scope.removeSection = function(index){
		$scope.template_note.temp_sections_attributes.splice(index,1)
	}
	$scope.AddQuestion = function(data){
		$scope.template_note.temp_sections_attributes[data].questions_attributes.push({title:'',q_type:'Text',quest_choices_attributes:[{title:''}]});
	}
	$scope.RemoveQuestion = function(pindex, index, id){

		$scope.template_note.temp_sections_attributes[pindex].questions_attributes.splice(index,1)
	}
	$scope.AddAnswer = function(section, question){
		$scope.template_note.temp_sections_attributes[section].questions_attributes[question].quest_choices_attributes.push({title:''});
	}
	$scope.RemoveAnswer = function(section, question, index, id){
		$scope.template_note.temp_sections_attributes[section].questions_attributes[question].quest_choices_attributes.splice(index,1)


	}
	$scope.ChangeQuestionType = function(data){
		$scope.template_note.temp_sections_attributes[data].questions_attributes[data].quest_choices_attributes = [{title:''}];
	}

	$scope.getTemplateInfo = function(){
		$rootScope.cloading = true;
		Data.get('template_notes/'+$stateParams.TnoteID+'/edit')
			.then(function(results){
				console.log(results);
				
				$scope.template_note = results;
				$rootScope.getTemplateList();
				$rootScope.cloading = false;

			})
	}
	$rootScope.TemplateId = $stateParams.TnoteID;
	$scope.getTemplateInfo();


	$scope.UpdateTemplate = function(template_note ){
		$rootScope.cloading = true;
		console.log(template_note);
		$http.put('template_notes/'+$stateParams.TnoteID, {'template_note':template_note})
			.success(function(results){

				console.log(results);
				 if(results.error){
                  $rootScope.cloading = false;
                  $rootScope.errors = results.error;
                 $rootScope.showMultyErrorToast();
              }
              else{
				$rootScope.getTemplateList();
				$rootScope.showSimpleToast('treatmentment Note Updated Successfully');
				$state.go('settings.treatment-notes.info',{TnoteID:results.template_id})
				$rootScope.cloading = false;
			}

				//$scope.getTemplateInfo();
			});
	}
}]);