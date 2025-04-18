// just an example of how you can fail a test, and how you can write output
// to see it work, add it to the "tests" list at the bottom of the file
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

function testPathCreateReturnPath(){
    let path:PathTools.Path = new PathTools.Path();
    path.addNewPathStep("forward", 2);
    path.addNewPathStep("forward", 2);
    path.addNewPathStep("right", 90);
    path.addNewPathStep("forward", 2);
    path.addNewPathStep("forward", 2);
    path.addNewPathStep("left", 90);
    path.addNewPathStep("left", 90);
    path.addNewPathStep("forward", 2);

    let returnPath:PathTools.Path = path.createReturnPath();
    let returnMovements:string[] = returnPath.pathSteps.map(pathStep=>pathStep.movement);
    let expected: String[] = ["forward", "right", "right", "forward", "forward", "left", "forward", "forward"]
    assertEqual("testPathCreateReturnPath", expected.length, returnMovements.length);
    for (let i=0; i<expected.length; i++){
        assertEqual("testPathCreateReturnPath", expected[i], returnMovements[i]);
    }
}

function testPathStepReverseIfTurn(){
    let pathStep = new PathTools.PathStep("right", 3);
    let revStep = pathStep.reverseIfTurn();
    assertEqual("testPathStepReverseIfTurn", "left", revStep.movement);
    assertEqual("testPathStepReverseIfTurn", 3, revStep.amount);
    assertEqual("testPathStepReverseIfTurn", "right", pathStep.movement);
    assertEqual("testPathStepReverseIfTurn", 3, pathStep.amount);

    pathStep = new PathTools.PathStep("left", 5);
    revStep = pathStep.reverseIfTurn();
    assertEqual("testPathStepReverseIfTurn", "right", revStep.movement);
    assertEqual("testPathStepReverseIfTurn", 5, revStep.amount);
    assertEqual("testPathStepReverseIfTurn", "left", pathStep.movement);
    assertEqual("testPathStepReverseIfTurn", 5, pathStep.amount);

    pathStep = new PathTools.PathStep("forward", 7);
    revStep = pathStep.reverseIfTurn();
    assertEqual("testPathStepReverseIfTurn", "forward", revStep.movement);
    assertEqual("testPathStepReverseIfTurn", 7, revStep.amount);
    assertEqual("testPathStepReverseIfTurn", "forward", pathStep.movement);
    assertEqual("testPathStepReverseIfTurn", 7, pathStep.amount);

}



//--------------- generic testing functions ------------------//
function assertEqual(testName:string, expected: any, actual: any) {
    if (expected !== actual) {
        throw testName + " failed. Expected:" + expected + " Actual:" + actual;
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
        throw "Failed " + failedTestCount + " tests:\n" + failMessages.join("\n");
    }
}

const tests = [testPathStepReverseIfTurn, testPathCreateReturnPath];
runTests(tests);
