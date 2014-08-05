describe('angularjs homepage', function() {

    //: Example
    // 1. Get elements by model
    // 2. Get elements by id
    // 3. Get elements by binding
    var firstNumber = element(by.model('first'));
    var secondNumber = element(by.model('second'));
    var goButton = element(by.id('gobutton'));
    var latestResult = element(by.binding('latest'));


    var history = element.all(by.repeater('result in memory'));

    function add(a, b) {
        firstNumber.sendKeys(a);
        secondNumber.sendKeys(b);
        goButton.click();
    }

    beforeEach(function() {
        browser.get('http://juliemr.github.io/protractor-demo/');
    });

    it('should have a title', function() {
        expect(browser.getTitle()).toEqual('Super Calculator');
    });

    it('should add one and two', function() {
        firstNumber.sendKeys(1);
        secondNumber.sendKeys(2);
        //Click event
        goButton.click();
        expect(latestResult.getText()).toEqual('3');
    });

    it('should add four and six', function() {
        firstNumber.sendKeys(4);
        secondNumber.sendKeys(6);
        //Click event
        goButton.click();
        expect(latestResult.getText()).toEqual('10');
    });

    it('should have a history of a specific length', function() {
        add(1, 2);
        add(3, 4);

        expect(history.count()).toEqual(2);

        add(5, 6);

        expect(history.count()).toEqual(3);
    });

    it('Last and first history elements shopuld be correct', function() {
        add(1, 2);
        add(3, 4);

        expect(history.last().getText()).toContain('1 + 2');
        expect(history.first().getText()).toContain('3 + 4'); // This is wrong!
    });


});


/*
describe('gch-ng-testsuite hoempage', function() {

    it('Should have a title', function() {
        browser.get('http://127.0.0.1:9000/');
        expect(browser.getTitle()).toEqual('gch-ng-testsuite');
    });

});*/
