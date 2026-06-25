function requestLogger(request, response, next) {
  const horario = new Date().toLocaleTimeString("pt-BR");
  console.log(`[${horario}] ${request.method} ${request.originalUrl}`);
  next();
}

export default requestLogger;
