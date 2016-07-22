app.controller('treatmentNoteCtrl',["$timeout", "$scope", "$location", "$rootScope", "$http", "filterFilter", "Data", "$stateParams", "$state", "Upload", "$modal", function ($timeout, $scope, $location, $rootScope, $http, filterFilter, Data, $stateParams, $state, Upload, $modal) {
	$rootScope.getTemplateList = function(){
		Data.get('/settings/'+$rootScope.comp_id+'/template_notes')
			.then(function(list){
				console.log(list);
				$rootScope.TemplateNoteList = list;
			});
	}
$scope.treDelete = function (size) {
	    $rootScope.modalInstance = $modal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'DeleteModal.html',
	      size: size
       });
	};
	$rootScope.okdelete = function () {
		$rootScope.modalInstance.close($rootScope.deleteTemplate());
	 };
	 $rootScope.cancel = function () {
		$rootScope.modalInstance.dismiss('cancel');
	  };
	/* $scope.upload = function(file) {
	 	console.log(file)
        $scope.f = file;
        if (file && !file.$error) {
            file.upload = Upload.upload({
                url: '/settings/'+$rootScope.comp_id+'/import/template',
                data: {file: file}
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                    console.log(response)
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            });


        }   
    }*/
 $scope.upload = function (files) {
 	console.log(files);
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              if (!file.$error) {
                Upload.upload({
                   url: '/settings/'+$rootScope.comp_id+'/import/template',
                    file: file
                }).success(function (data, status, headers, config) {
                    $timeout(function() {
                        console.log(data);
                        $state.go('settings.treatment-notes.info',{TnoteID:data.id});
                        $rootScope.getTemplateList();
                        $rootScope.showSimpleToast('Treatmentment Note Created Successfully');
                    });
                });
              }
            }
        }
    };


	$rootScope.EditTemplate = function(){
		$state.go('settings.treatment-notes.edit',{TnoteID:$rootScope.TemplateId})
	}
	$rootScope.getTemplateList();

	$rootScope.editDisabled = true;
	$rootScope.updateDisabled = true;
	$rootScope.exportDisabled = true;
	$rootScope.updateBtnTxt = 'S_button_save';
	$rootScope.cancelBtnTxt = 'S_button_cancel';
		$rootScope.cancelDislable = true;
	$rootScope.clonebtn = false;
}]);


app.controller('treatmentNoteNewCtrl',["$scope", "$location", "$rootScope", "$http", "filterFilter", "Data", "$stateParams", "$state", "$modal", function ($scope, $location, $rootScope, $http, filterFilter, Data, $stateParams, $state, $modal) {
	$scope.template_note ={temp_sections_attributes:[]}
	$rootScope.editDisabled = true;
	$rootScope.exportDisabled = true;
	$rootScope.updateDisabled = false;
	$rootScope.updateBtnTxt = 'S_button_save';
	$rootScope.cancelBtnTxt = 'S_button_cancel';
	$rootScope.clonebtn = false;
	$rootScope.cancelDislable = true;
	$rootScope.templateText = 'New Template'

//$scope.template_info.push({template_sections_attributes:[]})
console.log($scope.template_info);
	$scope.addSection = function(){
		$scope.template_note.temp_sections_attributes.push({name:'',questions_attributes:[]})
	}
	$scope.removeSection = function(index){
		$scope.template_note.temp_sections_attributes.splice(index,1)
	}
	$scope.AddQuestion = function(data){
		$scope.template_note.temp_sections_attributes[data].questions_attributes.push({title:'',q_type:'Text',quest_choices_attributes:[{title:''}]});
	}
	$scope.RemoveQuestion = function(pindex, index){
		$scope.template_note.temp_sections_attributes[pindex].questions_attributes.splice(index,1)
	}
	$scope.AddAnswer = function(section, question){
		$scope.template_note.temp_sections_attributes[section].questions_attributes[question].quest_choices_attributes.push({title:''});
	}
	$scope.RemoveAnswer = function(section, question, index){
		console.log(section+','+question+','+index);
		$scope.template_note.temp_sections_attributes[section].questions_attributes[question].quest_choices_attributes.splice(index,1)
	}
	$scope.ChangeQuestionType = function(data){
		$scope.template_note.temp_sections_attributes[data].questions_attributes[data].quest_choices_attributes = [{title:''}];
	}
	if($stateParams.TnoteID){
		Data.get('template_notes/'+$stateParams.TnoteID+'/edit')
			.then(function(results){
				console.log(results);
				$scope.template_note = results;
				$scope.template_note.name = '';
				$scope.template_note.show_patient_addr= false;
				$scope.template_note.show_patient_dob=  false;
				$scope.template_note.show_patient_medicare= false;
				$scope.template_note.show_patient_occup= false;
				$rootScope.getTemplateList();
				$rootScope.cloading = false;

			})
	}
	$scope.UpdateTemplate = function(template_note ){
		$rootScope.cloading = true;
		$http.post('/settings/'+$rootScope.comp_id+'/template_notes', {'template_note':template_note})
			.success(function(results){
			if(results.error){
                  $rootScope.cloading = false;
                  $rootScope.errors = results.error;
                 $rootScope.showMultyErrorToast();
              }
              else{
				$rootScope.getTemplateList();
				$state.go('settings.treatment-notes.info',{TnoteID:results.template_id})
				$rootScope.showSimpleToast('treatmentment Note Created Successfully');
				$rootScope.cloading = false;
			}
			});
	}

}]);

