import { LogLevel, Environment, OutputFormat, SupportedLang } from '@smdv/logger';
import { Logger } from '@smdv/logger/dist/logger';

// Cargar variables de entorno



// Inicialización del logger con configuración personalizada
const logger = new Logger({
  level: LogLevel.DEBUG,
  lang: SupportedLang.ES,
  service: 'AttachmentService',
  environment: Environment.LOCAL,
  outputFormat: OutputFormat.JSON
});

export default logger;