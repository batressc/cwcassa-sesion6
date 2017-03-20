var icono = "";

function randomIconName() {
    var iconArray = new Array(
        "adjust",
        "adn",
        "align-center",
        "align-justify",
        "align-left",
        "align-right",
        "ambulance",
        "anchor",
        "android",
        "angellist",
        "angle-double-down",
        "angle-double-left",
        "angle-double-right",
        "angle-double-up",
        "angle-down",
        "angle-left",
        "angle-right",
        "angle-up",
        "apple",
        "archive",
        "area-chart",
        "arrow-circle-down",
        "arrow-circle-left",
        "arrow-circle-o-down",
        "arrow-circle-o-left",
        "arrow-circle-o-right"
    );
    return iconArray[Math.floor(Math.random()*(iconArray.length))];
}

//Desordena el arreglo seleccionado
function desordenarArreglo(arreglo) {
    return arreglo.sort(function(a, b){return 0.5 - Math.random()});
}

//Crea un arreglo con parejas de iconos desordenados
function crearParejas(cantidad) {
    var parejas = [];
    var j = 0;
    var icono = "";
    for(var i = 0; i < cantidad * 2; i++) {
        if (j > 2 || j === 0) {
            while(true) {
                icono = randomIconName();
                if ($.inArray(icono, parejas) === -1) break;
            }
            j = 1;
        }
        parejas.push(icono);
        j++;
    }
    return desordenarArreglo(parejas);
}

//Crea el tablero con botones
function crearTablero(filas, columnas, parejas) {
    var html = "";
    var index = 0;
    for(var i = 0; i < filas; i++) {
        html = "";
        for (var j = 0; j < columnas; j++) {
            html += `<button type="button" class="boton-tablero" data-icon="${parejas[index]}"><i class="fa fa-${parejas[index]} fa-3x ocultar" aria-hidden="true"></i>&nbsp;</button>`;
            index++;
        }
        $('div[id="tablero"]').append(html);
        $('div[id="tablero"]').append('<br>')
    }
}

//Asignar eventos
function asignarEventos() {
    $('button').click(function() {
        if ($(this).children().attr('class').search('resuelto') === -1 && $(this).children().attr('class').search('seleccionado') === -1) {
            iconoClick = $(this).attr('data-icon');
            $(this).children().toggleClass('ocultar');
            $(this).children().addClass('seleccionado');
            if (icono === "") {
                icono = iconoClick;
            } else if (icono === iconoClick) {
                $(`i[class~="seleccionado"]`).addClass('resuelto');
                $(`i[class~="seleccionado"]`).removeClass('seleccionado');
                icono = "";
            } else {
                //Retrasa un segundo que se desaparezcan las cartas
                setTimeout(function() {
                    $('i[class~="seleccionado"]').toggleClass('ocultar');
                    $('i[class~="seleccionado"]').removeClass('seleccionado');
                }, 1000);
                icono = "";
            }
        }
    });
}

$(function(){
    var parejas = crearParejas(10);
    crearTablero(5, 4, parejas);
    asignarEventos();
});