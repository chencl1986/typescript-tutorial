export default function () {
    // 数字枚举
    var Direction;
    (function (Direction) {
        Direction[Direction["Up"] = 1] = "Up";
        Direction[Direction["Down"] = 2] = "Down";
        Direction[Direction["Left"] = 3] = "Left";
        Direction[Direction["Right"] = 4] = "Right";
    })(Direction || (Direction = {}));
    console.log(Direction.Up);
    var Response;
    (function (Response) {
        Response[Response["No"] = 0] = "No";
        Response[Response["Yes"] = 1] = "Yes";
    })(Response || (Response = {}));
    function respond(recipient, message) {
        // ...
    }
    respond('Princess Caroline', Response.Yes);
}
//# sourceMappingURL=TypeScript 7. Enums.js.map