/**
 * REFACTORIZACIÓN CASTORPAY
 * Demostración de descomposicion del antipatrón "El Dios"
 */

// Servicio de Validación
class ValidationService {
  static validatePaymentData(data) {
    if (!data.clientName || !data.email) throw new Error("Datos de cliente incompletos.");
    if (data.cardNumber.length !== 16) throw new Error("Número de tarjeta inválido (requiere 16 dígitos).");
    if (data.amount <= 0) throw new Error("El monto debe ser mayor a 0.");
    return true;
  }
}

// Servicio de Base de Datos / Transacción
class TransactionService {
  static async processPayment(amount, cardNumber) {
    // Simulación de respuesta de BD / Gateway
    return {
      transactionId: "TX-" + Math.floor(Math.random() * 1000000),
      status: "APPROVED",
      timestamp: new Date().toISOString()
    };
  }
}

// Servicio de Notificaciones
class NotificationService {
  static sendReceiptEmail(email, transactionId) {
    return `Notificación enviada a ${email} para el pago ${transactionId}`;
  }
}

// 4. Servicio de Facturación
class BillingService {
  static generateInvoice(clientName, amount, transactionId) {
    return `Factura generada exitosamente para ${clientName} por un total de $${amount} (ID: ${transactionId})`;
  }
}

// ORQUESTADOR (Controlador de Interfaz)
document.getElementById('paymentForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const logContainer = document.getElementById('logs');
  logContainer.innerHTML = "";

  const appendLog = (msg, isSuccess = false) => {
    const p = document.createElement('p');
    p.className = `log-entry ${isSuccess ? 'success' : ''}`;
    p.innerText = `[${new Date().toLocaleTimeString()}] ${msg}`;
    logContainer.appendChild(p);
  };

  const paymentData = {
    clientName: document.getElementById('clientName').value,
    email: document.getElementById('email').value,
    cardNumber: document.getElementById('cardNumber').value,
    amount: parseFloat(document.getElementById('amount').value)
  };

  try {
    // Paso 1: Validación
    appendLog(" [ValidationService] Validando datos de entrada...");
    ValidationService.validatePaymentData(paymentData);

    // Paso 2: Procesamiento
    appendLog(" [TransactionService] Conectando con la pasarela...");
    const txResult = await TransactionService.processPayment(paymentData.amount, paymentData.cardNumber);
    appendLog(` Transacción Aprobada: ${txResult.transactionId}`, true);

    // Paso 3: Notificación
    appendLog("[NotificationService] Generando aviso...");
    const notifMsg = NotificationService.sendReceiptEmail(paymentData.email, txResult.transactionId);
    appendLog(notifMsg);

    // Paso 4: Facturación
    appendLog(" [BillingService] Procesando comprobante...");
    const billMsg = BillingService.generateInvoice(paymentData.clientName, paymentData.amount, txResult.transactionId);
    appendLog(billMsg, true);

    appendLog(" ¡Proceso de pago finalizado con éxito!", true);

  } catch (error) {
    appendLog(` ERROR: ${error.message}`);
  }
});