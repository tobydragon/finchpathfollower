function followLine () {
    basic.showLeds(`
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        `)
    while (amFollowingLine) {
        while (finch.getLine(RLDir.Right) < 90) {
            finch.setTurn(RLDir.Right, 2, 100)
            linePath.addNewPathStep("right", 2)
        }
        while (finch.getLine(RLDir.Left) < 90) {
            finch.setTurn(RLDir.Left, 2, 100)
            linePath.addNewPathStep("left", 2)
        }
        finch.setMove(MoveDir.Forward, 1, 100)
        linePath.addNewPathStep("forward", 1)
    }
}
input.onButtonPressed(Button.A, function () {
    amFollowingLine = 1
    followLine()
})
input.onButtonPressed(Button.B, function () {
    basic.showLeds(`
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        `)
    amFollowingLine = 0
    finch.setTurn(RLDir.Right, 180, 50)
    FinchPathTools.finchFollowPath(linePath.createReturnPath())
})
let linePath: PathTools.Path = null
let amFollowingLine = 0
amFollowingLine = 0
linePath = PathTools.createEmptyPath()
finch.startFinch()
