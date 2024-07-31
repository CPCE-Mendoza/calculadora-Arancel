document.addEventListener('DOMContentLoaded', () => {
  const initialForm = document.getElementById('initialForm');
  const arancelForm = document.getElementById('arancelForm');
  const initialScreen = document.getElementById('initialScreen');
  const calculatorScreen = document.getElementById('calculatorScreen');
  const simpleResultScreen = document.getElementById('simpleResultScreen');
  const resultado = document.getElementById('resultado');

  initialForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const tipoTramite = document.getElementById('tipoTramite').value;
    const tiposConCalculadora = [
      "Estados Contables Soc. Comerciales",
      "Estados Contables Entidades Sin F/ Lucros",
      "Estados Contables De Cooperativa",
      "Estados Contables Intermedios",
      "Compilación",
      "Estados Contables Especiales",
      "Rectificativo"
    ];

    if (tiposConCalculadora.includes(tipoTramite)) {
      initialScreen.style.display = 'none';
      calculatorScreen.style.display = 'block';
    } else {
      initialScreen.style.display = 'none';
      simpleResultScreen.style.display = 'block';
      document.getElementById('simpleResult').innerHTML = `
        <p><b>Trámite:</b> ${tipoTramite}</p>
        <p>El valor del trámite es $38.000</p>
        <button type="button" id="enviarMailSimple">Enviar por Mail</button>
        <button type="button" id="otraConsultaSimple">Otra Consulta</button>
      `;
      document.getElementById('enviarMailSimple').addEventListener('click', () => enviarMail(false));
      document.getElementById('otraConsultaSimple').addEventListener('click', () => {
        simpleResultScreen.style.display = 'none';
        initialScreen.style.display = 'block';
        document.getElementById('simpleResult').innerHTML = '';
      });
    }
  });

  arancelForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const activo = formatToNumber(document.getElementById('activo').value);
    const pasivo = formatToNumber(document.getElementById('pasivo').value);
    const ingresos = formatToNumber(document.getElementById('ingresos').value);

    calcularArancel(activo, pasivo, ingresos);
  });

  document.getElementById('enviarMail').addEventListener('click', () => enviarMail(true));
  document.getElementById('otraConsulta').addEventListener('click', () => {
    arancelForm.reset();
    calculatorScreen.style.display = 'none';
    initialScreen.style.display = 'block';
    resultado.innerHTML = '';
  });

  document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('input', function() {
      let value = this.value;
      // Reemplazar caracteres no numéricos y comas
      value = value.replace(/[^0-9,]/g, '');
      // Formatear el número
      this.value = formatNumber(formatToNumber(value));
    });
  });

  function calcularArancel(activo, pasivo, ingresos) {
    const importeBaseBusqueda = (activo + pasivo + ingresos) / 2;
    let arancel;

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

    const formattedImporteBase = formatNumber(importeBaseBusqueda);
    const formattedArancel = formatNumber(arancel);

    resultado.innerHTML = `
      <p><b>Importe Base de Búsqueda:</b> $${formattedImporteBase}</p>
      <p><b>Arancel Fijo:</b> $${formattedArancel}</p>
      <p>El arancel es para los siguientes trámites:</p>
      <ul>
        <li>Estados contables soc. comerciales</li>
        <li>Estados contables entidades sin f/ lucros</li>
        <li>Estados contables de cooperativa</li>
        <li>Estados contables intermedios</li>
        <li>Compilación</li>
        <li>Estados contables especiales</li>
        <li>Rectificativos</li>
      </ul>
      <p>Incluye dos trámites con diferentes destinatarios.</p>
      <p>Te esperamos en Mi Cuenta para gestionar el trámite.</p>
      <p><a href="https://micuenta.cpcemza.org.ar/" target="_blank"><button>Ingresar a Mi Cuenta</button></a></p>`;
  }

  function enviarMail(isCalculator) {
    const tipoTramite = document.getElementById('tipoTramite').value;
    let body;

    if (isCalculator) {
      const activo = formatToNumber(document.getElementById('activo').value);
      const pasivo = formatToNumber(document.getElementById('pasivo').value);
      const ingresos = formatToNumber(document.getElementById('ingresos').value);
      const importeBaseBusqueda = (activo + pasivo + ingresos) / 2;
      let arancel;

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

      const formattedImporteBase = formatNumber(importeBaseBusqueda);
      const formattedArancel = formatNumber(arancel);

      body = `Importe Base De Búsqueda: $${formattedImporteBase}\nArancel Fijo: $${formattedArancel}\n
El Arancel Es Para Los Siguientes Trámites:\n
Estados Contables Soc. Comerciales\n
Estados Contables Entidades Sin F/ Lucros\n
Estados Contables De Cooperativa\n
Estados Contables Intermedios\n
Compilación\n
Estados Contables Especiales\n
Rectificativos\n
Incluye Dos Trámites Con Diferentes Destinatarios.\n
Te Esperamos En Mi Cuenta Para Gestionar El Trámite`;
    } else {
      body = `Trámite: ${tipoTramite}\nEl valor del trámite es $38.000`;
    }

    const recipient = prompt("Introduce el email del destinatario:", "destinatario@example.com");

    if (recipient) {
      const url = 'https://script.google.com/macros/s/AKfycbw3AqYbVEEF5ByaCxRfrtPo_xafEVM7d0vGGlZ52unDtvbifwTAMHKa2XJNgz_u_jAr0w/exec'; // Asegúrate de usar el ID correcto

      const payload = {
        'recipient': recipient,
        'subject': 'Resultado Calculadora de Arancel CPCE Mendoza',
        'body': body
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
});
