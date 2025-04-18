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

const tests = [exampleTest, testPathStepReverseIfTurn];
runTests(tests);