app.controller('treatmentNoteInfoCtrl',["$scope", "$location", "$rootScope", "$http", "filterFilter", "Data", "$stateParams", "$state", "$modal", function ($scope, $location, $rootScope, $http, filterFilter, Data, $stateParams, $state, $modal) {
	$rootScope.editDisabled = false;
	$rootScope.exportDisabled = false;
	$rootScope.updateDisabled = false;
	$rootScope.updateBtnTxt = 'CLONE';
	$rootScope.cancelBtnTxt = 'S_button_delete';
	$rootScope.cancelDislable = false;
	$rootScope.clonebtn = true;
	$rootScope.ExportData = function(){
		window.location = '/template_notes/'+$stateParams.TnoteID+'/download';
		/*$http.get('/template_notes/'+$rootScope.TnoteID+'/download')
			.success(function(results){
				console.log(results);
			})*/
	}
	$rootScope.deleteTemplate = function(){
		console.log($stateParams.TnoteID);
		$http.delete('/template_notes/'+$stateParams.TnoteID)
			.success(function(results){
				console.log(results);
				$state.go('settings.treatment-notes');
				$rootScope.getTemplateList();
				$rootScope.showSimpleToast('Treatment Note Template Deleted Successfully');
			})
	}
	
	
	  
	$rootScope.cloneTemplate = function(){
		$rootScope.cloading = true;
		$state.go('settings.treatment-notes.clone',{TnoteID:$stateParams.TnoteID})
/*		$http.get('/template_notes/'+$stateParams.TnoteID+'/template/copy')
			.success(function(results){
				console.log(results);
				$rootScope.getTemplateList();
				
				$rootScope.showSimpleToast('treatmentment Note Created Successfully');
				$rootScope.cloading = false;
			});*/
	}
	$scope.getTemplateInfo = function(){
		$rootScope.cloading = true;
		Data.get('template_notes/'+$stateParams.TnoteID)
			.then(function(results){
				console.log(results);
				if(results.error){
					$state.go('settings.treatment-notes');
					$rootScope.showErrorToast(results.error);
				}
				else{
					$scope.Templateinfo = results;
					$rootScope.getTemplateList();
					$rootScope.cloading = false;
				}
				console.log(results);
			})
	}
	$rootScope.TemplateId = $stateParams.TnoteID;
	$scope.getTemplateInfo();
}]);