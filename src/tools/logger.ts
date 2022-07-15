// TODO: replace with https://github.com/malex37/color-logger maybe?
class Logger {
  public debug(message: string) {
    console.debug(message);
  }
  public info(message: string) {
    console.info(message);
  }
  public error(message: string) {
    console.error(message);
  }
}

export const logger = new Logger();