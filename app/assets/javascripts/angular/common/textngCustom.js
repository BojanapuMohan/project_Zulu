angular.module('clinikoApp').config(function($provide){
$provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool, taOptions) { // $delegate is the taOptions we are decorating
                    taOptions.toolbar = [
                          ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote','bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear','justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
                          [],
                          
                      ];
                    taRegisterTool('h_1', {
                        buttontext: 'Heading 1',
                        action: function() {
                          this.$editor().wrapSelection('formatBlock', '<h1>');
                        }
                    });
                    taRegisterTool('h_2', {
                        buttontext: 'Heading 2',
                        action: function() {
                          this.$editor().wrapSelection('formatBlock', '<h2>');
                        }
                    });
                    
                    taRegisterTool('normal', {
                        buttontext: 'Normal',
                        action: function() {
                          this.$editor().wrapSelection('formatBlock', '<p>');
                        }
                    });
                    taRegisterTool('patient', {
                      display: '<span class="custom-toolbar btn-group" dropdown style="padding: 0px 0px 0px 0px">' +
                      '<button class="btn btn-default dropdown-toggle " dropdown-toggle type="button" ng-disabled="showHtml()">' +
                      '   <span>Patient</span>' +
                      '</button>' +
                      '<ul class="dropdown-menu">' +
                      '   <li ng-repeat="o in options">' +
                      '       <a ng-click="action(o)">{{o.name}}</a>' +
                      '   </li>' +
                      '</ul>' +
                      '</span>',
                      options:[ {name: 'Patient.Last'}, {name: 'Patient.Name'}, {name: 'Patient.Name'}, {name: 'Patient.Name'}, {name: 'Patient.Name'}],
                      action: function (option) {
                          if(option.name != undefined){
                        this.$editor().wrapSelection('insertHTML', '<span>{{'+option.name+'}}</span>', true);
                        }

                      }
                    });
                    taRegisterTool('practitioner', {
                      display: '<span class="custom-toolbar btn-group" dropdown style="padding: 0px 0px 0px 0px">' +
                      '<button class="btn btn-default dropdown-toggle " dropdown-toggle type="button" ng-disabled="showHtml()">' +
                      '   <span>Practitioner</span>' +
                      '</button>' +
                      '<ul class="dropdown-menu">' +
                      '   <li ng-repeat="o in options">' +
                      '       <a ng-click="action(o)">{{o.name}}</a>' +
                      '   </li>' +
                      '</ul>' +
                      '</span>',
                      options:[ {name: 'practitioner.Last'}, {name: 'practitioner.Name'}, {name: 'practitioner.Name'}, {name: 'practitioner.Name'}, {name: 'practitioner.Name'}],
                      action: function (option) {
                          if(option.name != undefined){
                        this.$editor().wrapSelection('insertHTML', '<span>{{'+option.name+'}}</span>', true);
                        }

                      }
                    });
                    taRegisterTool('business', {
                      display: '<span class="custom-toolbar btn-group" dropdown style="padding: 0px 0px 0px 0px">' +
                      '<button class="btn btn-default dropdown-toggle " dropdown-toggle type="button" ng-disabled="showHtml()">' +
                      '   <span>Business</span>' +
                      '</button>' +
                      '<ul class="dropdown-menu">' +
                      '   <li ng-repeat="o in options">' +
                      '       <a ng-click="action(o)">{{o.name}}</a>' +
                      '   </li>' +
                      '</ul>' +
                      '</span>',
                      options:[ {name: 'business.Last'}, {name: 'business.Name'}, {name: 'business.Name'}, {name: 'business.Name'}, {name: 'business.Name'}],
                      action: function (option) {
                          if(option.name != undefined){
                        this.$editor().wrapSelection('insertHTML', '<span>{{'+option.name+'}}</span>', true);
                        }

                      }
                    });
                    taRegisterTool('contact', {
                      display: '<span class="custom-toolbar btn-group" dropdown style="padding: 0px 0px 0px 0px">' +
                      '<button class="btn btn-default dropdown-toggle " dropdown-toggle type="button" ng-disabled="showHtml()">' +
                      '   <span>Contact</span>' +
                      '</button>' +
                      '<ul class="dropdown-menu">' +
                      '   <li ng-repeat="o in options">' +
                      '       <a ng-click="action(o)">{{o.name}}</a>' +
                      '   </li>' +
                      '</ul>' +
                      '</span>',
                      options:[ {name: 'contact.Last'}, {name: 'contact.Name'}, {name: 'contact.Name'}, {name: 'contact.Name'}, {name: 'contact.Name'}],
                      action: function (option) {
                          if(option.name != undefined){
                        this.$editor().wrapSelection('insertHTML', '<span>{{'+option.name+'}}</span>', true);
                        }

                      }
                    });
                    taRegisterTool('refDcotor', {
                      display: '<span class="custom-toolbar btn-group" dropdown style="padding: 0px 0px 0px 0px">' +
                      '<button class="btn btn-default dropdown-toggle " dropdown-toggle type="button" ng-disabled="showHtml()">' +
                      '   <span>Refefing Doctor</span>' +
                      '</button>' +
                      '<ul class="dropdown-menu">' +
                      '   <li ng-repeat="o in options">' +
                      '       <a ng-click="action(o)">{{o.name}}</a>' +
                      '   </li>' +
                      '</ul>' +
                      '</span>',
                      options:[ {name: 'RefefingDoctor.Last'}, {name: 'RefefingDoctor.Name'}, {name: 'RefefingDoctor.Name'}, {name: 'RefefingDoctor.Name'}, {name: 'RefefingDoctor.Name'}],
                      action: function (option) {
                          if(option.name != undefined){
                        this.$editor().wrapSelection('insertHTML', '<span>{{'+option.name+'}}</span>', true);
                        }

                      }
                    });
                    taRegisterTool('general', {
                      display: '<span class="custom-toolbar btn-group" dropdown style="padding: 0px 0px 0px 0px">' +
                      '<button class="btn btn-default dropdown-toggle " dropdown-toggle type="button" ng-disabled="showHtml()">' +
                      '   <span>General </span>' +
                      '</button>' +
                      '<ul class="dropdown-menu">' +
                      '   <li ng-repeat="o in options">' +
                      '       <a ng-click="action(o)">{{o.name}}</a>' +
                      '   </li>' +
                      '</ul>' +
                      '</span>',
                      options:[ {name: 'General.date'}],
                      action: function (option) {
                          if(option.name != undefined){
                        this.$editor().wrapSelection('insertHTML', '<span>{{'+option.name+'}}</span>', true);
                        }

                      }
                    });
                    taRegisterTool('appointment', {
                      display: '<span class="custom-toolbar btn-group" dropdown style="padding: 0px 0px 0px 0px">' +
                      '<button class="btn btn-default dropdown-toggle " dropdown-toggle type="button" ng-disabled="showHtml()">' +
                      '   <span>Appointment </span>' +
                      '</button>' +
                      '<ul class="dropdown-menu">' +
                      '   <li ng-repeat="o in options">' +
                      '       <a ng-click="action(o)">{{o.name}}</a>' +
                      '   </li>' +
                      '</ul>' +
                      '</span>',
                      options:[ {name: 'Appointment.date'}],
                      action: function (option) {
                          if(option.name != undefined){
                        this.$editor().wrapSelection('insertHTML', '<span>{{'+option.name+'}}</span>', true);
                        }

                      }
                    });
                    // add the button to the default toolbar definition
                    taOptions.toolbar[1].push('patient', 'practitioner', 'business', 'contact', 'refDcotor', 'general', 'h_1', 'h_2', 'normal', 'appointment' );
                    return taOptions;
  }]); });