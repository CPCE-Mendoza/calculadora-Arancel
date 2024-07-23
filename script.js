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
      'body': `Importe Base De Búsqueda: $${formattedImporteBase}\nArancel Fijo: $${formattedArancel}
El Arancel Es Para Los Siguientes Trámites:\n
Estados Contables Soc. Comerciales\n
Estados Contables Entidades Sin F/ Lucros\n
Estados Contables De Cooperativa\n
Estados Contables Intermedios\n
Compilación\n
Estados Contables Especiales\n
Rectificativo - Estados Contables Soc. Comerciales\n
Rectificativo - Estados Contables Entidades Sin F/ Lucros\n
Rectificativo - Estados Contables De Cooperativa\n
Rectificativo - Estados Contables Intermedios\n
Rectificativo - Compilación\n
Rectificativo - Estados Contables Especiales\n
Incluye Dos Trámites Con Diferentes Destinatarios.\n
Te Esperamos En Mi Cuenta Para Gestionar El Trámite`
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
    '<<p>Estados Contables Soc. Comerciales</p>' +
    '<p>Estados Contables Entidades Sin F/ Lucros</p>' +
    '<p>Estados Contables De Cooperativa</p>' +
    '<p>Estados Contables Intermedios</p>' +
    '<p>Compilación</p>' +
    '<p>Estados Contables Especiales</p>' +
    '<p>Rectificativo - Estados Contables Soc. Comerciales</p>' +
    '<p>Rectificativo - Estados Contables Entidades Sin F/ Lucros</p>' +
    '<p>Rectificativo - Estados Contables De Cooperativa</p>' +
    '<p>Rectificativo - Estados Contables Intermedios</p>' +
    '<p>Rectificativo - Compilación</p>' +
    '<p>Rectificativo - Estados Contables Especiales</p>' +
    '<p>Incluye Dos Trámites Con Diferentes Destinatarios.</p>' +
    '<p>Te Esperamos En Mi Cuenta Para Gestionar El Trámite</p>';
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
