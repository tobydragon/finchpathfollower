// just an eample of how you can fail a test, and how you can write output
// to see a failing test, change the value of x
function exampleTest():void{
    let x = 5;
    if (x===5){
        console.log("Example Test is all good");
    }
    else {
        throw "Testing how to show an error";
    }
}

function testPathStepReverseIfTurn(){
    const pathStep = new PathTools.PathStep("Right", 2);
    assertEqual("hi", "hi");

}
//--------------- generic testing functions ------------------//
function assertEqual(expected: any, actual: any) {
    if (expected !== actual) {
        throw "AssertEquals failed. Expected:" + expected + " Actual:" + actual;
    }
}

function runTests(testsToRun:(()=>void)[]){
    let passedTestCount = 0;
    let failedTestCount = 0;
    let failMessages:string[] = [];
    for(let i=0; i<testsToRun.length; i++){
        try{
            testsToRun[i]();
            passedTestCount++;
        }
        catch(e){
            failedTestCount++;
            failMessages.push(e);
        }
    }
    console.log("Passed " + passedTestCount + " tests");
    if (failedTestCount > 0){
        throw "Failed " + failedTestCount + " tests:" + failMessages.join("\n");
    }
}

const tests = [exampleTest, testPathStepReverseIfTurn];
runTests(tests);
