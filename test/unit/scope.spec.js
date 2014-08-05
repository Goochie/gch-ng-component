/**
 * Author : Bill Gooch
 * Tests taking from the official angular documentation   https://docs.angularjs.org/api/ng/type/$rootScope.Scope
 * It illustrates how scope.apply and digest() work with their the subsequent life cycle
 * Whilst also providing understanding on how to use when unit testing
 * Pretty neat .....
 *
 */
describe('Illustration of the scope life cycle', function(){

    var rootScope;

    beforeEach(function(){
        inject(function($rootScope) {
            rootScope = $rootScope;

        });
    });


     it('Inheritance',function(){

         var parent = rootScope;
         var child = parent.$new();

         parent.salutation = "Hello";
         child.name = "World";
         expect(child.salutation).toEqual('Hello');

         child.salutation = "Welcome";
         expect(child.salutation).toEqual('Welcome');
         expect(parent.salutation).toEqual('Hello');


     })

    it('$Scope.$watch()', function(){

        // let's assume that scope was dependency injected as the $rootScope
        var scope = rootScope;
        scope.name = 'misko';
        scope.counter = 0;

        expect(scope.counter).toEqual(0);
        scope.$watch('name', function(newValue, oldValue) {
            scope.counter = scope.counter + 1;
        });
        expect(scope.counter).toEqual(0);

        scope.$digest();
        // the listener is always called during the first $digest loop after it was registered
        expect(scope.counter).toEqual(1);

        scope.$digest();
        // but now it will not be called unless the value changes
        expect(scope.counter).toEqual(1);

        scope.name = 'adam';
        scope.$digest();
        expect(scope.counter).toEqual(2);


        // Using a listener function
        var food;
        scope.foodCounter = 0;
        expect(scope.foodCounter).toEqual(0);
        scope.$watch(
            // This is the listener function
            function() { return food; },
            // This is the change handler
            function(newValue, oldValue) {
                if ( newValue !== oldValue ) {
                    // Only increment the counter if the value changed
                    scope.foodCounter = scope.foodCounter + 1;
                }
            }
        );
        // No digest has been run so the counter will be zero
        expect(scope.foodCounter).toEqual(0);

        // Run the digest but since food has not changed count will still be zero
        scope.$digest();
        expect(scope.foodCounter).toEqual(0);

        // Update food and run digest.  Now the counter will increment
        food = 'cheeseburger';
        scope.$digest();
        expect(scope.foodCounter).toEqual(1);

    })

    it('$watchCollection(obj, listener)', function(){

        var $scope = rootScope.$new();

        $scope.names = ['igor', 'matias', 'misko', 'james'];
        $scope.dataCount = 4;

        $scope.$watchCollection('names', function(newNames, oldNames) {
            $scope.dataCount = newNames.length;
        });

        expect($scope.dataCount).toEqual(4);
        $scope.$digest();

        //still at 4 ... no changes
        expect($scope.dataCount).toEqual(4);

        $scope.names.pop();
        $scope.$digest();

        //now there's been a change
        expect($scope.dataCount).toEqual(3);

    })

    it('$digest()', function(){

        var scope  = rootScope.$new();
        scope.name = 'misko';
        scope.counter = 0;

        expect(scope.counter).toEqual(0);
        scope.$watch('name', function(newValue, oldValue) {
            scope.counter = scope.counter + 1;
        });
        expect(scope.counter).toEqual(0);

        scope.$digest();
        // the listener is always called during the first $digest loop after it was registered
        expect(scope.counter).toEqual(1);

        scope.$digest();
        // but now it will not be called unless the value changes
        expect(scope.counter).toEqual(1);

        scope.name = 'adam';
        scope.$digest();
        expect(scope.counter).toEqual(2);


    })

    it('$eval',function(){

        var scope = rootScope.$new();
        scope.a = 1;
        scope.b = 2;

        expect(scope.$eval('a+b')).toEqual(3);
        expect(scope.$eval(function(scope){ return scope.a + scope.b; })).toEqual(3);

    })


});


