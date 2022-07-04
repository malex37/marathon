// TODO: replace with https://github.com/malex37/color-logger maybe?
class Logger {
  public debug(message: string) {
    console.debug(message);
  }
  public info(message: string) {
    console.info(message);
  }
}

export const logger = new Logger();