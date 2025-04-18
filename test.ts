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

exampleTest();