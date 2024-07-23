document.getElementById('arancelForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  var activo = formatToNumber(document.getElementById('activo').value);
  var pasivo = formatToNumber(document.getElementById('pasivo').value);
  var ingresos = formatToNumber(document.getElementById('ingresos').value);

  calcularArancel(activo, pasivo, ingresos);
});

document.getElementById('enviarMail').addEventListener('click', function() {
  var activo = formatToNumber(document.getElementById('activo').value);
  var pasivo = formatToNumber(document.getElementById('pasivo').value);
  var ingresos = formatToNumber(document.getElementById('ingresos').value);

  var importeBaseBusqueda = (activo + pasivo + ingresos) / 2;

  var arancel;
  if (importeBaseBusqueda <= 30000000) {
    arancel = 65000;
  } else if (importeBaseBusqueda <= 120000000) {
    arancel = 78000;
  } else if (importeBaseBusqueda <= 500000000) {
    arancel = 95000;
  } else if (importeBaseBusqueda <= 2000000000) {
    arancel = 115000;
  } else {
    arancel = 135000;
  }

  var formattedImporteBase = formatNumber(importeBaseBusqueda);
  var formattedArancel = formatNumber(arancel);

  var recipient = prompt("Introduce el email del destinatario:", "destinatario@example.com");

  if (recipient) {
    var url = 'https://script.google.com/macros/s/AKfycbw3AqYbVEEF5ByaCxRfrtPo_xafEVM7d0vGGlZ52unDtvbifwTAMHKa2XJNgz_u_jAr0w/exec'; // Asegúrate de usar el ID correcto

    var payload = {
      'recipient': recipient,
      'subject': 'Resultado Calculadora de Arancel CPCE Mendoza',
      'body': `Importe Base de Búsqueda: $${formattedImporteBase}\nArancel Fijo: $${formattedArancel}
El arancel es para los siguientes trámites:\n
ESTADOS CONTABLES SOC. COMERCIALES\n
ESTADOS CONTABLES ENTIDADES SIN F/ LUCROS\n
ESTADOS CONTABLES DE COOPERATIVA\n
ESTADOS CONTABLES INTERMEDIOS\n
COMPILACIÓN\n
ESTADOS CONTABLES ESPECIALES\n
RECTIFICATIVO - ESTADOS CONTABLES SOC. COMERCIALES\n
RECTIFICATIVO - ESTADOS CONTABLES ENTIDADES SIN F/ LUCROS\n
RECTIFICATIVO - ESTADOS CONTABLES DE COOPERATIVA\n
RECTIFICATIVO - ESTADOS CONTABLES INTERMEDIOS\n
RECTIFICATIVO - COMPILACIÓN\n
RECTIFICATIVO - ESTADOS CONTABLES ESPECIALES\n
Incluye dos trámites con diferentes destinatarios.\n
Te esperamos en Mi Cuenta para gestionar el trámite`
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(payload).toString() // Usa URLSearchParams para manejar el formato
    })
    .then(response => response.text())
    .then(result => {
      alert('Correo enviado exitosamente');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error al enviar el correo');
    });
  }
});

document.getElementById('otraConsulta').addEventListener('click', function() {
  document.getElementById('arancelForm').reset();
  document.getElementById('resultado').innerHTML = '';
});

document.querySelectorAll('input[type="text"]').forEach(input => {
  input.addEventListener('input', function() {
    var value = this.value;
    // Reemplazar caracteres no numéricos, excepto la coma
    this.value = value.replace(/[^0-9,]/g, '');
    // Formatear el número
    if (this.value) {
      this.value = formatNumber(formatToNumber(this.value));
    }
  });
});

function calcularArancel(activo, pasivo, ingresos) {
  var importeBaseBusqueda = (activo + pasivo + ingresos) / 2;

  var arancel;
  if (importeBaseBusqueda <= 30000000) {
    arancel = 65000;
  } else if (importeBaseBusqueda <= 120000000) {
    arancel = 78000;
  } else if (importeBaseBusqueda <= 500000000) {
    arancel = 95000;
  } else if (importeBaseBusqueda <= 2000000000) {
    arancel = 115000;
  } else {
    arancel = 135000;
  }

  var formattedImporteBase = formatNumber(importeBaseBusqueda);
  var formattedArancel = formatNumber(arancel);

  document.getElementById('resultado').innerHTML =
    '<p><b>Importe Base de Búsqueda:</b> $' + formattedImporteBase + '</p>' +
    '<p><b>Arancel Fijo:</b> $' + formattedArancel + '</p>' +
    '<p>El arancel es para los siguientes trámites:</p>' +
    '<p>ESTADOS CONTABLES SOC. COMERCIALES</p>' +
    '<p>ESTADOS CONTABLES ENTIDADES SIN F/ LUCROS</p>' +
    '<p>ESTADOS CONTABLES DE COOPERATIVA</p>' +
    '<p>ESTADOS CONTABLES INTERMEDIOS</p>' +
    '<p>COMPILACIÓN</p>' +
    '<p>ESTADOS CONTABLES ESPECIALES</p>' +
    '<p>RECTIFICATIVO - ESTADOS CONTABLES SOC. COMERCIALES</p>' +
    '<p>RECTIFICATIVO - ESTADOS CONTABLES ENTIDADES SIN F/ LUCROS</p>' +
    '<p>RECTIFICATIVO - ESTADOS CONTABLES DE COOPERATIVA</p>' +
    '<p>RECTIFICATIVO - ESTADOS CONTABLES INTERMEDIOS</p>' +
    '<p>RECTIFICATIVO - COMPILACIÓN</p>' +
    '<p>RECTIFICATIVO - ESTADOS CONTABLES ESPECIALES</p>' +
    '<p>Incluye dos trámites con diferentes destinatarios.</p>' +
    '<p>Te esperamos en Mi Cuenta para gestionar el trámite</p>';
}

function formatNumber(number) {
  // Asegurar que el número sea positivo y tenga hasta 2 decimales
  var parts = number.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  if (parts[1]) {
    parts[1] = parts[1].substring(0, 2); // Limitar a 2 decimales
  }
  return parts.join(',');
}

function formatToNumber(value) {
  // Convertir el valor formateado de nuevo a número
  return parseFloat(value.replace(/\./g, '').replace(',', '.')) || 0;
}
