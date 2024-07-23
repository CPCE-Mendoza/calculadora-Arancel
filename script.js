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
      var url = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

      var payload = {
          'recipient': recipient,
          'subject': 'Resultado del Cálculo',
          'body': `Importe Base de Búsqueda: $${formattedImporteBase}\nArancel Fijo: $${formattedArancel}`
      };

      fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: Object.keys(payload)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(payload[key]))
            .join('&')
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
    '<p><b>Arancel Fijo:</b> $' + formattedArancel + '</p>';
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
