import { Environment, OutputFormat, SupportedLang } from "@smdv/logger";
import { Logger } from "@smdv/logger/dist/logger";

const logger = new Logger({
  service: 'TestingApp',
  environment: Environment.LOCAL,
  outputFormat: OutputFormat.JSON,
  lang: SupportedLang.ES,
});

export default logger;
