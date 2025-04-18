
/**
* Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/

//% weight=100 color=#0fbc11 icon=""
namespace PathTools {
    
    export class PathStep {
        movement:string;
        amount: number;

        constructor(movement:string, amount:number){
            this.movement = movement;
            this.amount = amount;
        }

        reverseIfTurn():PathStep {
            if (this.movement === "right"){
                return new PathStep("left", this.amount);
            }
            else if(this.movement === "left"){
                return new PathStep("right", this.amount);
            }
            else {
                return this;
            }
        }
    }

    export class Path {
        pathSteps:PathStep[];

        constructor() {
            this.pathSteps = [];
        }

        //% block="path $this add step $movement $amount"
        addNewPathStep(movement: string, amount: number): void {
            this.pathSteps.push(new PathStep(movement, amount))
        }

        addExistingPathStep(step: PathStep): void {
            this.pathSteps.push(step);
        }

        //% block="path $this create return path"
        createReturnPath():Path{
            let returnPath:Path = new Path();
            for(let i=0; i<this.pathSteps.length; i++){
                returnPath.addExistingPathStep(this.pathSteps[i].reverseIfTurn());
            } 
            returnPath.pathSteps.reverse();
            return returnPath;
        }
    }

    //% block
    export function createEmptyPath(): Path {
        return new Path();
    }
}

namespace FinchPathTools{
    
    function finchTakePathStep(pathStep: PathTools.PathStep):void {
        if(pathStep.movement === "forward"){
            finch.setMove(MoveDir.Forward, pathStep.amount);
        }
        else if (pathStep.movement === "backward") {
            finch.setMove(MoveDir.Backward, pathStep.amount);
        }
        else if (pathStep.movement === "right") {
            finch.setTurn(RLDir.Right, pathStep.amount);
        }
        else if (pathStep.movement === "left") {
            finch.setTurn(RLDir.Left, pathStep.amount);
        }
        else{
            basic.showString("Unrecognized PathStep.movement: " + pathStep.movement);
        }
    }

    //% block
    export function finchFollowPath(path: PathTools.Path){
        path.pathSteps.forEach(finchTakePathStep);
    }
}
