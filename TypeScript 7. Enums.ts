export default function (): void {
  // 数字枚举

  enum Direction {
    Up = 1,
    Down,
    Left,
    Right
  }
  console.log(Direction.Up)

  enum Response {
    No = 0,
    Yes = 1,
  }

  function respond(recipient: string, message: Response): void {
    // ...
  }

  respond('Princess Caroline', Response.Yes)
}