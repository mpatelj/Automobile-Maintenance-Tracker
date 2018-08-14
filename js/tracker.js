/*	
Service Order Class
Properties of each service orders are defined such as car type, make, model, year, etc.
*/
function ServiceOrder(data) {
    var self = this;
    self.originalData = ko.toJSON(data);

    self.data = data;
    self.serviceId = ko.observable();
    self.type = ko.observable('');
    self.make = ko.observable('');
    self.model = ko.observable('');
    self.year = ko.observable(0);
    self.odometer = ko.observable('');
    self.maintenance = ko.observableArray([]);

	// Function to assign values to each property
    self.add = function() {
        self.serviceId(self.data.serviceId);
        self.type(self.data.type);
        self.make(self.data.make);
        self.model(self.data.model);
        self.year(self.data.year);
        self.odometer(self.data.odometer);
        self.maintenance(self.data.maintenance);
    };

	// If there is existing data, call function to assign values
    if(self.data != undefined) self.add();
}

/*
Service Orders Manager keeps track of each Service Order
Functions for adding, updating and deleting service orders are handled by this Manager class
*/

function AutomobileTrackerManager(){
    var self = this;
	
	// All service orders
    self.serviceOrders = ko.observableArray([]);
    
	// Observable to show New/Existing service order modal
	self.showNewOrderModal = ko.observable(false);
    
	// Keep track of new/existing service order
    self.isNewOrder = ko.observable(false);
    self.newCarData = ko.observableArray([]);
    self.oldOrder = ko.observable();
	
	// Keep track of selected values in input dropdown for Car type, make and model
    self.selectedType = ko.observable();
    self.selectedMake = ko.observable();
    self.selectedModel = ko.observable();

	// Keep track of sorting order for each column
    self.columnHeadersSortOrder = {
        'serviceId' : 'asc',
        'type' : 'asc',
        'make' : 'asc',
        'model' : 'asc',
        'year' : 'asc',
        'odometer' : 'asc' 
    };

	// Year list options for select input
    self.yearOptions = _.range(2005, 2019);
	
	// Maintenance tasks list options for select input
    self.maintenanceList = ko.observableArray([
        'Interior Cleaning',
        'Oil Change',
        'Tire Rotation',
        'Wheel Alignment',
        'Wheel Change'
    ]);
	
	// Data used for preparing data for each car based on type and make
    self.list = [{
        type: 'Gas',
        cars: [{
            make: "Honda",
            model: ['Civic','Pilot','CRV']
        }, {
            make: "BMW",
            model: ['325i','525i','725i']
        }]
    }, {
        type: 'Diesel',
        cars: [{
            make: "Ford",
            model: ['Focus','Fusion','F350']
        }, {
            make: "Dodge",
            model: ['RAM','Charger','Challenger']
        }]
    }, {
        type: 'Electric',
        cars: [{
            make: "Tesla",
            model: ['PSD200','PS300','Model C']
        }, {
            make: "Jaguar",
            model: ['GS200','GY300']
        }]
    }];

	// Filter car make list based on car type selected
    self.makeList = ko.computed(function () {
        var type = self.selectedType();
        var filtered = ko.utils.arrayFirst(self.list, function (item) {
            return item.type == type;
        });
        if (!filtered) {
            return []
        } else {
            return filtered.cars;
        }
    });

	// Filter car model list based on car type and make selected
    self.modelList = ko.computed(function () {
        var selectedMake = self.selectedMake();

        var makeList = self.makeList();

        var filtered = ko.utils.arrayFirst(makeList, function (car) {
            return car.make == selectedMake;
        });
        if (!filtered) {
            return []
        } else {
            return filtered.model;
        }
    });

	// Prepare service orders data based on existing data provided
    _.each(serviceOrderData, function (serviceOrder) {
        self.serviceOrders().push(new ServiceOrder(serviceOrder)); 
    });

	// Set the values for car type, make and model based on input selection which will be used for new/existing service order data
    self.setValues = ko.computed(function() {
        if(self.newCarData().length > 0) {
            if("type" in self.newCarData()[0]) self.newCarData()[0].type(self.selectedType());
            if("make" in self.newCarData()[0]) self.newCarData()[0].make(self.selectedMake());
            if("year" in self.newCarData()[0]) self.newCarData()[0].model(self.selectedModel());
        }
    });

	// Create new service order 
    self.createOrder = function() {
        self.isNewOrder(true);
        self.showNewOrderModal(true);
        self.newCarData.push(new ServiceOrder());
        self.newCarData()[0].serviceId(_.random(2000, 4000));
    };

	// Push new service order
    self.addOrder = function() {
        // If car type is Electric then pluck out the oil change from the maintenance List if selected
		self.removeOilChange();
		
		// Convert odometer to Integer value
		self.convertOdometerDataType();

        self.newCarData()[0].data = ko.toJS(self.newCarData()[0]);
        self.serviceOrders.push(self.newCarData()[0]);

		// Status message for successful service order addition
        toastr.success('Service Order Added');
		
		// Clear form data 
        self.revertData();
    };

	// Setup the form based on existing service order data
    self.editOrder = function(data){
        self.isNewOrder(false);
        self.oldOrder(data);

        self.selectedType(data.type());
        self.selectedMake(data.make());
        self.selectedModel(data.model());
        
        self.newCarData.push(new ServiceOrder(data.data));
    };

    self.updateOrder = function(){
        // If car type is Electric then pluck out the oil change from the maintenance List if selected
		self.removeOilChange();

		// Convert odometer to Integer value
		self.convertOdometerDataType();
		
        self.newCarData()[0].data = ko.toJS(self.newCarData()[0]);
        self.serviceOrders.replace(self.oldOrder(), self.newCarData()[0]);

		// Status message for successful service order update
        toastr.info('Service Order Updated');
		
		// Clear form data 
        self.revertData();
    };

	// If car type is Electric
    self.ifElectric = ko.computed(function() {
        return self.selectedType() == "Electric";
    });

	// If car type is Electric then remove Oil change option
    self.filterOilChange = function(data) {
        return _.filter(data, function(item) {
            return !self.ifElectric() || (self.ifElectric()  && item != "Oil Change");
        })
    };

	// If car type is Electric then remove Oil change and if not then add it to the list if not in the list
    self.modifyMaintanceList = ko.computed(function() {
        self.maintenanceList(self.filterOilChange(self.maintenanceList()));

        if(!self.ifElectric()) {
            self.maintenanceList.push("Oil Change");
			// Remove duplicate items in the maintenance list
            self.maintenanceList(_.uniq(self.maintenanceList()));
        }
    });
	
	// Filter out Oil change if car type is Electric
    self.removeOilChange = function() {
        self.newCarData()[0]['maintenance'](self.filterOilChange(self.newCarData()[0]['maintenance']()));
    };
	
	// Convert odometer to Integer value
	self.convertOdometerDataType = function() {
		self.newCarData()[0]['odometer'](parseInt(self.newCarData()[0]['odometer']()));
	};

	// Delete service order
    self.removeOrder = function (order) {
        self.serviceOrders.remove(order);
		
		// Status message for successful service order deletion
        toastr.error('Service Order Deleted');

		// Hide Delete service order modal
        $('#modalConfirmDelete' + order.serviceId()).modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    };

	// Revert data for new/existing service order
    self.revertData = function() {
        self.isNewOrder(false);
        self.newCarData([]);
        self.selectedType('');
        self.selectedMake('');
        self.selectedModel('');
    }

	// Sort the table based on selected column
    self.sortData = function(column) {
        if(self.columnHeadersSortOrder[column] == "asc") self.serviceOrders(self.sortByColumn(column));
        else self.serviceOrders(self.sortByColumn(column).reverse());

        self.toggleSortValue(column);
    };

	// Keep track of sort order for each sortable columns
    self.toggleSortValue = function(column) {
        self.columnHeadersSortOrder[column] == "asc" ? self.columnHeadersSortOrder[column] = "desc" : self.columnHeadersSortOrder[column] = "asc";
    }

	// Sort data based on selected column
    self.sortByColumn = function(column) {
        return self.serviceOrders().sort(function(a, b) {
            return (typeof a[column]() == "string") ? a[column]().localeCompare(b[column]()) : (a[column]() - b[column]());
        });
    };
}

// Apply bindings
var automobileTrackerManager = new AutomobileTrackerManager();
ko.applyBindings(automobileTrackerManager);