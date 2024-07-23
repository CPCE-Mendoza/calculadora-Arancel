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
  
    var mailtoLink = `mailto:?subject=Resultado del Cálculo&body=Importe Base de Búsqueda: $${formattedImporteBase}%0D%0AArancel Fijo: $${formattedArancel}`;
    window.location.href = mailtoLink;
});

document.getElementById('otraConsulta').addEventListener('click', function() {
    document.getElementById('arancelForm').reset();
    document.getElementById('resultado').innerHTML = '';
});

document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('input', function() {
        var value = this.value.replace(/\D/g, ''); // Remove non-numeric characters
        if (value) {
            this.value = formatNumber(value);
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
    var parts = number.toString().split(',');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return parts.join(',');
}

function formatToNumber(value) {
    // Remove thousands separator and replace comma with dot
    return parseFloat(value.replace(/\./g, '').replace(',', '.'));
}
