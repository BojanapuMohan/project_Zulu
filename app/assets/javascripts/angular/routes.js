angular.module('clinikoApp').config(function($authProvider , $stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoadProvider, $animateProvider, stateHelperProvider, ScrollBarsProvider){
      
$animateProvider.classNameFilter(/angular-animate/);
// $animateProvider.classNameFilter(/^(?:(?!no-animate).)*$/);

ScrollBarsProvider.defaults = {
        scrollButtons: {
            scrollAmount: 'auto', // scroll amount when button pressed
            enable: true // enable scrolling buttons by default
        },
        scrollInertia: 400, // adjust however you want
        axis: 'yx' ,
        theme: 'dark',
        autoHideScrollbar: true,
        advanced:{
            updateOnContentResize: true
        }
      };



	 $authProvider.configure({
        apiUrl: 'http://api.example.com'
    });
      // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/dashboard");
	  $locationProvider.hashPrefix('!');
    

        $stateProvider
		.state('login', {
		  url: "/login",
		 templateUrl: '/templates/common/login.html',
         data : { pageTitle: 'Login', authRequire: false},
            controller: 'authCtrl',
            onExit: function($state) {
                //console.log($state.current);
            }
            /*resolve: {
                  
                    loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('assets/angular/controllers/common/SignUpCtrl.js');
                    }]
                }*/
		})
		$stateProvider
		.state('forgot_password', {
		  url: "/forgot_password",
		 templateUrl: '/templates/common/forgot-password.html',
         data : { pageTitle: 'Forgot Password', authRequire: false},
            controller: 'forgotPasswordCtrl',
            onExit: function($state) {
            }
		})
		$stateProvider
		.state('reset_password', {
		  url: "/reset_password",
		 templateUrl: '/templates/common/reset-password.html',
         data : { pageTitle: 'Reset Password', authRequire: false},
            controller: 'resetPasswordCtrl',
            onExit: function($state) {
            }
		})
		.state('signup', {
		  url: "/signup",
		 templateUrl: '/templates/common/signup.html',
         data : { pageTitle: 'Signup', authRequire: false },
            controller: 'SignUpCtrl'
            /*resolve: {
                  
                    loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('assets/angular/controllers/common/SignUpCtrl.js');
                    }]
                }*/
		})
    .state('signup/:comp_id', {
      url: "/signup/:comp_id",
     templateUrl: '/templates/common/signupInfo.html',
         data : { pageTitle: 'Signup Info',  authRequire: false },
            controller: 'SignUpCtrl',
            
    })
		.state('dashboard', {
		  url: "/dashboard",
		  templateUrl: "/templates/dashboard/dashboard.html",
		  controller: 'dashboardCtrl',
          data : { pageTitle: 'Dashboard', authRequire : true }/*,
		    resolve: {
                    loadModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load('assets/angular/controllers/dashboard/dashboardCtrl.js');
                    }]
                },*/
              })
    .state('settings', {
      url: "/settings",
      templateUrl: "/templates/settings/settings.html",
      controller: 'settingCtrl',
      data : { pageTitle: 'top_links_Account', navlink: 'Account' }
    })
    .state('settings.account', {
      url: "/account/:comp_id",
      templateUrl: "/templates/settings/account-settings.html",
      controller: 'AccountsettingCtrl',
      data : { pageTitle: 'top_links_Account', navlink: 'Account' },
    })

    .state('settings.business', {
      url: "/business",
      templateUrl: "/templates/settings/select-business.html",
      controller: 'businessSettingCtrl',
          data : { pageTitle: 'top_links_Business_Information', navlink : 'Business Information'  }
    })

    .state('settings.business.info', {
      url: "/:business_id",
      templateUrl: "/templates/settings/business-information.html",
      controller: 'businessinfoCtrl',
          data : { pageTitle: 'top_links_Business_Information', navlink : 'Business Information'  }
    })

    .state('settings.business.new', {
      url: "/new/business",
      templateUrl: "/templates/settings/newBusiness.html", 
      controller: 'businessNew',
          data : { pageTitle: 'top_links_Business_Information', navlink : 'Business Information'  }
    })

    .state('settings.users', {
        url: "/users",
        templateUrl: "/templates/settings/select-user.html",
        controller: 'UserSettingCtrl',
            data : { pageTitle: 'top_links_Users_Practitioners', navlink : 'User & Practitioners'  }
      })
    .state('settings.users.info', {
      url: "/:user_id",
      templateUrl: "/templates/settings/users-practitioners.html",
      controller: 'UserSettingInfoCtrl',
          data : { pageTitle: 'top_links_Users_Practitioners', navlink : 'Users & Practitioners'  }
    })
    .state('settings.users.new', {
      url: "/new/user",
      templateUrl: "/templates/settings/CreateUser-practitioners.html",
      controller: 'UserSettingNewCtrl',
          data : { pageTitle: 'top_links_Users_Practitioners', navlink : 'Users & Practitioners'  }
    })
    


	.state('settings.online-booking', {
      url: "/online-booking",
      templateUrl: "/templates/settings/online-booking.html",
      controller: 'onlineBookingCtrl',
          data : { pageTitle: 'top_links_Online_Booking', navlink : 'Online Booking'  }
    })
	.state('settings.discount-types', {
      url: "/discount-types",
      templateUrl: "/templates/settings/concession-types.html",
      controller: 'concessionTypesCtrl',
          data : { pageTitle: 'Discount Types', navlink : 'Discount Types'  }
    })
  .state('settings.discount-types.edit', {
      url: "/:concession_id",
      templateUrl: "/templates/settings/concession-types-child.html",
      controller: 'concessionTypesChildCtrl',
          data : { pageTitle: 'top_links_Discount_Types', navlink : 'Discount Types'  }
    })
	.state('settings.taxes', {
      url: "/taxes",
      templateUrl: "/templates/settings/taxes.html",
      controller: 'taxsCtrl',
          data : { pageTitle: 'top_links_Taxes', navlink : 'Taxes'  }
    })
  .state('settings.taxes.info', {
      url: "/:TaxID",
      templateUrl: "/templates/settings/taxes-info.html",
      controller: 'taxsCtrl',
          data : { pageTitle: 'top_links_Taxes', navlink : 'Taxes'  }
    })
	.state('settings.referral-types', {
      url: "/referral-types",
      templateUrl: "/templates/settings/referral-types.html",
      controller: 'refferalTypeCtrl',
          data : { pageTitle: 'top_links_Referral_Types', navlink : 'Referral Types'  }
    })
	.state('settings.sms-setting', {
      url: "/sms-setting",
      templateUrl: "/templates/settings/sms-setting.html",
      controller: 'smsSettingCtrl',
          data : { pageTitle: 'top_links_SMS_Setting', navlink : 'SMS Setting'  }
    })
	.state('settings.recall-types', {
      url: "/recall-types",
      templateUrl: "/templates/settings/recall-types.html",
      controller: 'recallTypesCtrl',
          data : { pageTitle: 'Recall Types', navlink : 'Recall Types'  }
    })
  .state('settings.recall-types.info', {
      url: "/:recallID",
      templateUrl: "/templates/settings/recall-types-info.html",
      controller: 'recallTypesCtrl',
          data : { pageTitle: 'top_links_Recall_Types', navlink : 'Recall Types'  }
    })
	.state('settings.payment-types', {
      url: "/payment-types",
      templateUrl: "/templates/settings/payment-types.html",
      controller: 'paymentTypeCtrl',
          data : { pageTitle: 'top_links_Payments_Types', navlink : 'Payment Types'  }
    })
  .state('settings.payment-types.info', {
      url: "/:paymentID",
      templateUrl: "/templates/settings/payment-types-info.html",
      controller: 'paymentTypeCtrl',
          data : { pageTitle: 'top_links_Payments_Types', navlink : 'Payment Types'  }
    })
	.state('settings.subscription', {
      url: "/subscription",
      templateUrl: "/templates/settings/subscription.html",
      controller: 'subcsriptionCtrl',
          data : { pageTitle: 'top_links_Zulu_Subscription', navlink : 'ZULU Subscription'  }
    })
	.state('settings.treatment-notes', {
      url: "/treatment-notes",
      templateUrl: "/templates/settings/treatment-notes.html",
      controller: 'treatmentNoteCtrl',
          data : { pageTitle: 'top_links_Treatments_Note_Templates', navlink : 'Treatment Notes'  }
    })
  .state('settings.treatment-notes.info', {
      url: "/:TnoteID/info",
      templateUrl: "/templates/settings/treatment-notes-info.html",
      controller: 'treatmentNoteInfoCtrl',
          data : { pageTitle: 'top_links_Treatments_Note_Templates', navlink : 'Treatment Notes'  }
  })
	.state('settings.treatment-notes.edit', {
      url: "/:TnoteID/edit",
      templateUrl: "/templates/settings/treatment-notes-edit.html",
      controller: 'treatmentNoteEditCtrl',
          data : { pageTitle: 'top_links_Treatments_Note_Templates', navlink : 'Treatment Notes'  }
  })
  .state('settings.treatment-notes.clone', {
      url: "/:TnoteID/clone",
      templateUrl: "/templates/settings/treatment-notes-edit.html",
      controller: 'treatmentNoteNewCtrl',
          data : { pageTitle: 'top_links_Treatments_Note_Templates', navlink : 'Treatment Notes'  }
  })
  .state('settings.treatment-notes.new', {
      url: "/new",
      templateUrl: "/templates/settings/treatment-notes-edit.html",
      controller: 'treatmentNoteNewCtrl',
          data : { pageTitle: 'top_links_Treatments_Note_Templates', navlink : 'Treatment Notes'  }
  })
	.state('settings.appointment', {
      url: "/appointment",
      templateUrl: "/templates/settings/appointment-types.html",
      controller: 'appointmentCtrl',
          data : { pageTitle: 'top_links_Appointment_Types', navlink : 'Appointment Types'  }
    })
  .state('settings.appointment.info', {
      url: "/:appointmentID",
      templateUrl: "/templates/settings/appointment-types-info.html",
      controller: 'appointmentCtrl',
          data : { pageTitle: 'top_links_Appointment_Types', navlink : 'Appointment Types'  }
    })
    .state('settings.invoice', {
      url: "/invoice",
      templateUrl: "/templates/settings/invoice_setting.html",
      controller: 'invoiceCtrl',
          data : { pageTitle: 'top_links_Invoice_Setting', navlink : 'Invoice Settings'  }
    })
	.state('settings.data-imports', {
      url: "/data-imports",
      templateUrl: "/templates/settings/data-imports.html",
      controller: 'dataImportCtrl',
          data : { pageTitle: 'top_links_Data_Imports', navlink : 'Data Imports'  }
    })
	.state('settings.data-imports-upload', {
      url: "/data-imports-upload",
      templateUrl: "/templates/settings/data-imports-upload.html",
      controller: 'dataImportUploadCtrl',
          data : { pageTitle: 'top_links_Data_Imports', navlink : 'Data Imports'  }
    })
	.state('settings.data-imports-list', {
      url: "/data-imports-list",
      templateUrl: "/templates/settings/data-imports-list.html",
      controller: 'dataImportListCtrl',
          data : { pageTitle: 'top_links_Data_Imports', navlink : 'Data Imports'  }
    })
	.state('settings.data-export', {
      url: "/data-export",
      templateUrl: "/templates/settings/data-export.html",
      controller: 'dataExportCtrl',
          data : { pageTitle: 'top_links_Data_Exports', navlink : 'Data Export'  }
    })

	.state('settings.document-and-printing', {
      url: "/document-and-printing",
      templateUrl: "/templates/settings/document-and-printing.html",
      controller: 'docPrintCtrl',
          data : { pageTitle: 'top_links_Documents_Printing', navlink : 'Document & printing'  }
    })
	.state('settings.letter-templates', {
      url: "/letter-templates",
      templateUrl: "/templates/settings/letter-templates.html",
      controller: 'letterTemplateCtrl',
          data : { pageTitle: 'top_links_Letter_Templates', navlink : 'Letter Templates'  }
    })
	.state('settings.billable-items', {
      url: "/billable-items",
      templateUrl: "/templates/settings/billable-items.html",
      controller: 'billableItemCtrl',
          data : { pageTitle: 'Billable Items', navlink : 'Billable Items'  }
    })
  .state('settings.billable-items.info', {
      url: "/:bilable_id",
      templateUrl: "/templates/settings/billable-items-info.html",
      controller: 'billableItemChildCtrl',
          data : { pageTitle: 'top_links_Billable_Items', navlink : 'Billable Items'  }
    })
	.state('settings.appointment-reminders', {
      url: "/appointment-reminders",
      templateUrl: "/templates/settings/appointment-reminders.html",
      controller: 'appointmentReminderCtrl',
          data : { pageTitle: 'top_links_Appointment_Reminders', navlink : 'Appointment Reminders'  }
    })

  .state('products', {
      url: "/products",
      templateUrl: "/templates/products/products.html",
      controller: 'productCtrl',
          data : { pageTitle: 'product_page_title', navlink : 'Products'  }
  })
  .state('products.list', {
      url: "/list",
      templateUrl: "/templates/products/product-list.html",
      controller: 'productListCtrl',
          data : { pageTitle: 'product_page_title', navlink : 'Products'  }
  })
  .state('products.new', {
      url: "/new",
      templateUrl: "/templates/products/product-new.html",
      controller: 'productNew',
          data : { pageTitle: 'product_page_title', navlink : 'Products'  }
  })
  .state('expense', {
      url: "/expense",
      templateUrl: "/templates/expense/expense.html",
      controller: 'expenseCtrl',
          data : { pageTitle: 'expense_page_title', navlink : 'Products'  }
  })
  .state('communication', {
      url: "/communication",
      templateUrl: "/templates/communication/communication.html",
      controller: 'communicationCtrl',
          data : { pageTitle: 'Communiaction', navlink : 'Communication'  }
  })
  .state('contact', {
      url: "/contact",
      templateUrl: "/templates/contact/contact.html",
      controller: 'contactCtrl',
          data : { pageTitle: 'Contact', navlink : 'Contact'  }
  })
  .state('patient', {
      url: "/patient",
      templateUrl: "/templates/patient/patient.html",
      controller: 'PatientCtrl',
          data : { pageTitle: 'Patient', navlink : 'Patient'  }
  })
  .state('patient-edit', {
      url: "/patient-edit/:patient_id",
      templateUrl: "/templates/patient/patient-edit-form.html",
      controller: 'PatientEditCtrl',
          data : { pageTitle: 'Patient', navlink : 'Patient'  }
  })
  .state('patient-detail', {
      url: "/patient-detail/:patient_id",
      templateUrl: "/templates/patient/patient-detail.html",
      controller: 'PatientDetailCtrl',
          data : { pageTitle: 'Patient Detail', navlink : 'Patient Detail'  }
  });
     

});