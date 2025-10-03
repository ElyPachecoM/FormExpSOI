console.log("Frm Prod 3");
var pares = [];
var cat = [];
var slc = [];
var names_carr = [];
var nCampus = [];
var selCarrera;
var banderaOnl = false;
var nivelPrograma;
var valEmail;
var sizeEmail;
var urlH = 'https://pwl.unitec.mx/dfp/oferta-endpoints/suitev3/';
var nombreCookie = "c_form_data";
var cookieBanner;
var cookieUp = '{"banner":"ASPIRANTES LIC"}';
var urlInicialCookie = getCookie('urlInicial').length > 0 ? getCookie('urlInicial'): window.location.href;
var modTxt = '';
var cidga4;
var activador = '';
document.getElementById('gpo_campus_interes').classList.add('gpo_programa_hs');
try {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        dataLayer.push(arguments);
    }
    gtag('get', 'G-SXPHFJYSMM', 'client_id', function (clientId) {
        if (clientId) {
            cidga4 = clientId;
            console.warn("Actualizando CID de ga4");
        } else {
            throw new Error('No se pudo obtener el client_id de ga4');
        }
    });
} catch (error) {
    console.error('Error al obtener el client_id de ga4:', error);
}

if (checkCookie('c_form_data') === false) {
    limitSetCookieForm(nombreCookie, cookieUp, 3);
}
var urlDocument = new URL(window.location.href);
var bannerdocument = urlDocument.searchParams.get('utm_campaign');
/*if (bannerdocument != null && bannerdocument != "") {
    if (getCookie('banner_activo') !== "") {
        updateFormCookie('c_form_data', 'banner', getCookie('banner_activo'), 1);
    } else {
        limitSetCookieForm("banner_activo", bannerdocument, 3);
        updateFormCookie('c_form_data', 'banner', bannerdocument, 1);
    }
} else {
    if (urlDocument.pathname.indexOf("testvocacional") !== -1 || urlDocument.pathname.indexOf("orientacion-profesional") !== -1) {
        cookieBanner = "TESTVOCACIONAL";
    } else if (urlDocument.pathname.indexOf("impulsa") !== -1) {
        cookieBanner = "IMPULSA";
    } else if (urlDocument.pathname.indexOf("calculadora") !== -1) {
        cookieBanner = "CALCULADORA";
    } else {
        cookieBanner = "ASPIRANTES LIC";
    }
    updateFormCookie('c_form_data', 'banner', cookieBanner, 1);
}*/
function logPeticiones(urlEnd, tpErr, err = '',header) {   
    peticiones = new FormData();
    peticiones.set('endpoint', urlEnd);
    peticiones.set('tipoError', tpErr);
    peticiones.set('CID', cidga4);
    peticiones.set('codigo', err);
    peticiones.set('headers', header)
    peticiones.set('usrAgent', window.navigator.userAgent);
    peticiones.set('location', window.location.href)
    var url_hooks = 'https://pwl.unitec.mx/desk/procWeb/envioLogOferta.php';
    fetch(url_hooks, {
        mode: 'cors',
        method: 'POST',
        body: peticiones
    }).then(response => response.json()).then(dat => {
        console.log(response);
    }).catch(function (err) {
    });
}
/*function limitSetCookieForm(cname, cvalue, horas) {
    var d = new Date();
    d.setTime(d.getTime() + (1 * horas * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    //;domain=unitec.mx
    document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/";
}*/
function updateFormCookie(nombre_cookie, clave, valor, exdays) {
    var cadena_cookie = "";
    var cookieActual = decodeURIComponent(getCookie(nombre_cookie));
    var obj = JSON.parse(cookieActual);
    var flagClave = false;
    //var obj = cookieActual;
    var cadena_cookie = "{";

    for (let field in obj) {
        if (field == clave) {
            cadena_cookie += '"' + field + '":' + '"' + valor + '",';
            flagClave = true;
        } else {
            cadena_cookie += '"' + field + '":' + '"' + obj[field] + '",';
        }
    }
    if (flagClave == false) {
        cadena_cookie += '"' + clave + '":' + '"' + valor + '",';
    }
    cadena_cookie = cadena_cookie.substring(0, cadena_cookie.length - 1);

    cadena_cookie += "}";

    if (checkCookie(nombre_cookie)) {
        //this.removeCookie(nombre_cookie);
    }
    limitSetCookieForm(nombre_cookie, encodeURI(cadena_cookie), exdays);
}
function appendCookie(nombre_cookie, clave, valor, exdays) {
    var cadena_cookie = "";
    var cookieActual = decodeURIComponent(getCookie(nombre_cookie));
    var obj = JSON.parse(cookieActual);
    //var obj = cookieActual;
    var cadena_cookie = "{";

    for (let field in obj) {
        cadena_cookie += '"' + field + '":' + '"' + obj[field] + '",';
    }

    cadena_cookie += '"' + clave + '":' + '"' + valor + '",';
    cadena_cookie = cadena_cookie.substring(0, cadena_cookie.length - 1);

    cadena_cookie += "}";

    if (checkCookie(nombre_cookie)) {
        //this.removeCookie(nombre_cookie);
    }
    limitSetCookieForm(nombre_cookie, encodeURI(cadena_cookie), exdays);
}

function checkCookie(valor) {
    var user = this.getCookie(valor);
    if (user != "") {
        return true;
    }
    else {
        return false;
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/*function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    if (location.search === "") {
        results = regex.exec(location.hash);
    } else {
        results = regex.exec(location.search);
    }
    return results === null ? false : decodeURIComponent(results[1].replace(/\+/g, " "));
}*/
function getParameterByName(name) {
    name = name.replace(/[\[\]\\]/g, "\\$&");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

    var results = location.search === "" ? regex.exec(location.hash) : regex.exec(location.search);
    return results === null ? false : decodeURIComponent(results[1].replace(/\+/g, " "));
}


/***Recuperar leads en paso intermedio LRA 300523***/
var banderaLog = 0;
function envioLeads() {    
    var cookieForm = decodeURIComponent(getCookie(nombreCookie));
    var cookieRecovery = JSON.parse(cookieForm);
    var bannerRecovery = getCookie("banner_activo");
    var page_uri = window.location.href;
    if (bannerRecovery !== "") {
        micro_data.set('banner', getCookie("banner_activo"));
    } else {
        micro_data.set('banner', 'ASPIRANTES LIC');
    }
    micro_data.set('nombre', cookieRecovery['nombre']);
    micro_data.set('apaterno', cookieRecovery['apaterno']);
    micro_data.set('amaterno', cookieRecovery['amaterno']);
    micro_data.set('email', cookieRecovery['email']);
    micro_data.set('celular', cookieRecovery['celular']);
    micro_data.set('urlreferrer', page_uri);
    micro_data.set('CID', cidga4);

    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile === false) {
        var formDevice = 'Desktop';
    } else {
        var formDevice = 'Mobile';
    }
    var trackid = getCookie("banner_activo");
    var guid = createUUID();
    var complementoData = new FormData();
    var n = document.getElementById('slc_nivel_de_interes');    
    var nivelP = n.options[n.selectedIndex].value;
    var f = document.getElementById('slc_campus_interes');
    var pnum;
    if (nivelP == 11) {
        selCarrera = 'Preparatoria';
        pnum = '2666';
    } else {
        pnum = f.options[f.selectedIndex].getAttribute('prodnum');
    }
    if (nivelP == 11 || nivelP == 3 || nivelP == 7 || nivelP == 9) {
        nCampus = 'ONL';
    }

    complementoData = micro_data;
    complementoData.set('C_Carrera', pnum);
    complementoData.set('nom_campus', nCampus);
    complementoData.set('Link', selCarrera);
    complementoData.set('nombre2', selCarrera);
    complementoData.set('formDev', formDevice);
    complementoData.set('GUIDLpTransaccion', guid);
    complementoData.set('Origen', 'ASPIRANTES LIC');
    if (trackid != '') {
        complementoData.set('banner', trackid);
    } else {
        complementoData.set('banner', 'ASPIRANTES LIC');
    }

    if (banderaLog === 0) {
        var url_hooks = 'https://pwl.unitec.mx/desk/procWeb/envioLogCalc.php';
        fetch(url_hooks, {
            mode: 'cors',
            method: 'POST',
            contentType: "application/json",
            body: complementoData
        }).then(response => response.json()).then(dat => {

        }).catch(function (err) {

        });

    }
    banderaLog++;
}

var sha256 = function sha256(ascii) {
    function rightRotate(value, amount) {
        return (value >>> amount) | (value << (32 - amount));
    };

    var mathPow = Math.pow;
    var maxWord = mathPow(2, 32);
    var lengthProperty = 'length'
    var i, j; // Used as a counter across the whole file
    var result = ''

    var words = [];
    var asciiBitLength = ascii[lengthProperty] * 8;

    //* caching results is optional - remove/add slash from front of this line to toggle
    // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
    // (we actually calculate the first 64, but extra values are just ignored)
    var hash = sha256.h = sha256.h || [];
    // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
    var k = sha256.k = sha256.k || [];
    var primeCounter = k[lengthProperty];
    /*/
    var hash = [], k = [];
    var primeCounter = 0;
    //*/

    var isComposite = {};
    for (var candidate = 2; primeCounter < 64; candidate++) {
        if (!isComposite[candidate]) {
            for (i = 0; i < 313; i += candidate) {
                isComposite[i] = candidate;
            }
            hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
            k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
        }
    }

    ascii += '\x80' // Append Ƈ' bit (plus zero padding)
    while (ascii[lengthProperty] % 64 - 56) ascii += '\x00' // More zero padding
    for (i = 0; i < ascii[lengthProperty]; i++) {
        j = ascii.charCodeAt(i);
        if (j >> 8) return; // ASCII check: only accept characters in range 0-255
        words[i >> 2] |= j << ((3 - i) % 4) * 8;
    }
    words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
    words[words[lengthProperty]] = (asciiBitLength)

    // process each chunk
    for (j = 0; j < words[lengthProperty];) {
        var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
        var oldHash = hash;
        // This is now the undefinedworking hash", often labelled as variables a...g
        // (we have to truncate as well, otherwise extra entries at the end accumulate
        hash = hash.slice(0, 8);

        for (i = 0; i < 64; i++) {
            var i2 = i + j;
            // Expand the message into 64 words
            // Used below if 
            var w15 = w[i - 15], w2 = w[i - 2];

            // Iterate
            var a = hash[0], e = hash[4];
            var temp1 = hash[7]
                + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
                + ((e & hash[5]) ^ ((~e) & hash[6])) // ch
                + k[i]
                // Expand the message schedule if needed
                + (w[i] = (i < 16) ? w[i] : (
                    w[i - 16]
                    + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) // s0
                    + w[i - 7]
                    + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10)) // s1
                ) | 0
                );
            // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
            var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
                + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2])); // maj

            hash = [(temp1 + temp2) | 0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
            hash[4] = (hash[4] + temp1) | 0;
        }

        for (i = 0; i < 8; i++) {
            hash[i] = (hash[i] + oldHash[i]) | 0;
        }
    }

    for (i = 0; i < 8; i++) {
        for (j = 3; j + 1; j--) {
            var b = (hash[i] >> (j * 8)) & 255;
            result += ((b < 16) ? 0 : '') + b.toString(16);
        }
    }
    return result;
};
if (localStorage.getItem('datos_cal') != null) {
    var data = JSON.parse(localStorage.getItem('datos_cal'));
    // Verifica si los campos requeridos existen y no están vacíos o undefined
    if (data['nombre'] && data['apaterno'] && data['amaterno'] && data['celular'] && data['email'] &&
        data['carrera'] && data['carrera']['nombreCliente'] && 
        data['modalidadName'] && 
        data['campus'] && data['campus']['text_campus'] && data['datosFull'] ) {
            
        console.warn("Todos los datos necesarios están presentes");

        if (Reflect.ownKeys(data).length > 0) {
            var hours = 24;
            var now = new Date().getTime();
            var expdate = data['dateexp'];
            if (now - expdate > hours * 60 * 60 * 1000) {
                document.getElementById('paso1_form').classList.remove('hidden');
                document.getElementById('paso2_form').classList.add('none');
            } else {
                document.getElementById('phone_calc').value = data['celular'];
                document.getElementById('firstname').value = data['nombre'];       
                document.getElementById('lastname').value = data['apaterno'];
                document.getElementById('lastname_m').value = data['amaterno'];
                document.getElementById('email').value = data['email'];
                document.getElementById('paso1_form').classList.add('hidden');
                document.getElementById('info_clc').classList.add('hidden');

                document.getElementById('alumno').textContent = data['nombre'];
                document.getElementById('bl').textContent = data['carrera']['nombreCliente'];
                document.getElementById('modalidad').textContent = data['modalidadName'];
                if(document.getElementById('campus')){
                    document.getElementById('campus').textContent = data['campus']['text_campus'];
                }
                document.getElementById('paso2_form').classList.add('hidden');
                document.getElementById('info-res').classList.remove('hidden');
                document.getElementById('res-card').classList.remove('hidden');
                document.getElementById('ModalCalculadoraVue').classList.add('step2');
                document.getElementById('ModalCalculadoraVue').classList.remove('step1');
                document.getElementById('paso').classList.add('hidden');
            }
        }
    }
} else {
    console.warn("NO hay dato en cookie");
}

/*}else if (checkCookie('micro_email') !== false) {
    console.warn("LLEGO POR ACA");
    var cookieForm = decodeURIComponent(getCookie('c_form_data'));
    var cookieRecovery = JSON.parse(cookieForm);
    var bannerRecovery = getCookie("banner_activo");
    var page_uri = window.location.href;
    var micro_data = new FormData();
    if (bannerRecovery !== "") {
        console.warn("ACTIVOOOOOOOOOOOO");
        micro_data.set('banner', getCookie("banner_activo"));
    } else {
        console.warn("ASPIRANTEEEES");
        micro_data.set('banner', 'ASPIRANTES LIC');
    }
    micro_data.set('nombre', cookieRecovery['nombre']);
    micro_data.set('apaterno', cookieRecovery['apaterno']);
    micro_data.set('amaterno', cookieRecovery['amaterno']);
    micro_data.set('email', cookieRecovery['email']);
    micro_data.set('celular', cookieRecovery['celular']);
    micro_data.set('urlreferrer', page_uri);

    document.getElementById('phone_calc').value = cookieRecovery['celular'];
    document.getElementById('firstname').value = cookieRecovery['nombre'];
    document.getElementById('lastname').value = cookieRecovery['apaterno'];
    document.getElementById('lastname').value = cookieRecovery['amaterno'];
    document.getElementById('email').value = cookieRecovery['email'];
    document.getElementById('paso1_form').classList.add('hidden');
    document.getElementById('paso2_form').classList.remove('none');
    document.getElementById('paso2_form').classList.remove('hidden');
    document.getElementById('ModalCalculadoraVue').classList.add('step2');
    document.getElementById('ModalCalculadoraVue').classList.remove('step1');
    window.scrollTo(0, 0);
}*/

function obtenerEstado(phone) {
    let lada = phone.substring(0, 3);

    switch (lada) {
        // Gto
        case '473': case '477': case '464': return 'GUANAJUATO';
        // Jal
        case '332': case '333': case '344': case '331': return 'JALISCO';
        // Qro
        case '442': case '441': case '443': return 'QUERETARO';
        // Pue
        case '222': case '223': case '224': case '221': return 'PUEBLA';
        // Nvo Leon
        case '811': case '818': case '821': case '812': case '813': return 'NUEVO LEON';
        // Edo Mex
        case '722': case '731': case '735': return 'ESTADO DE MEXICO';
        // Otros estados
        case '449': return 'AGUASCALIENTES';
        case '686': case '664': return 'BAJA CALIFORNIA';
        case '612': return 'BAJA CALIFORNIA SUR';
        case '961': return 'CHIAPAS';
        case '614': case '656': return 'CHIHUAHUA';
        case '871': return 'COAHUILA';
        case '312': return 'COLIMA';
        case '618': return 'DURANGO';
        case '771': return 'HIDALGO';
        case '443': return 'MICHOACAN';
        case '777': return 'MORELOS';
        case '311': return 'NAYARIT';
        case '951': return 'OAXACA';
        case '983': return 'QUINTANA ROO';
        case '444': return 'SAN LUIS POTOSI';
        case '667': return 'SINALOA';
        case '662': return 'SONORA';
        case '993': return 'TABASCO';
        case '834': return 'TAMAULIPAS';
        case '246': return 'TLAXCALA';
        case '229': return 'VERACRUZ';
        case '999': return 'YUCATAN';
        case '492': return 'ZACATECAS';
    }

    // Si no coincide con 3, buscamos con 2 dígitos para CDMX
    lada = phone.substring(0, 2);

    if (lada === '55' || lada === '56') {
        return 'CIUDAD DE MEXICO';
    }

    // Si no encuentra coincidencia, asignamos Edo de Mex
    return 'ESTADO DE MEXICO';
}

function removeErrorInput(target) {
    document.getElementById('error_' + target).innerHTML = '';
    document.getElementById('error_' + target).classList.add('hidden');
    document.getElementById('error_' + target).style.display = 'flex';
    document.getElementById(target).classList.add('input-focus');
    document.getElementById(target).classList.remove('input-error');
}

function inicioDeClases(carrera) {
    switch (carrera) {
        case '966':
        case '2066':
            return '*Iniciamos Clases en Agosto de 2024';
            break;
        case '0':
            return '';
            break;
        default:
            return '';
            break;
    }
}

function guardaUsuarioData(valor, data) {
    if (localStorage.getItem("datos_cal") === null) {
        var jsonnew = {};
        jsonnew[valor] = data;
        localStorage.setItem("datos_cal", JSON.stringify(jsonnew));
    } else {
        var triggerFields = ['carrera', 'campus', 'materias'];
        var viejo = JSON.parse(localStorage.getItem("datos_cal"));
        if (triggerFields.includes(valor) && viejo[valor] != data) {
            GTMcalctrigger = true
        }
        viejo[valor] = data;
        localStorage.setItem("datos_cal", JSON.stringify(viejo));
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.withCredentials = false;
    xhr.responseType = 'json';

    xhr.addEventListener("error", function () {
        let msgErr = 'network_error - estatus: '+xhr.status+' - msg: '+xhr.statusText+ ' - response: '+xhr.responseURL;
        enviarError(msgErr, url, null);
        callback('network_error', null, null);
    });
    xhr.addEventListener("abort", function () {
        enviarError('request_aborted', url, null);
        callback('request_aborted', null, null);
    });
    //error de timeout, preguntar a Luis
    /*xhr.timeout = 10000;
    xhr.ontimeout = function () {
        enviarError('timeout_error', url, null);
        callback('timeout_error', null, null);
    };*/
    xhr.onload = function () {
        var status = xhr.status;
        var headers = xhr.getAllResponseHeaders() + '-' + xhr.responseType + '-' + xhr.responseURL;
        // Si no es 2xx, lo tratamos como error
        if (status < 200 || status >= 300) {
            enviarError(status, url, xhr.response);
            callback(status, xhr.response, headers);
            return;
        }
        // Validación de contenido exitoso pero sin datos
        var data = xhr.response;
        if (
            !data || data.status_code != 200 || !data.message || data.message === 'error' ||
            (Array.isArray(data.message) && data.message.length === 0)
        ) {
            let errGa4 = data.status_code+" :: Respuesta vacia";
            enviarError(errGa4, url, data);
            callback('respuesta_vacia', data, headers);
            return;
        }
        // Respuesta válida
        callback(status, data, headers);
    };
    xhr.send();

    function enviarError(error, url, respuesta) {
        console.log("Enviando error analitycs");
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'trackGA4',
            'event_type':'form_error_api',
            'error_message': error,
            'layer': 'academic_offer',
            'form_field': activador,
            'form_name': 'Formulario Tradicional',
            'form_type': 'Expuesto producto',
            'content_url': url
        });
        if (typeof window.clarity !== 'undefined') {
            window.clarity("set", "errorjson", String(error));
            window.clarity("event", "errorjson");
        }
        logPeticiones("url getjson", error, "error", respuesta);
    }
};

function createUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
var domains = [
    "hotmail.com",
    "yahoo.com.mx",
    "msn.com",
    "yahoo.com",
    "gmail.com",
    "outlook.com",
    "live.com.mx",
    "live.com",
    "prodigy.net.mx",
    "icloud.com"
];
var EmailDomainSuggester = function ($bindTo) {
    var datalist = null;
    var datalistId = '';
    var init = function () {
        addElements();
        bindEvents(datalist);
    };
    var addElements = function () {
        datalistId = 'email_options_' + $bindTo.getAttribute('id');
        datalist = document.createElement('ul');
        datalist.setAttribute('id', datalistId);
        datalist.classList.add('drop');
        $bindTo.after(datalist);
        $bindTo.setAttribute("list", datalistId);
    };
    var bindEvents = function () {
        $bindTo.addEventListener("keyup", testValue);
    };
    var testValue = function (event) {
        var noValido = /[ ]/;
        if (noValido.test(event.target.value)) {
            event.target.value = event.target.value.replace(/[ ]/g, '');
            return false;
        }
        if (this != undefined) {
            var el = this,
                value = el.value.replace(/[ ]/g, '');
            var value1 = el.value.replace(/[ ]/g, '');
            if (value.indexOf("@") != -1) {
                value = value.split("@")[0];
                var dom = value1.split("@")[1];
                addDatalist(value, dom, event);
                va();
            } else {
                emptyDatalist();
            }
        }
    };
    var emptyDatalist = function () {
        datalist.innerHTML = '';
    };
    var addDatalist = function (value, dom, input) {
        datalist.style.display = 'block';
        var i, newOptionsString = [];
        for (i = 0; i < domains.length; i++) {
            if (domains[i].includes(dom)) {
                newOptionsString.push("<li value='" + value + "@" + domains[i] + "'>" + value + "@" + domains[i] + "</li>");
            }
        }
        datalist.innerHTML = newOptionsString.join('');
        if (newOptionsString.length == 1 && document.querySelectorAll('#email_options_' + $bindTo.getAttribute('id') + ' li').length > 0 && document.querySelectorAll('#email_options_' + $bindTo.getAttribute('id') + ' li')[0].innerHTML == input.target.value.replace(/[ ]/g, '')) {
            document.getElementById('email_options_' + $bindTo.getAttribute('id')).style.display = 'none';
            input.target.value = document.querySelectorAll('#email_options_' + $bindTo.getAttribute('id') + ' li')[0].innerHTML;
            removeErrorInput('email');
        }
        if (newOptionsString.length == 0) {
            document.getElementById('email_options_' + $bindTo.getAttribute('id')).style.display = 'none';
            removeErrorInput('email');
        }
    };
    var va = function () {
        var liTags = datalist.getElementsByTagName("li");
        for (var i = 0; i < liTags.length; i++) {
            liTags[i].addEventListener("click", (e) => {
                e.preventDefault();
                if (document.getElementById('error_' + $bindTo.getAttribute('id'))) {
                    document.getElementById('error_' + $bindTo.getAttribute('id')).style.display = 'none';
                }
                var v = e.target.getAttribute('value');
                $bindTo.value = v;
                var ddt = v.split('@');
                var name_mail = ddt[0];
                if (!isEmail(v)) {
                    if (document.getElementById('error_' + $bindTo.getAttribute('id'))) {
                        document.getElementById('error_' + $bindTo.getAttribute('id')).innerHTML = '';
                        document.getElementById('error_' + $bindTo.getAttribute('id')).style.display = 'flex';
                        document.getElementById('error_' + $bindTo.getAttribute('id')).innerHTML = 'Proporciona un correo válido.';
                        document.getElementById($bindTo.getAttribute('id')).classList.remove('input-focus');
                        document.getElementById($bindTo.getAttribute('id')).classList.add('input-error');
                    }
                    document.getElementById('email_options_' + $bindTo.getAttribute('id')).style.display = 'none';
                } else {
                    document.getElementById('email_options_' + $bindTo.getAttribute('id')).style.display = 'none';
                    if (document.getElementById($bindTo.getAttribute('id'))) {
                        document.getElementById($bindTo.getAttribute('id')).classList.remove('input-error');
                        document.getElementById($bindTo.getAttribute('id')).classList.add('input-focus');
                    }
                    $bindTo.setAttribute('value', v);
                    $bindTo.setAttribute('c', 1);
                }
                datalist.style.display = 'none';
            })
        }
    }
    init();
};
//FUNCION PARA SELECCIONAR BL
function BLautoselect(){
    var banner_activo = getCookie("banner_activo");
    var BLvalue = "";
    if (banner_activo != '') {
        if(banner_activo.indexOf("_HS") !== -1 && banner_activo.indexOf("_OL") == -1){
            BLvalue = 10
        }else if(getCookie("banner_activo").indexOf("_HS") !== -1 && getCookie("banner_activo").indexOf("_OL") !== -1){
            BLvalue = 11
        }else if(banner_activo.indexOf("_UG") !== -1 && banner_activo.indexOf("_UGOL") == -1 && getCookie("banner_activo").indexOf("_INGENIERIA") == -1){
            BLvalue = 1
        }else if(banner_activo.indexOf("LX") !== -1){
            BLvalue = 2
        }else if(banner_activo.indexOf("_UGOL") !== -1 ){
            BLvalue = 3
        }else if(banner_activo.indexOf("_CS") !== -1){
            BLvalue = 4
        }else if(banner_activo.indexOf("_INGENIERIA") !== -1){
            BLvalue = 5
        }else if(banner_activo.indexOf("_ING_EJECUTIVAS") !== -1){
            BLvalue = 6
        }else if(banner_activo.indexOf("_INGOL") !== -1){
            //no hay banners de ingol
            //BLvalue = 7
        }else if(banner_activo.indexOf("_PG") !== -1 && banner_activo.indexOf("_PGOL") == -1){
            BLvalue = 8
        }else if(banner_activo.indexOf("_PGOL") !== -1){
            BLvalue = 9
        }
        if(BLvalue != ""){
            var $select = document.querySelector('#slc_nivel_de_interes');
            $select.value = BLvalue;
            $select.dispatchEvent(new Event('change'));
        }        
    }
    return;
}
if (document.getElementById('email')) {
    var mail = document.getElementById('email');
    var edsEmail = new EmailDomainSuggester(mail);
    document.getElementById('email').addEventListener("blur", (e) => {
        var mail = document.getElementById('email');
        var emailValue = mail.value;
        var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (isEmail(mail.value) != true) {
            document.getElementById('error_email').innerHTML = '';
            document.getElementById('error_email').classList.remove('hidden');
            document.getElementById('error_email').style.display = 'flex';
            document.getElementById('error_email').innerHTML = 'Proporciona un correo válido.';
            document.getElementById('email').classList.remove('input-focus');
            document.getElementById('email').classList.add('input-error');            
            let tipoError = emailValue.length > 0 ? 'invalid' : 'empty';
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'trackerrorformGA4',
                'error_message': 'Proporciona un correo válido.',
				'layer': 'datos personales',                
				'form_action': tipoError,
				'form_field': 'frm_mail',
				'form_name': 'Formulario Tradicional',
                'form_type':'Expuesto',
                'event_type':'user_error'
            }); 
        } else if (!emailRegex.test(emailValue)) {
            document.getElementById('error_email').innerHTML = '';
            document.getElementById('error_email').classList.remove('hidden');
            document.getElementById('error_email').style.display = 'flex';
            document.getElementById('error_email').innerHTML = 'Caracter invalido encontrado.';
            document.getElementById('email').classList.remove('input-focus');
            document.getElementById('email').classList.add('input-error');            
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'trackerrorformGA4',
                'error_message': 'Caracter invalido encontrado.',
				'layer': 'datos personales',
				'form_action': 'invalid',
				'form_field': 'frm_mail',
				'form_name': 'Formulario Tradicional',
                'form_type':'Expuesto',
				'event_type':'user_error'              
            });
        }
        else {
            removeErrorInput('email');
        }
    });
}
function isEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    valid1 = re.test(String(email).toLowerCase());
    var dominiosNoValidos = ["gmal.com","hotmai.com","gimail.com","outlook.com.mx","gmaill.com","generic.com","aefcm.nuevaescuela.com","outloo.com","gmial.com","homtail.com","correo.com","novalido.com","notiene.com","sincorreo.com","invalido.com","comprobar.com","novalido.com","sincorreo.com","hotmsil","cbtis.21.edu.mx","edinburg.edu.mx","gmail.con","1365.cbtis21.edu.mx","gmail.com.mx","hotail.com","edomex.nuevescuela.mx","claudinathevent.edu.mx","gmail.claudinateveneth.mx","gmil.com","hotmail.com.mx","homaill.com","homail.com","hotmal.com","hotmial.com","gmai.com","yaho.com","yhaoo.com","yahho.com","yajoo.com","hotmail.con","outlok.com","outloock.com","outlock.com","outlook.con","gml.com"];
    var parts = email.split('@');
    if (parts.length === 2) {
        if (dominiosNoValidos.includes(parts[1])) {
            valid2 = false;
        }else{
            valid2 = true;
        }
    }else{valid2 = false;}
    return valid1 && valid2 ?true:false;

}
if (document.getElementById('phone_calc')) {
    document.getElementById('phone_calc').setAttribute('maxlength', '10');
    document.getElementById('phone_calc').addEventListener("keypress", tipo_string);
}
function tipo_string(event) {
    if (event.which != 8 && isNaN(String.fromCharCode(event.which))) {
        event.preventDefault(); //stop character from entering input
    }
    if (event.which == 32) {
        event.preventDefault(); //stop character from entering input
    }
}
var tmp_campus = [];

var vSlug = document.getElementById('seleccionaProducto').value;
console.log("VALOR DE PROD");
console.log(vSlug);
var noBl;

/*function llenarNivelInteres(vSlug) {
    // Si el valor de vSlug es 'prepa-onl', asigna los valores directamente
    if (vSlug === 'prepa-online') {
        // Asigna valores a las variables necesarias
        var id_ln = 11; 
        var mkt_name = 'Preparatoria en Línea'; 
        var modalidad = 9; 
        var modalidadtxt = 'Prepa en Línea'; 
        var nivel = 'P'; 
        var snivel = 11; 

        // Actualiza el contenido del select
        var select = document.getElementById('slc_nivel_de_interes');
        select.innerHTML = ''; // Limpiar el select actual
        select.innerHTML = '<option value="' + id_ln + '" modalidad="' + modalidad + '" modalidadtxt="' + modalidadtxt + '" nivel="' + nivel + '" snivel="' + snivel + '">' + mkt_name + '</option>';
        
        // Si solo hay una opción, se agrega la clase hidden y se dispara el evento 'change'
        if (select.options.length === 1) {
            document.getElementById('gpo_nivel_de_interes').classList.add('hidden');
            aplicarEstilo();
            select.selectedIndex = 0; // Selecciona la opción
            select.dispatchEvent(new Event('change'));
        }

        return; //Termina la función, ya que no es necesario hacer más
    }

    // Si no es 'prepa-onl', ejecuta el flujo original
    getJSON(urlH + 'get_oferta_by_producto/' + vSlug, function (err, data, headers) {
        if (err !== 200) {
            if (typeof window.clarity !== 'undefined') {
                console.log("enviando log a clarity");
                clarity("set", "nivel", nivel);
                clarity("set", "codigo_err", err);
            }
            logPeticiones(urlH + 'get_oferta_by_producto/', 'Error EP', err, headers);
        } else {
            if (data != null) {
                if (data.status_code == 200) {
                    document.getElementById('slc_nivel_de_interes').innerHTML = '';
                    var html_nivel_interes = '<option value="" disabled="" selected="">Selecciona el grado de estudios</option>';
                    if (data.message.length > 0 && data.message !== 'error') {
                        for (let i = 0; i < data.message.length; i++) {
                            var id_ln = data.message[i]['id'];
                            var mkt_name = data.message[i]['mkt_name'];
                            var modalidad = data.message[i]['mkt_modalidad'];
                            var modalidadtxt = data.message[i]['mkt_modalidadtxt'];
                            var nivel = data.message[i]['crmit_codigounico'];
                            var snivel = data.message[i]['mkt_subnivel'];
                            noBl = data.message.length;
                            html_nivel_interes +=
                                '<option snivel="' + snivel + '" envio="' + id_ln + '" nivel="' + nivel + '" modalidad="' + modalidad + '" modalidadtxt="' + modalidadtxt + '" value="' + id_ln + '" >' + mkt_name + '</option>';
                        }
                        document.getElementById('slc_nivel_de_interes').innerHTML = html_nivel_interes;
                        defineBL();
                        if (data.message.length === 1) {
                            document.getElementById('gpo_nivel_de_interes').classList.add('hidden');
                            aplicarEstilo();
                            document.getElementById('slc_nivel_de_interes').selectedIndex = 1;
                            document.getElementById('slc_nivel_de_interes').dispatchEvent(new Event('change'));
                        }
                    }
                } else {
                    document.getElementById('slc_nivel_de_interes').setAttribute('disabled', true);
                    logPeticiones(urlH + 'get_oferta_by_producto/', 'data.status_code distinto a 200, valor: ' + data.status_code, err, headers);
                }
            } else {
                if (typeof window.clarity !== 'undefined') {
                    clarity("set", "nivel", nivel);
                    clarity("set", "codigo_err", err);
                }
                logPeticiones(urlH + 'get_oferta_by_producto/', 'Data vacio', err, headers);
            }
        }
    });
}*/

function llenarNivelInteres(vSlug, callback) {
    // Si el valor de vSlug es 'prepa-online', asigna los valores directamente
    if (vSlug === 'prepa-online') {
        var id_ln = 11; 
        var mkt_name = 'Preparatoria en Línea'; 
        var modalidad = 9; 
        var modalidadtxt = 'Prepa en Línea'; 
        var nivel = 'P'; 
        var snivel = 11; 

        var select = document.getElementById('slc_nivel_de_interes');
        select.innerHTML = ''; // Limpiar el select actual
        select.innerHTML = '<option value="' + id_ln + '" modalidad="' + modalidad + '" modalidadtxt="' + modalidadtxt + '" nivel="' + nivel + '" snivel="' + snivel + '">' + mkt_name + '</option>';
        
        if (select.options.length === 1) {
            document.getElementById('gpo_nivel_de_interes').classList.add('hidden');
            aplicarEstilo();
            select.selectedIndex = 0; // Selecciona la opción
            select.dispatchEvent(new Event('change'));
        }

        if (typeof callback === 'function') callback(); // Ejecuta el callback si existe
        return;
    }

    // Si no es 'prepa-online', ejecuta el flujo original
    getJSON(urlH + 'get_oferta_by_producto/' + vSlug, function (err, data, headers) {
        if (err !== 200) {
            if (typeof window.clarity !== 'undefined') {
                clarity("set", "nivel", nivel);
                clarity("set", "codigo_err", err);
            }
            logPeticiones(urlH + 'get_oferta_by_producto/', 'Error EP', err, headers);
        } else {
            if (data != null) {
                if (data.status_code == 200) {
                    var select = document.getElementById('slc_nivel_de_interes');
                    select.innerHTML = '';
                    var html_nivel_interes = '<option value="" disabled selected>Selecciona la modalidad de interés</option>';

                    if (data.message.length > 0 && data.message !== 'error') {
                        for (let i = 0; i < data.message.length; i++) {
                            var id_ln = data.message[i]['id'];
                            var mkt_name = data.message[i]['mkt_name'];
                            var modalidad = data.message[i]['mkt_modalidad'];
                            var modalidadtxt = data.message[i]['mkt_modalidadtxt'];
                            var nivel = data.message[i]['crmit_codigounico'];
                            var snivel = data.message[i]['mkt_subnivel'];
                            noBl = data.message.length;
                            html_nivel_interes +=
                                '<option snivel="' + snivel + '" envio="' + id_ln + '" nivel="' + nivel + '" modalidad="' + modalidad + '" modalidadtxt="' + modalidadtxt + '" mktname="' + mkt_name + '" value="' + id_ln + '" >' + modalidadtxt + '</option>';
                        }

                        select.innerHTML = html_nivel_interes;

                        if (typeof callback === 'function') callback(); // Ejecuta el callback después de llenar el selector

                        if (data.message.length === 1) {
                            document.getElementById('gpo_nivel_de_interes').classList.add('hidden');
                            aplicarEstilo();
                            select.selectedIndex = 1;
                            select.dispatchEvent(new Event('change'));
                        }
                    }
                } else {
                    document.getElementById('slc_nivel_de_interes').setAttribute('disabled', true);
                    logPeticiones(urlH + 'get_oferta_by_producto/', 'data.status_code distinto a 200, valor: ' + data.status_code, err, headers);
                }
            } else {
                if (typeof window.clarity !== 'undefined') {
                    clarity("set", "nivel", nivel);
                    clarity("set", "codigo_err", err);
                }
                logPeticiones(urlH + 'get_oferta_by_producto/', 'Data vacio', err, headers);
            }
        }
    });
}


document.addEventListener("DOMContentLoaded", (e) => {
    if (document.getElementById('slc_nivel_de_interes')) {
        llenarNivelInteres(vSlug, defineBL);
    } else {
        console.error("slc_nivel_de_interes no existe en el DOM");
    }
    /***Evento para CTA Cita LRA 111223***/
    let elemTy = document.getElementsByClassName('citaD');
    
    for(let el of elemTy) {
      el.addEventListener("click", (e) => {
    window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
          'event': 'trackGA4', 
          'event_type':'select_content', 
          'content_type': 'link',
          'element': "Agenda una Cita", 
          'content_url': 'https://informes.unitec.mx/admision/', 
          'form_type':'Expuesto',
          'layer': 'thankyou page form tradicional' 
          });
       
        });
    }

    let elemTyB = document.getElementsByClassName('citaBtn');

    for(let el of elemTyB) {
      el.addEventListener("click", (e) => {        
        window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
          'event': 'trackGA4', 
          'event_type':'select_content', 
          'content_type': 'link',
          'element': "Agenda una Cita", 
          'content_url': 'https://www.unitec.mx/agendar-cita/', 
          'form_type':'Expuesto',
          'layer': 'thankyou page form tradicional' 
          });
       
        });
    }    

    let elemCalcu = document.getElementsByClassName('calcubtn');

    for(let el of elemCalcu) {
      el.addEventListener("click", (e) => {              
        window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
              'event': 'trackGA4', 
              'event_type':'select_content', 
              'content_type':'link', 
              'element': 'calculadora :: Calcula tu beca', 
              'content_url': 'https://informes.unitec.mx/calculadora-de-beca/',
              'form_type':'Expuesto',
              'layer': 'thankyou page form tradicional'
              });     
        });
    }
    

    let elemChat = document.getElementsByClassName('chatbtn');

    for(let el of elemChat) {
      el.addEventListener("click", (e) => {     
        window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            'event': 'trackGA4',
            'event_type': 'select_content',
             'content_type': 'link', 
             'layer': 'thankyou page form tradicional', 
             'form_type':'Expuesto',
             'element': 'chat :: Iniciar Chat UNITEC' 
          });              
        });
    }

    let elemBtn = document.getElementsByClassName('callbtn');

    for(let el of elemBtn) {
      el.addEventListener("click", (e) => {             
        window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            'event': 'trackGA4',
            'event_type': 'select_content',
             'content_type': 'link', 
             'layer': 'thankyou page form tradicional', 
             'form_type':'Expuesto',
             'element': 'inbound :: Llámanos' 
          });              
        });
    }
})

/* deshabilita los selects */
if (document.getElementById('gpo_programa_hs')) {
    document.getElementById('gpo_programa_hs').classList.add('hidden');
}
if (document.getElementById('gpo_ciclo')) {
    document.getElementById('gpo_ciclo').classList.add('hidden');
}
if (document.getElementById('gpo_campus_interes')) {
    document.getElementById('gpo_campus_interes').classList.add('hidden');
}

function change_pos() {
    document.getElementById('switch').addEventListener("click", (e) => {
        e.preventDefault();
        if (document.getElementById('gpo_campus_interes').classList.contains('paya')) {
            document.getElementById('gpo_campus_interes').classList.remove('paya');
        } else {
            document.getElementById('gpo_campus_interes').classList.add('paya');
        }
        if (document.getElementById('gpo_programa_hs').classList.contains('paca')) {
            document.getElementById('gpo_programa_hs').classList.remove('paca');
            document.getElementById('gpo_programa_hs').innerHTML = '';
            document.getElementById('gpo_programa_hs').innerHTML = '<div class="form-group"><div class="cont-prepa"><div id="icon-programa" class="PROGRAMA"></div></div><select class="form-control w-98" id="slc_programa" name="programa_hs" type="select" required="" data-trigger placeholder="buscar"><option value="" disabled>- ¿Qué programa te interesa? -</option></select></div><label for="error_programa" class="hidden error-form-select" id="error_programa">Selecciona una opción.</label>';
            document.getElementById('slc_programa').removeAttribute('disabled');
            document.getElementById('gpo_campus_interes').innerHTML = '';
            document.getElementById('gpo_campus_interes').innerHTML = '<div class="form-group" ><div class="cont-prepa"><div id="icon-campus" class="icon-u-estado"></div></div><select class="form-control w-98" id="slc_campus_interes" name="campus_interes" required="" type="select"><option value="" selected disabled>- Campus de tu interés- </option></select></div><label for="error_campus" class="hidden error-form-select" id="error_campus">Selecciona una opción.</label>';
            var e = document.getElementById('slc_nivel_de_interes');
            var id_ninteres = e.options[e.selectedIndex].value;
            var tipo_form = 2;
            document.getElementById('gpo_revalidaci_n_equivalencias_').classList.add('hidden');
            document.getElementById('gpo_ciclo').classList.add('hidden');
            document.getElementById("revalidaci_n_equivalencias_").checked = false;
            get_programas(id_ninteres, tipo_form);
        } else {
            document.getElementById('gpo_programa_hs').classList.add('paca')
            document.getElementById('gpo_programa_hs').innerHTML = '';
            document.getElementById('gpo_programa_hs').innerHTML = '<div class="form-group"><div class="cont-prepa"><div id="icon-programa" class="PROGRAMA"></div></div><select class="form-control w-98" id="slc_programa" name="programa_hs" type="select" required="" data-trigger placeholder="buscar"><option value="" disabled>- ¿Qué programa te interesa? -</option></select></div><label for="error_programa" class="hidden error-form-select" id="error_programa">Selecciona una opción.</label>';
            document.getElementById('slc_programa').setAttribute('disabled', true);
            document.getElementById('gpo_campus_interes').innerHTML = '';
            document.getElementById('gpo_campus_interes').innerHTML = '<div class="form-group" ><div class="cont-prepa"><div id="icon-campus" class="icon-u-estado"></div></div><select class="form-control w-98" id="slc_campus_interes" name="campus_interes" required="" type="select"><option value="" selected disabled>- Campus de tu interés- </option></select></div><label for="error_campus" class="hidden error-form-select" id="error_campus">Selecciona una opción.</label>';
            document.getElementById('slc_campus_interes').removeAttribute('disabled');
            var e = document.getElementById('slc_nivel_de_interes');
            var id_ninteres = e.options[e.selectedIndex].value;
            var tipo_form = 2;
            document.getElementById('gpo_revalidaci_n_equivalencias_').classList.add('hidden');
            document.getElementById('gpo_ciclo').classList.add('hidden');
            document.getElementById("revalidaci_n_equivalencias_").checked = false;
            get_campus(id_ninteres, tipo_form);
        }

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'trackGA4',
            'event_type': 'form_interaction',
            'form_name': 'Formulario Tradicional',
            'form_type':'Expuesto',
            'form_action': 'btnSwitch',
        });
    });
}
function change_prog_estado() {
    document.getElementById('slc_campus_interes').addEventListener("change", (e) => {
        activador = 'frm_select_campus';
        if (!document.getElementById('error_campus').classList.contains('hidden')) {
            document.getElementById('error_campus').classList.add('hidden');
        }
        e.preventDefault();
        document.getElementById('gpo_revalidaci_n_equivalencias_').classList.add('hidden');
        document.getElementById("revalidaci_n_equivalencias_").checked = false;
        var f = document.getElementById('slc_campus_interes');
        var campus = f.options[f.selectedIndex].getAttribute('campus');
        var modalidad = f.options[f.selectedIndex].getAttribute('modalidad');
        document.getElementById('gpo_programa_hs').innerHTML = '';
        document.getElementById('gpo_programa_hs').innerHTML = '<div class="form-group"><div class="cont-prepa"><div id="icon-programa" class="PROGRAMA"></div></div><select class="form-control w-98" id="slc_programa" name="programa_hs" type="select" required="" data-trigger placeholder="buscar"><option value="" disabled>- ¿Qué programa te interesa? -</option></select></div><label for="error_programa" class="hidden error-form-select" id="error_programa">Selecciona una opción.</label>';
        document.getElementById('gpo_ciclo').classList.add('hidden');
        
        getJSON(urlH + 'get_oferta_by_campus/' + modalidad + '&' + campus, function (err, data, headers) {
            if (err !== 200) {
                if (typeof window.clarity !== 'undefined') {
                    clarity("set", "nivel", nivel);
                    clarity("set", "codigo_err", err);
                }
                logPeticiones(urlH + 'get_oferta_by_campus/' + modalidad + '&' + campus, 'Error EP', err, headers);
            } else {
                if (data != null) {
                    if (data.status_code == 200) {
                        if (data.message.length > 0 && data.message !== 'error') {
                            //document.getElementById('gpo_programa_hs').classList.remove('hidden');
                            document.getElementById('slc_programa').removeAttribute('disabled');
                            let html_options_prog = '<option value="" disabled ' + selectedProg + '>- ¿Qué programa te interesa? -</option>';
                            for (var o = 0; o < data.message.length; o++) {
                                var carrera = data.message[o]['nombre_carrera'];
                                var categoria = data.message[o]['carrerainteres'];
                                var name_correcto = data.message[o]['mkt_titulo_alternativo'];
                                var prod_id = data.message[o]['productnumber'];
                                var ciclos = data.message[o]['ciclos'];
                                var equi = data.message[o]['equivalencia'];
                                //Armar select nativo de programas by EPM 05/06/2023    
                                html_options_prog += '<option carrera="' + prod_id + '" value="' + categoria + '" name_carrera="' + carrera + '" equi="' + equi + '" ' + selected + '>' + name_correcto + '</option>';
                            }
                            document.getElementById('slc_programa').innerHTML = html_options_prog;

                            document.getElementById('slc_programa').addEventListener("change", (e) => { 
                                activador = 'frm_select_carrera';                               
                                document.getElementById('error_programa').classList.add('hidden');
                                let p = document.getElementById('slc_programa');
                                let slc_car = p.options[p.selectedIndex].getAttribute('carrera');
                                let equival = p.options[p.selectedIndex].getAttribute('equi');
                                let nam_c = p.options[p.selectedIndex].getAttribute('name_carrera');
                                var car = p.options[p.selectedIndex].getAttribute('value');
                                pares = [];
                                pares.push(slc_car);
                                names_carr = [];
                                names_carr.push(nam_c);
                                cat = [];
                                cat.push(car);
                                if (equival == 'SI') {
                                    document.getElementById('gpo_revalidaci_n_equivalencias_').classList.remove('hidden');
                                } else {
                                    document.getElementById('gpo_revalidaci_n_equivalencias_').classList.add('hidden');
                                }
                            }, false);
                        }
                    } else {
                        logPeticiones(urlH + 'get_oferta_by_campus/' + modalidad + '&' + campus, 'data.status_code distinto a 200, valor:' + data.status_code, err, headers);
                    }
                } else {
                    if (typeof window.clarity !== 'undefined') {
                        clarity("set", "nivel", nivel);
                        clarity("set", "codigo_err", err);
                    }
                    logPeticiones(urlH + 'get_oferta_by_campus/' + modalidad + '&' + campus, 'Data vacio', err, headers);
                }
            }
        });
    });
}
function get_campus(nivel, tipo) {
    getJSON(urlH + 'get_campus_by_oferta/' + nivel, function (err, data, headers) {
        if (data.message != null) {
            if (data.status_code == 200) {
                if (data.message.length > 0 && data.message !== 'error') {
                    var tmp_arr_estados = [];
                    for (var ii = 0; ii < data.message.length; ii++) {
                        var estado = data.message[ii]['estado'];
                        if (!tmp_arr_estados.includes(estado)) {
                            tmp_arr_estados.push(estado);
                        }
                    }
                    populate_estados(tmp_arr_estados, data.message, nivel);
                    change_prog_estado();
                }
            } else {
                logPeticiones(urlH + 'get_campus_by_oferta/' + nivel, 'data.status_code distinto a 200, valor: ' + data.status_code, err, headers);
            }
        } else {
            logPeticiones(urlH + 'get_campus_by_oferta/' + nivel, 'data.message viene vacío, valor: ' + data.message, err, headers);
        }
    });
    slc = [];
    slc.push('campus');
}
function populate_estados(arr_estado, camp, id_ninteres) {
    /*Funcion para armar la lista de campus By EPM 31-05-2023*/
    let selected, selectedOpt;
    if (typeof camp == 'object') {
        selected = Object.keys(camp).length > 1 ? " " : "selected";
        selectedOpt = Object.keys(camp).length > 1 ? "selected" : " ";
    }
    var tmp_options = [];
    var html_options_camp = '<option value="" disabled ' + selectedOpt + '>Selecciona el campus de interés</option>';
    if (camp.length != undefined) {
        var utc = 0;
        for (var ii = 0; ii < camp.length; ii++) {
            var slug_camp = camp[ii]['slug'];
            var name_camp = camp[ii]['nombre_crm'];
            var estado = camp[ii]['estado'];
            var id_s = camp[ii]['id'];
            var abreviatura = camp[ii]['abreviatura'];
            var nombre_largo = camp[ii]['nombrelargo'];
            tmp_options[utc] = camp[ii]['nombrelargo'];
            var imgTP = camp[ii]['img'];
            var linkTP = camp[ii]['link_recorrido'];
            html_options_camp += '<option value="' + id_s + '" abrevacion="' + abreviatura + '" largo="' + nombre_largo + '" campus="' + id_s + '" modalidad="' + id_ninteres + '" img="' + imgTP + '" link="' + linkTP + '"' + selected + '>' + name_camp + ', ' + estado + '</option>';
        }
        utc++;
    } else {
        var utc = 0;
        for (var record in camp) {
            if (camp[record]) {
                var slug_camp = camp[record]['abreviatura'];
                var name_camp = camp[record]['campuslargo'];
                var estado = camp[record]['crmit_estadoidname'];
                var id_s = camp[record]['campus_crm_id'];
                var equival = camp[record]['equivalencia'];
                var pn = camp[record]['productnumer'];
                var cate = camp[record]['carrerainteres'];
                tmp_options[utc] = camp[record]['campuslargo'];
                var imgTP = camp[record]['img'];
                var linkTP = camp[record]['link_recorrido'];
                html_options_camp += '<option value="' + id_s + '" abreviacion="' + slug_camp + '" campus="' + id_s + '" modalidad="' + id_ninteres + '" reval="' + equival + '" prodnum="' + pn + '" cat="' + cate + '" img="' + imgTP + '" link="' + linkTP + '"' + selected + '>' + name_camp + ', ' + estado + '</option>';
            }
            utc++;
        }
    }
    document.getElementById('slc_campus_interes').innerHTML = '';
    document.getElementById('slc_campus_interes').removeAttribute('disabled');
    document.getElementById('slc_campus_interes').innerHTML = html_options_camp;

    if (tmp_options.length == 1) {
        document.getElementById('slc_campus_interes').selectedIndex = 1;
        /*Se oculta Select de campus cuando solo hay un Campus Disponible para mejorar UX By SRP 14-06-2023*/
        document.getElementById('gpo_campus_interes').classList.add('hidden');
        /*Se oculta Select de campus cuando solo hay un Campus en frm expuesto por producto*/
        document.getElementById('gpo_programa_hs').classList.add('hidden');
        var campusOb = {};
        var f = document.getElementById('slc_campus_interes');
        var text_campus = f.options[f.selectedIndex].text;
        var pnum = f.options[f.selectedIndex].getAttribute('prodnum');
        var cate = f.options[f.selectedIndex].getAttribute('cat');
        var imgCamp = f.options[f.selectedIndex].getAttribute('img');
        var linkCamp = f.options[f.selectedIndex].getAttribute('link');
        guardaUsuarioData('imgCamp', imgCamp);
        guardaUsuarioData('linkCamp', linkCamp);
        var text_campus = f.options[f.selectedIndex].text;
        campusOb["idCampus"] = f.options[f.selectedIndex].value;
        campusOb["abr_campus"] = f.options[f.selectedIndex].getAttribute('abreviacion');
        campusOb["text_campus"] = text_campus;
        campusOb["modalidad"] = cate;
        guardaUsuarioData('campus', campusOb);
        guardaUsuarioData('idDinamycs', pnum);
        micro_data.set('campus', f.options[f.selectedIndex].getAttribute('abreviacion'));
        micro_data.set('campusLargo', text_campus);
        micro_data.set('carreraInteres', pnum);
        micro_data.set('C_Carrera', pnum);
        /*END Guardado de Local Storage cuando SOLO HAY UN CAMPUS PRESENCIAL By SRP 26-05-2023*/
        /*Leyenda Inicio de Clases SRP 26-05-2023*/
        //document.getElementById('alertas').innerHTML = inicioDeClases(pnum);

    } else {
        /*Se oculta Select cuando solo hay un Campus Disponible para mejorar UX By SRP 14-06-2023*/
        document.getElementById('gpo_campus_interes').classList.remove('hidden');
        /*End Se oculta Select cuando solo hay un Campus Disponible para mejorar UX By SRP 14-06-2023*/
    }
    document.getElementById('error_campus').classList.add('hidden');
}
/*****Se comenta para ocultar la seleccion de ciclo LRA 22052024*****/
/*******Funcion para identificar el ciclo vs el bl seleccionado LRA 240124*******/
function blSeleccionado() {
    var selectNivel     = document.getElementById('slc_nivel_de_interes');
    var selectPrograma  = document.getElementById('slc_programa');
    var selectCampus    = document.getElementById('slc_campus_interes');
    var selCam          = selectCampus.value;
    var bSeleccionado   = selectNivel.value;
    var pSeleccionado   = selectPrograma.value;
    var cSeleccionado   = selectCampus.options;
    var bloqueCiclo     = document.getElementById('bloqueCiclo');
    var gciclo          = document.getElementById('gpo_ciclo');
    
    // Verificar si el valor seleccionado es UG-1-5
    if(selectCampus.value != ''){
        if (bSeleccionado == 1 || bSeleccionado == 5) {
            if(pSeleccionado != 'medicina' && pSeleccionado != 'lic-en-cirujano-dentista' && pSeleccionado != 'licenciatura-en-enfermeria-nivelatoria' && pSeleccionado != 'lic-en-medicina-veterinaria-y-zootecnia' ){
                /*****Se comenta para ocultar la seleccion de ciclo LRA 22052024*****/
                bloqueCiclo.classList.remove('hidden');
                gciclo.classList.remove('hidden');
                if (pSeleccionado == 'licenciatura-en-diseo-de-interiores'){
                    if(selCam != "7" && selCam != "8" && selCam !== "11"){
                        bloqueCiclo.classList.remove('hidden');
                        gciclo.classList.remove('hidden');
                    }else{
                        bloqueCiclo.classList.add('hidden');
                        gciclo.classList.add('hidden');
                        document.getElementById('slc_ciclo_hs').value=2;
                        actualizarCicloSeleccionado();
                    }
                }else if(pSeleccionado == 'lic-en-diseno-de-modas'){
                    if(selCam != "7" && selCam != "8"){
                        bloqueCiclo.classList.remove('hidden');
                        gciclo.classList.remove('hidden');
                    }else{
                        bloqueCiclo.classList.add('hidden');
                        gciclo.classList.add('hidden');
                        document.getElementById('slc_ciclo_hs').value=2;
                        actualizarCicloSeleccionado();
                    }
                }
            }
            else{
                document.getElementById('slc_ciclo_hs').value = (pSeleccionado === 'medicina'  || pSeleccionado === 'lic-en-cirujano-dentista' || pSeleccionado === 'lic-en-medicina-veterinaria-y-zootecnia') ? 2 : 1;
                actualizarCicloSeleccionado();
            }
        }else if(bSeleccionado == 10){//Mostramos prepa SEP
            if(pSeleccionado == 'preparatoria'){
                bloqueCiclo.classList.remove('hidden');
                gciclo.classList.remove('hidden');
            }
            else{
                document.getElementById('slc_ciclo_hs').value=2;
                actualizarCicloSeleccionado();
            }
        }else if(bSeleccionado == 4){
            if(pSeleccionado != 'medicina' && pSeleccionado != 'lic-en-cirujano-dentista' && pSeleccionado != 'licenciatura-en-enfermeria-nivelatoria' && pSeleccionado != 'lic-en-medicina-veterinaria-y-zootecnia' ){
                bloqueCiclo.classList.remove('hidden');
                gciclo.classList.remove('hidden');
            }else{
                document.getElementById('slc_ciclo_hs').value = (pSeleccionado === 'medicina'  || pSeleccionado === 'lic-en-cirujano-dentista' || pSeleccionado === 'lic-en-medicina-veterinaria-y-zootecnia') ? 2 : 1;
                actualizarCicloSeleccionado();
            }
        }else {
            bloqueCiclo.classList.add('hidden');
            gciclo.classList.remove('hidden');
            document.getElementById('slc_ciclo_hs').value=1;
        }
    }else{
        bloqueCiclo.classList.add('hidden');
        document.getElementById('error_ciclo').classList.add('hidden');
        document.getElementById('slc_ciclo_hs').value=1;
        actualizarCicloSeleccionado();
    }
}
function change_estado_prog(ciclos) {    
    if (Reflect.ownKeys(ciclos).length <= 2) {
        var f = document.getElementById('slc_campus_interes');
        var campus = f.options[f.selectedIndex].getAttribute('abreviacion');
        var rev = f.options[f.selectedIndex].getAttribute('reval');
        var pnum = f.options[f.selectedIndex].getAttribute('prodnum');
        var cate = f.options[f.selectedIndex].getAttribute('cat');
        /*****Se comenta para ocultar la seleccion de ciclo LRA 22052024*****/
        //document.getElementById('gpo_ciclo').classList.add('hidden');
        pares = [];
        pares.push(pnum);
        cat = [];
        cat.push(cate);
        var cilic = ciclos[campus];
        if (rev == 'SI') {
            document.getElementById('gpo_revalidaci_n_equivalencias_').classList.remove('hidden');
        } else {
            document.getElementById('gpo_revalidaci_n_equivalencias_').classList.add('hidden');
        }
    }
    document.getElementById('slc_campus_interes').addEventListener("change", (e) => {
        e.preventDefault();
        activador = 'frm_select_campus';
        document.getElementById('error_campus').classList.add('hidden');        
        /*****Se comenta para ocultar la seleccion de ciclo LRA 22052024*****/
        /*var subtituloCicloElement = document.querySelector('.subtituloCiclo');
        subtituloCicloElement.style.top = '265px';*/
        var f = document.getElementById('slc_campus_interes');
        var nomPrograma = document.getElementById('slc_programa');
        var numberOfOptions = f.options.length;
        var nPrograma = nomPrograma.options[nomPrograma.selectedIndex].innerText;
        var campus = f.options[f.selectedIndex].getAttribute('abreviacion');
        var rev = f.options[f.selectedIndex].getAttribute('reval');
        var pnum = f.options[f.selectedIndex].getAttribute('prodnum');
        var cate = f.options[f.selectedIndex].getAttribute('cat');
        var imgCamp = f.options[f.selectedIndex].getAttribute('img');
        var linkCamp = f.options[f.selectedIndex].getAttribute('link');
        guardaUsuarioData('imgCamp', imgCamp);
        guardaUsuarioData('linkCamp', linkCamp);
        var campusOb = {};
        var text_campus = f.options[f.selectedIndex].text;
        campusOb["idCampus"] = f.options[f.selectedIndex].value;
        campusOb["abr_campus"] = campus;
        campusOb["text_campus"] = text_campus;
        campusOb["modalidad"] = cate;
        guardaUsuarioData('campus', campusOb);
        guardaUsuarioData('idDinamycs', pnum);
        micro_data.set('campus', campus);
        micro_data.set('campusLargo', text_campus);
        micro_data.set('carreraInteres', pnum);
        micro_data.set('C_Carrera', pnum);
        //document.getElementById('alertas').innerHTML = inicioDeClases(pnum);
        /*****Se comenta para ocultar la seleccion de ciclo LRA 22052024*****/
        //document.getElementById('gpo_ciclo').classList.add('hidden');
        pares = [];
        pares.push(pnum);
        cat = [];
        cat.push(cate);
        nCampus = [];
        nCampus.push(campus);
        selCarrera = nPrograma;
        var cilic = ciclos[campus];
        if (rev == 'SI' || pnum == 1266) {
            document.getElementById('gpo_revalidaci_n_equivalencias_').classList.remove('hidden');
        } else {
            document.getElementById('gpo_revalidaci_n_equivalencias_').classList.add('hidden');
        }
        /***Hace el envio cuando es Presencial y seleccionaron el campus LRA 3100523**/
        envioLeads();
        /*****Se comenta para ocultar la seleccion de ciclo LRA 22052024*****/
        //blSeleccionado();
    });
}
function change_prog() {
    var tmp_ciclos = [];    
    //document.getElementById('slc_programa').addEventListener("change", (e) => {   
        //Fix para check validacion
        document.getElementById("revalidaci_n_equivalencias_").checked = false;
        document.getElementById('gpo_revalidaci_n_equivalencias_').classList.add('hidden');             
        let p = document.getElementById('slc_programa');
        var slc_car = p.options[p.selectedIndex].getAttribute('value');        
        var slc_car_label = p.options[p.selectedIndex].text;
        var carrera = {};
        carrera["nombreCliente"] = slc_car_label;
        carrera["nombreCRM"] = p.options[p.selectedIndex].getAttribute('name_carrera');
        carrera["link"] = slc_car;
        guardaUsuarioData('carrera', carrera);
        micro_data.set('carrera', p.options[p.selectedIndex].getAttribute('name_carrera'));
        //document.getElementById('alertas').innerHTML = inicioDeClases('0');
        /*****Se comenta para ocultar la seleccion de ciclo LRA 22052024*****/
        //bloqueCiclo.classList.add('hidden');
        var nam_c = p.options[p.selectedIndex].getAttribute('name_carrera');
        document.getElementById('error_programa').classList.add('hidden');
        names_carr = [];
        names_carr.push(nam_c);
        var camp = tmp_campus[slc_car];
        var numElementos = Object.keys(camp).length;
        var tmp_arr_estados = [];
        tmp_ciclos = [];
        for (var record in camp) {
            tmp_ciclos[record] = [];
            if (camp[record]) {
                var estado = camp[record]['crmit_estadoidname'];
                if (!tmp_arr_estados.includes(estado)) {
                    tmp_arr_estados.push(estado);
                }
                if (!tmp_ciclos[record].includes(estado)) {
                    tmp_ciclos[record].push(estado);
                }
            }
        }
        populate_estados(tmp_arr_estados, camp, '');
        change_estado_prog(tmp_ciclos);
        /***Hace el envio cuando es Presencial y solo tiene un campus LRA 3100523**/
        if (numElementos == 1) {
            var f = document.getElementById('slc_campus_interes');
            var campus = f.options[f.selectedIndex].getAttribute('abreviacion');
            nCampus = campus;
            selCarrera = names_carr;
            envioLeads();
            /*****Se comenta para ocultar la seleccion de ciclo LRA 22052024*****/
            /*blSeleccionado();
            var subtituloCicloElement = document.querySelector('.subtituloCiclo');
            subtituloCicloElement.style.top = '140px';*/
        }
    //}, false);
}

function get_programas(nivel, tipo) {
    slc = [];
    slc.push('programas');
  if(vSlug == 'prepa-en-linea'){
        nivel = 11;
    }
    getJSON(urlH + 'get_programas_by_slug/' + nivel  + '/' + vSlug, function (err, data, headers) {
        if (err !== 200) {
            /***Complemento log LRA 220623***/
            if (typeof window.clarity !== 'undefined') {
                clarity("set", "nivel", nivel);
                clarity("set", "codigo_err", err);
            }
            logPeticiones(urlH + 'get_programas_by_slug/' + nivel  + '/' + vSlug, 'Error EP', err, headers);
        } else {
            if (data != null) {
                if (data.status_code == 200) {                    
                    if (document.getElementById('gpo_campus_interes')) {
                        //document.getElementById('gpo_campus_interes').classList.remove('hidden');
                        document.getElementById('slc_campus_interes').innerHTML = '';
                        document.getElementById('slc_campus_interes').innerHTML = '<option value="">Selecciona el campus de interés</option>';
                        document.getElementById('slc_campus_interes').setAttribute('disabled', true);
                    }
                    document.getElementById('cont').style.opacity = 1;
                    document.getElementById('cont').style.display = 'flex';
                    //Cambiar select autocomplete por nativo de programas de interes by EPM 05/06/2023
                    let selectedProg = "selected";
                    let selected = "";
                    let html_options_prog = '<option value="" disabled ' + selectedProg + '>Selecciona el programa de interés</option>';
                    let preselectedValue = vSlug;
                    for (var record in data.message) {
                        tmp_campus[record] = [];
                        if (data.message[record]) {
                            var info = data.message[record];
                            tmp_campus[record] = info.campus;
                            var categoria = record;
                            var name_correcto = data.message[record]['cms_titulo'];
                            var carrera = data.message[record]['nombre_carrera'];
                            var p_num = data.message[record]['productnumer'];
                            selected = (categoria === preselectedValue) ? "selected" : "";
                            html_options_prog += '<option disabled value="' + categoria + '" name_carrera="' + carrera + '" p_num="' + p_num + '" ' + selected + '>' + name_correcto + '</option>';
                        }
                    }

                document.getElementById('slc_programa').innerHTML = html_options_prog;
                    
                    change_prog();
                } else {
                    logPeticiones(urlH + 'get_programas_by_slug/' + nivel  + '/' + vSlug, 'data.status_code distinto a 200, valor: ' + data.status_code, err, headers);
                }
            } else {
                if (typeof window.clarity !== 'undefined') {
                    clarity("set", "nivel", nivel);
                    clarity("set", "codigo_err", err);
                }
                logPeticiones(urlH + 'get_programas_by_slug/' + nivel  + '/' + vSlug, 'Data vacio', err, headers);
            }
        }
    });
}
function prog_online(nivel, tipo) {
    slc = [];
    slc.push('progrmas')
    getJSON(urlH + 'get_programas_by_slug/' + nivel  + '/' + vSlug, function (err, data, headers) {
        if (err !== 200) {
            if (typeof window.clarity !== 'undefined') {
                clarity("set", "nivel", nivel);
                clarity("set", "codigo_err", err);
            }
            logPeticiones(urlH + 'get_programas_by_slug/' + nivel  + '/' + vSlug, 'Error EP', err, data, headers);
        } else {
            if (data != null) {
                if (data.status_code == 200) {                    
                    var count = Reflect.ownKeys(data.message).length;
                    selectedProg = count == 1 ? "" : "selected";
                    selected = count > 1 ? "" : "selected";
                    let html_options_prog = '<option value="" disabled ' + selectedProg + '>- ¿Qué programa te interesa? -</option>';

                    for (var record in data.message) {
                        tmp_campus[record] = [];
                        if (data.message[record]) {
                            var info = data.message[record];
                            tmp_campus[record] = info.campus;
                            var categoria = record;
                            var name_correcto = data.message[record]['cms_titulo'];
                            var carrera = data.message[record]['nombre_carrera'];
                            var p_num = data.message[record]['productnumer'];
                            html_options_prog += '<option value="' + categoria + '" name_carrera="' + carrera + '" p_num="' + p_num + '" ' + selected + '>' + name_correcto + '</option>';
                        }
                    }

                    document.getElementById('slc_programa').innerHTML = html_options_prog;
                    if (count == 1) {
                        document.getElementById('slc_campus_interes').innerHTML = '';
                        var pdn, codmodalidad, abre, carreint, Cliente, carrera, rev, id_s, imgTP, linkTP;
                        for (var record in data.message) {
                            carrera = data.message[record]['nombre_carrera'];
                            Cliente = data.message[record]['cms_titulo'];
                            rev = data.message[record]['campus']['ONL']['equivalencia'];
                            id_s = data.message[record]['campus']['ONL']['campus_crm_id'];
                            abre = data.message[record]['campus']['ONL']['abreviatura'];
                            carreint = data.message[record]['campus']['ONL']['carrerainteres'];
                            pdn = data.message[record]['campus']['ONL']['productnumer'];
                            codmodalidad = data.message[record]['campus']['ONL']['codigo_unico_modalidad'];
                            imgTP = data.message[record]['campus']['ONL']['img'];
                            linkTP = data.message[record]['campus']['ONL']['link_recorrido'];
                            guardaUsuarioData('imgCamp', imgTP);
                            guardaUsuarioData('linkCamp', linkTP);
                            cat = [];
                            cat.push(carrera)
                            pares = [];
                            pares.push(pdn);
                        }
                        var html_options_camp = '<option value="' + id_s + '" abreviacion="' + abre + '" campus="' + id_s + '" modalidad="' + nivel + '" reval="' + rev + '" prodnum="' + pdn + '" cat="' + carreint + '" img="' + imgTP + '" link="' + linkTP + '"' + '" selected></option>';
                        document.getElementById('slc_campus_interes').innerHTML = html_options_camp;
                        if (rev == 'SI') {
                            document.getElementById('gpo_revalidaci_n_equivalencias_').classList.remove('hidden');
                        } else {
                            document.getElementById('gpo_revalidaci_n_equivalencias_').classList.add('hidden');
                        }

                        var carreraOj = {};
                        carreraOj["nombreCliente"] = Cliente;
                        carreraOj["nombreCRM"] = carrera;
                        carreraOj["link"] = "prepa-en-linea";
                        guardaUsuarioData('carrera', carreraOj);
                        micro_data.set('carrera', carrera);
                        var campusOb = {};
                        campusOb["idCampus"] = id_s;
                        campusOb["abr_campus"] = abre;
                        campusOb["text_campus"] = "En Línea";
                        campusOb["modalidad"] = codmodalidad;
                        guardaUsuarioData('campus', campusOb);
                        guardaUsuarioData('idDinamycs', pdn);
                        micro_data.set('campus', abre);
                        micro_data.set('campusLargo', "En Línea");
                        micro_data.set('subNivelInteres', carreint);
                        micro_data.set('Pobla', carreint);
                        micro_data.set('L_Negocio', "P");
                        micro_data.set('C_Carrera', pdn);
                        micro_data.set('nom_campus', "En Línea");
                        micro_data.set('Link', 'prepa-en-linea');
                        micro_data.set('nombre2', Cliente);
                        micro_data.set('modalidad', "9");
                        micro_data.set('nivelInteres', "P");
                        micro_data.set('carreraInteres', pdn);
                        micro_data.set('modalidad', codmodalidad);
                        document.getElementById('gpo_programa_hs').classList.add('hidden');

                    } else {
                        document.getElementById('slc_programa').addEventListener("change", (e) => {
                            activador = 'frm_select_carrera';
                            document.getElementById('gpo_revalidaci_n_equivalencias_').classList.add('hidden');
                            document.getElementById("revalidaci_n_equivalencias_").checked = false;
                            document.getElementById('error_programa').classList.add('hidden');
                            let p = document.getElementById('slc_programa');
                            var slc_car = p.options[p.selectedIndex].getAttribute('value');
                            var nam_c = p.options[p.selectedIndex].getAttribute('name_carrera');
                            var labelCarr = p.options[p.selectedIndex].text;

                            var camp = tmp_campus[slc_car];
                            var carrera = {};
                            carrera["nombreCliente"] = labelCarr;
                            carrera["nombreCRM"] = nam_c;
                            carrera["link"] = slc_car;
                            guardaUsuarioData('carrera', carrera);
                            micro_data.set('carrera', nam_c);

                            var campusOb = {};
                            campusOb["idCampus"] = camp.ONL.campus_crm_id;
                            campusOb["abr_campus"] = camp.ONL.abreviatura;
                            campusOb["text_campus"] = camp.ONL.campuslargo;
                            campusOb["modalidad"] = camp.ONL.codigo_unico_modalidad;
                            guardaUsuarioData('campus', campusOb);
                            guardaUsuarioData('idDinamycs', camp.ONL.productnumer);
                            micro_data.set('campus', camp.ONL.abreviatura);
                            micro_data.set('campusLargo', camp.ONL.campuslargo);
                            micro_data.set('subNivelInteres', camp.ONL.carrerainteres);
                            micro_data.set('nivelInteres', "U");
                            micro_data.set('carreraInteres', camp.ONL.productnumer);
                            micro_data.set('modalidad', "3");
                            micro_data.set('nom_campus', camp.ONL.abreviatura);
                            micro_data.set('nom_campus', camp.ONL.campuslargo);
                            micro_data.set('nombre2', nam_c);
                            micro_data.set('C_Carrera', camp.ONL.productnumer);
                            micro_data.set('Pobla', camp.ONL.carrerainteres);
                            micro_data.set('L_Negocio', "U");
                            guardaUsuarioData('imgCamp', camp.ONL.img);
                            guardaUsuarioData('linkCamp', camp.ONL.link_recorrido);

                            names_carr = [];
                            names_carr.push(nam_c);
                            if (typeof camp == 'object') {
                                selected = Object.keys(camp).length > 1 ? " " : "selected";
                            }
                            for (var record in camp) {
                                if (camp[record]) {
                                    var id_s = camp[record]['campus_crm_id'];
                                    var abre = camp[record]['abreviatura'];
                                    var carreint = camp[record]['carrerainteres'];
                                    var rev = camp[record]['equivalencia'];
                                    var imgTP = camp[record]['img'];
                                    var linkTP = camp[record]['link_recorrido'];
                                    cat = [];
                                    cat.push(carreint)
                                    var pdn = camp[record]['productnumer'];
                                    pares = [];
                                    pares.push(pdn);
                                    var html_options_camp = '<option value="' + id_s + '" abreviacion="' + abre + '" campus="' + id_s + '" modalidad="' + nivel + '" reval="' + rev + '" prodnum="' + pdn + '" cat="' + carreint + '" img="' + imgTP + '" link="' + linkTP + '"' + selected + '></option>';
                                }
                            }
                            document.getElementById('slc_campus_interes').innerHTML = '';
                            document.getElementById('slc_campus_interes').innerHTML = html_options_camp;
                            if (rev == 'SI') {
                                document.getElementById('gpo_revalidaci_n_equivalencias_').classList.remove('hidden');
                            } else {
                                document.getElementById('gpo_revalidaci_n_equivalencias_').classList.add('hidden');
                            }
                            /***Hace el envio cuando es Onl LRA 3100523**/
                            if (banderaOnl) {
                                selCarrera = names_carr;
                                envioLeads();
                            }
                        }, false);
                    }
                    document.getElementById('error_campus').classList.add('hidden');
                } else {
                    logPeticiones(urlH + 'get_programas_by_slug/' + nivel  + '/' + vSlug, 'data.status_code distinto a 200, valor: ' + data.status_code, err, headers);
                }
            } else {
                logPeticiones(urlH + 'get_programas_by_slug/' + nivel  + '/' + vSlug, 'Data vacio', err, headers);
            }
        }
    });
    //Se comenta para ocultar seleccion de ciclo
    //blSeleccionado();
}
function diploma(nivel, tipo) {
    slc = [];
    slc.push('progrmas')
    document.getElementById('gpo_diploma_hs').classList.remove('hidden');
    document.getElementById('gpo_diploma_hs').addEventListener("change", (e) => {
        activador = 'frm_select_diploma';
        if (document.getElementById('gpo_programa_hs')) {
            document.getElementById('gpo_programa_hs').classList.add('hidden');
            document.getElementById('error_Diploma').classList.add('hidden');
            document.getElementById('gpo_programa_hs').innerHTML = '';
            document.getElementById('gpo_programa_hs').innerHTML = '<div class="form-group"><div class="cont-prepa"><div id="icon-programa" class="PROGRAMA"></div></div><select class="form-control w-98" id="slc_programa" name="programa_hs" type="select" required="" data-trigger placeholder="buscar"><option value="" disabled>- ¿Qué programa te interesa? -</option></select></div><label for="error_programa" class="hidden error-form-select" id="error_programa">Selecciona una opción.</label>';
        }
        var e = document.getElementById('slc_diploma_hs_');
        var opt = e.options[e.selectedIndex].value;
        if (opt == 1) {
            var url = urlH + 'get_programas_by_slug/' + nivel + '/' + vSlug + '/' + opt;
        } else {
            var url = urlH + 'get_programas_by_slug/' + nivel + '/' + vSlug;
        }
        getJSON(url, function (err, data, headers) {
            if (err !== 200) {
                console.log(err);
                console.log("Error al Cargar");
            } else {
                if (data.message != null) {
                    //Llenar oferta by EPM 05/06/2023
                    let selectedProg = "selected";
                    let selected = "";
                    let html_options_prog = '<option value="" disabled ' + selectedProg + '>Selecciona el programa de tu interés</option>';
                    let nOptions = 0;
                    let preselectedValue = vSlug;
                    if (typeof data.message == 'object') {
                        nOptions = data.message.length;
                        selected = nOptions == 1 ? "selected" : "";
                        selectedProg = nOptions == 1 ? "" : "selected";
                    }
                    for (var record in data.message) {
                        tmp_campus[record] = [];
                        if (data.message[record]) {
                            var info = data.message[record];
                            tmp_campus[record] = info.campus;
                            var categoria = record;
                            var name_correcto = data.message[record]['cms_titulo'];
                            var carrera = data.message[record]['nombre_carrera'];
                            selected = (categoria === preselectedValue) ? "selected" : "";
                            html_options_prog += '<option value="' + categoria + '" name_carrera="' + carrera + '" ' + selected + '>' + name_correcto + '</option>';
                        }
                    }
                    
                    document.getElementById('slc_programa').innerHTML = html_options_prog;

                    //document.getElementById('slc_programa').addEventListener("change", (e) => {
                        /*****Se comenta para ocultar la seleccion de ciclo LRA 22052024*****/
                        //document.getElementById('gpo_ciclo').classList.add('hidden');
                        document.getElementById('gpo_revalidaci_n_equivalencias_').classList.add('hidden');
                        document.getElementById("revalidaci_n_equivalencias_").checked = false;
                        document.getElementById('error_programa').classList.add('hidden');
                        let p = document.getElementById('slc_programa');
                        let slc_car = p.options[p.selectedIndex].getAttribute('value');
                        let nam_c = p.options[p.selectedIndex].getAttribute('name_carrera');

                        var carrera = {};
                        carrera["nombreCliente"] = p.options[p.selectedIndex].text;
                        carrera["nombreCRM"] = nam_c;
                        carrera["link"] = slc_car;
                        guardaUsuarioData('carrera', carrera);
                        micro_data.set('carrera', nam_c);

                        names_carr = [];
                        names_carr.push(nam_c);
                        var camp = tmp_campus[slc_car];

                        var campusOb = {};
                        campusOb["idCampus"] = camp.ONL.campus_crm_id;
                        campusOb["abr_campus"] = camp.ONL.abreviatura;
                        campusOb["text_campus"] = camp.ONL.campuslargo;
                        campusOb["modalidad"] = camp.ONL.codigo_unico_modalidad;
                        guardaUsuarioData('campus', campusOb);
                        guardaUsuarioData('idDinamycs', camp.ONL.productnumer);
                        micro_data.set('carreraInteres', camp.ONL.productnumer);
                        micro_data.set('campus', camp.ONL.abreviatura);
                        micro_data.set('campusLargo', camp.ONL.campuslargo);
                        micro_data.set('subNivelInteres', camp.ONL.carrerainteres);
                        micro_data.set('nivelInteres', "G");
                        micro_data.set('modalidad', "3");
                        micro_data.set('C_Carrera', camp.ONL.productnumer);
                        micro_data.set('Pobla', camp.ONL.carrerainteres);
                        micro_data.set('L_Negocio', "G");
                        micro_data.set('nom_campus', camp.ONL.campuslargo);
                        micro_data.set('nombre2', nam_c);
                        guardaUsuarioData('imgCamp', camp.ONL.img);
                        guardaUsuarioData('linkCamp', camp.ONL.link_recorrido);

                        for (var record in camp) {
                            if (camp[record]) {
                                var id_s = camp[record]['campus_crm_id'];
                                var abre = camp[record]['abreviatura'];
                                var carreint = camp[record]['carrerainteres'];
                                var rev = camp[record]['equivalencia'];
                                cat = [];
                                cat.push(carreint)
                                var pdn = camp[record]['productnumer'];
                                pares = [];
                                pares.push(pdn);
                                var html_options_camp = '<option value="' + id_s + '" abreviacion="' + abre + '" campus="' + id_s + '" modalidad="' + nivel + '" reval="' + rev + '" prodnum="' + pdn + '" cat="' + carreint + '" selected></option>';
                            }
                        }
                        document.getElementById('slc_campus_interes').innerHTML = '';
                        document.getElementById('slc_campus_interes').innerHTML = html_options_camp;
                        if (rev == 'SI') {
                            document.getElementById('gpo_revalidaci_n_equivalencias_').classList.remove('hidden');
                        } else {
                            document.getElementById('gpo_revalidaci_n_equivalencias_').classList.add('hidden');
                        }
                        /***Hace el envio cuando es Mtria en linea y selecciona SI/NO LRA 3100523**/
                        selCarrera = names_carr;
                        envioLeads();

                    //}, false);
                } else {
                    logPeticiones(url, 'data.message vacío, valor: ' + data.message, err, headers);
                }
            }
        });
    });
    //Se comenta para ocultar seleccion de ciclo
    //blSeleccionado();
}
change_pos();

if (document.getElementById('slc_nivel_de_interes')) {
    document.getElementById('slc_nivel_de_interes').addEventListener("change", (e) => {
        e.preventDefault();
        activador = 'frm_select_nivelInteres';
        /*****Se comenta para ocultar la seleccion de ciclo LRA 22052024*****/
        //document.getElementById('bloqueCiclo').classList.add('hidden');
        document.getElementById('slc_nivel_de_interes').classList.remove('input-error');
        document.getElementById('error_nivel').classList.add('hidden');
        document.getElementById('cont').style.opacity = 0;
        document.getElementById('cont').style.display = 'none';
        /*if (document.getElementById('gpo_programa_hs')) {
            document.getElementById('gpo_programa_hs').classList.add('hidden');
            document.getElementById('gpo_programa_hs').innerHTML = '';
            //document.getElementById('gpo_programa_hs').innerHTML = '<div class="form-group"><div class="cont-prepa"><div id="icon-programa" class="PROGRAMA"></div></div><select class="form-control w-98" id="slc_programa" name="programa_hs" type="select" required="" data-trigger placeholder="buscar"><option value="" selected disabled>- ¿Qué programa te interesa? -</option></select></div><label for="error_programa" class="hidden error-form" id="error_programa">Selecciona una opción.</label>';
            document.getElementById('gpo_programa_hs').innerHTML = '<div class="form-group"><div class="cont-prepa"><div id="icon-programa" class="PROGRAMA"></div></div><select class="form-control w-98" id="slc_programa" name="programa_hs" type="select" required="" data-trigger placeholder="buscar"><option value="" selected disabled>- ¿Qué programa te interesa? -</option></select></div><label for="error_programa" class="hidden error-form-select" id="error_programa">Selecciona una opción.</label>';
        }*/
        if (document.getElementById('gpo_campus_interes')) {
            document.getElementById('gpo_campus_interes').classList.add('hidden');
        }
        /*****Se muestra input de campus al seleccionar nInteres para tratar de disminuir errores detectados LRA 160724*****/
        var val = document.getElementById('slc_nivel_de_interes');
        var id_ninteres = val.options[val.selectedIndex].value;
            
        if(id_ninteres == 1 || id_ninteres == 2 || id_ninteres == 4 || id_ninteres == 10){            
            //document.getElementById('gpo_campus_interes').classList.remove('hidden');
        }
        /*****Se muestra input de campus al seleccionar nInteres para tratar de disminuir errores detectados LRA 160724*****/
        if (document.getElementById('slc_campus_interes')) {
            document.getElementById('slc_campus_interes').innerHTML = '';
            document.getElementById('slc_campus_interes').innerHTML = '- Campus de tu interés -';
            document.getElementById('slc_campus_interes').setAttribute('disabled', true);
        }
        if (document.getElementById('gpo_programa_hs').classList.contains('paca')) {
            document.getElementById('gpo_programa_hs').classList.remove('paca');

        }
        if (document.getElementById('gpo_campus_interes').classList.contains('paya')) {
            document.getElementById('gpo_campus_interes').classList.remove('paya');
        }
        document.getElementById('gpo_diploma_hs').classList.add('hidden');
        document.getElementById('slc_diploma_hs_').value = '';
        var e = document.getElementById('slc_nivel_de_interes');

        var name = e.options[e.selectedIndex].text;
        guardaUsuarioData('modalidadName', name);
        updateFormCookie(nombreCookie, "modalidadName", name, 1);
        if (typeof window.clarity !== 'undefined') {
            clarity("set", "bl", id_ninteres);
        }
        var modalidad = {};
        var id_ninteres = e.options[e.selectedIndex].value;
        var text_ninteres = e.options[e.selectedIndex].text;
        modTxt = e.options[e.selectedIndex].getAttribute('modalidadtxt');
        modalidad["id_ninteres"] = id_ninteres;
        modalidad["text_ninteres"] = text_ninteres;
        modalidad["subNivel"] = e.options[e.selectedIndex].getAttribute('snivel');
        modalidad["nivel"] = e.options[e.selectedIndex].getAttribute('nivel');
        modalidad["modalidad"] = e.options[e.selectedIndex].getAttribute('modalidad');
        guardaUsuarioData('linea', modalidad);

        micro_data.set('Pobla', modalidad["subNivel"]);
        micro_data.set('L_Negocio', modalidad["nivel"]);
        micro_data.set('linea', text_ninteres);
        micro_data.set('subNivelInteres', e.options[e.selectedIndex].getAttribute('snivel'));
        micro_data.set('nivelInteres', e.options[e.selectedIndex].getAttribute('nivel'));
        micro_data.set('modalidad', e.options[e.selectedIndex].getAttribute('modalidad'));

        var tipo_form = 2;
        document.getElementById('gpo_revalidaci_n_equivalencias_').classList.add('hidden');
        document.getElementById("revalidaci_n_equivalencias_").checked = false;
        if (id_ninteres == 9) {
            diploma(id_ninteres, tipo_form);
        } else {
            if (id_ninteres == 3 || id_ninteres == 7 || id_ninteres == 11) {
                prog_online(id_ninteres, tipo_form);
            } else {
                get_programas(id_ninteres, tipo_form);
            }
        }
        if (id_ninteres == 3 || id_ninteres == 7 || id_ninteres == 9) {
            banderaOnl = true;
        }
        /***Hace el envio cuando es Prepa ONL LRA 3100523**/
        else if (id_ninteres == 11) {
            selCarrera = names_carr;
            envioLeads();
        }
        
        /*const slcPrograma = document.getElementById('slc_programa');
        if (slcPrograma) {
            slcPrograma.dispatchEvent(new Event('change'));
            change_prog();
            console.log("SI ENTRO AL CAMBIO");
        }*/
    }); 
}
if (document.getElementById('firstname')) {
    document.getElementById('firstname').addEventListener("blur", (e) => {
        var nombre = document.getElementById('firstname').value;
        if (nombre == '' || blackList(nombre)) {
            document.getElementById('error_nombre').innerHTML = '';
            document.getElementById('error_nombre').classList.remove('hidden');
            document.getElementById('error_nombre').innerHTML = 'El nombre no es válido.';
            document.getElementById('firstname').classList.remove('input-focus');
            document.getElementById('firstname').classList.add('input-error');         
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'trackerrorformGA4',
                'error_message': 'El nombre no es válido.',
				'layer': 'datos personales',
				'form_action': 'empty',
				'form_field': 'frm_nombre',
				'form_name': 'Formulario Tradicional',
                'form_type':'Expuesto',
				'event_type':'user_error'            
            });
        } else {
            if (nombre.length <= 2 || nombre.length > 50) {
                document.getElementById('error_nombre').innerHTML = '';
                document.getElementById('error_nombre').classList.remove('hidden');
                document.getElementById('error_nombre').innerHTML = 'Ingrese más de dos letras y menos de 50.';
                document.getElementById('firstname').classList.remove('input-focus');
                document.getElementById('firstname').classList.add('input-error');
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'trackerrorformGA4',
                    'error_message': 'Ingrese más de dos letras y menos de 30.',
                    'layer': 'datos personales',
                    'form_action': 'invalid',
                    'form_field': 'frm_nombre',
                    'form_name': 'Formulario Tradicional',
                    'form_type':'Expuesto',
                    'event_type':'user_error'              
                }); 
            } else {
                document.getElementById('firstname').classList.add('input-focus');
                document.getElementById('firstname').classList.remove('input-error');
                document.getElementById('error_nombre').classList.add('hidden');

            }
        }
    });
    document.getElementById('firstname').addEventListener("keyup", (e) => {
        if (e.target.value.length > 2) {
            document.getElementById('firstname').classList.add('input-focus');
            document.getElementById('firstname').classList.remove('input-error');
            document.getElementById('error_nombre').classList.add('hidden');
        }
    });
}
if (document.getElementById('lastname')) {
    document.getElementById('lastname').addEventListener("blur", (e) => {
        var apps = document.getElementById('lastname').value;
        if (apps == '' || blackList(apps)) {
            document.getElementById('error_lastname').innerHTML = '';
            document.getElementById('error_lastname').classList.remove('hidden');
            document.getElementById('error_lastname').innerHTML = 'El apellido no es válido.';
            document.getElementById('lastname').classList.remove('input-focus');
            document.getElementById('lastname').classList.add('input-error');            
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'trackerrorformGA4',
                'error_message': 'El apellido no es válido.',
				'layer': 'datos personales',
				'form_action': 'empty',
				'form_field': 'frm_apaterno',
				'form_name': 'Formulario Tradicional',
                'form_type':'Expuesto',
				'event_type':'user_error'              
            });
        } else if (apps.length <= 2 || apps.length > 50) {
            document.getElementById('error_lastname').innerHTML = '';
            document.getElementById('error_lastname').classList.remove('hidden');
            document.getElementById('error_lastname').innerHTML = 'Ingrese más de dos letras y menos de 50.';
            document.getElementById('lastname').classList.remove('input-focus');
            document.getElementById('lastname').classList.add('input-error');            
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'trackerrorformGA4',
                'error_message': 'El apellido no es válido.',
				'layer': 'datos personales',
				'form_action': 'invalid',
				'form_field': 'frm_apaterno',
				'form_name': 'Formulario Tradicional',
                'form_type':'Expuesto',
				'event_type':'user_error'            
            }); 
        } else {
            document.getElementById('lastname').classList.add('input-focus');
            document.getElementById('lastname').classList.remove('input-error');
            document.getElementById('error_lastname').classList.add('hidden');
        }
    });
    document.getElementById('lastname').addEventListener("keyup", (e) => {
        if (e.target.value.length > 2) {
            document.getElementById('lastname').classList.add('input-focus');
            document.getElementById('lastname').classList.remove('input-error');
            document.getElementById('error_lastname').classList.add('hidden');
        }
    });
}
if (document.getElementById('lastname_m')) {
    document.getElementById('lastname_m').addEventListener("blur", (e) => {
        var apps = document.getElementById('lastname_m').value;
        if (apps == '' || blackList(apps)) {
            document.getElementById('error_lastname_m').innerHTML = '';
            document.getElementById('error_lastname_m').classList.remove('hidden');
            document.getElementById('error_lastname_m').innerHTML = 'El apellido no es válido.';
            document.getElementById('lastname_m').classList.remove('input-focus');
            document.getElementById('lastname_m').classList.add('input-error');            
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'trackerrorformGA4',
                'error_message': 'El apellido no es válido.',
				'layer': 'datos personales',
				'form_action': 'empty',
				'form_field': 'frm_amaterno',
				'form_name': 'Formulario Tradicional',
                'form_type':'Expuesto',
				'event_type':'user_error'              
            });
        } else if (apps.length <= 2 || apps.length > 50) {
            document.getElementById('error_lastname_m').innerHTML = '';
            document.getElementById('error_lastname_m').classList.remove('hidden');
            document.getElementById('error_lastname_m').innerHTML = 'Ingrese más de dos letras y menos de 50.';
            document.getElementById('lastname_m').classList.remove('input-focus');
            document.getElementById('lastname_m').classList.add('input-error');            
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'trackerrorformGA4',
                'error_message': 'Ingrese más de dos letras y menos de 30.',
				'layer': 'datos personales',
				'form_action': 'invalid',
				'form_field': 'frm_amaterno',
				'form_name': 'Formulario Tradicional',
                'form_type':'Expuesto',
				'event_type':'user_error'             
            });
        } else {
            document.getElementById('lastname_m').classList.add('input-focus');
            document.getElementById('lastname_m').classList.remove('input-error');
            document.getElementById('error_lastname_m').classList.add('hidden');
        }
    });
    document.getElementById('lastname_m').addEventListener("keyup", (e) => {
        if (e.target.value.length > 2) {
            document.getElementById('lastname_m').classList.add('input-focus');
            document.getElementById('lastname_m').classList.remove('input-error');
            document.getElementById('error_lastname_m').classList.add('hidden');
        }
    });
}
if (document.getElementById('phone_calc')) {
    document.getElementById('phone_calc').addEventListener("blur", (e) => {
        var phone = document.getElementById('phone_calc').value;
        if (phone.length < 10 || phone.length > 10) {
            document.getElementById('error_phone').innerHTML = '';
            document.getElementById('error_phone').classList.remove('hidden');
            document.getElementById('error_phone').innerHTML = 'Introduce un número a 10 dígitos.';
            document.getElementById('phone_calc').classList.remove('input-focus');
            document.getElementById('phone_calc').classList.add('input-error');            
            let action = phone.length < 1 ? 'empty': 'invalid';
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'trackerrorformGA4',
                'error_message': 'Introduce un número a 10 dígitos.',
				'layer': 'datos personales',
				'form_action': action,
				'form_field': 'frm_celular',
				'form_name': 'Formulario Tradicional',
                'form_type':'Expuesto',
				'event_type':'user_error'          
            });
        } else {
            if (phone == '') {
                document.getElementById('error_phone').innerHTML = '';
                document.getElementById('error_phone').classList.remove('hidden');
                document.getElementById('error_phone').innerHTML = 'Introduce un número a 10 dígitos.';
                document.getElementById('phone_calc').classList.remove('input-focus');
                document.getElementById('phone_calc').classList.add('input-error');                
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'trackerrorformGA4',
                    'error_message': 'Introduce un número a 10 dígitos.',
                    'layer': 'datos personales',
                    'form_action': 'empty',
                    'form_field': 'frm_celular',
                    'form_name': 'Formulario Tradicional',
                    'form_type':'Expuesto',
                    'event_type':'user_error'             
                }); 
            }else if( validphone(phone)==false){
                document.getElementById('error_phone').innerHTML = '';
                document.getElementById('error_phone').classList.remove('hidden');
                document.getElementById('error_phone').innerHTML = 'Introduce un número de celular válido.';
                document.getElementById('phone_calc').classList.remove('input-focus');
                document.getElementById('phone_calc').classList.add('input-error');                
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'trackerrorformGA4',
                    'error_message': 'Introduce un número de celular válido.',
                    'layer': 'datos personales',
                    'form_action': 'empty',
                    'form_field': 'frm_celular',
                    'form_name': 'Formulario Tradicional',
                    'form_type':'Expuesto',
                    'event_type':'user_error'             
                });
            } else {
                document.getElementById('phone_calc').classList.add('input-focus');
                document.getElementById('phone_calc').classList.remove('input-error');
                document.getElementById('error_phone').classList.add('hidden');
            }
        }
    });
    document.getElementById('phone_calc').addEventListener("keyup", (e) => {
        if (e.target.value.length == 10) {
            document.getElementById('phone_calc').classList.add('input-focus');
            document.getElementById('phone_calc').classList.remove('input-error');
            document.getElementById('error_phone').classList.add('hidden');
        }
    });
}
var micro_data = new FormData();
var micro_data1 = new FormData();

document.getElementById('slc_nivel_de_interes').addEventListener("blur", (e) => {
    /*****Se comenta para ocultar la seleccion de ciclo LRA 22052024*****/
    //document.getElementById('slc_ciclo_hs').classList.remove('input-error');
    //document.getElementById('error_ciclo').classList.add('hidden');
    if (document.getElementById('slc_nivel_de_interes').value != '') {
        document.getElementById('slc_nivel_de_interes').classList.remove('input-error');
        document.getElementById('error_nivel').classList.add('hidden');
    } else {
        document.getElementById('slc_nivel_de_interes').classList.add('input-error');
        document.getElementById('error_nivel').classList.remove('hidden');        
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'trackerrorformGA4',
            'error_message': 'Selecciona una opción.',
            'layer': 'datos academicos',
            'form_action': 'empty',
            'form_field': 'frm_select_nivelInteres',
            'form_name': 'Formulario Tradicional',
            'form_type':'Expuesto',
            'event_type':'user_error'              
        });

    }
});
document.getElementById('slc_campus_interes').addEventListener("blur", (e) => {
    document.getElementById('slc_campus_interes').classList.remove('input-error');
    document.getElementById('error_campus').classList.add('hidden');
    if (document.getElementById('slc_campus_interes').value != '') {
        document.getElementById('slc_campus_interes').classList.remove('input-error');
        document.getElementById('error_campus').classList.add('hidden');       
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'trackerrorformGA4',
            'error_message': 'Selecciona una opción.',
            'layer': 'datos academicos',
            'form_action': 'empty',
            'form_field': 'frm_select_campus',
            'form_name': 'Formulario Tradicional',
            'form_type':'Expuesto',
            'event_type':'user_error'              
        }); 
    } else {
        document.getElementById('slc_campus_interes').classList.add('input-error');
        document.getElementById('error_campus').classList.remove('hidden');
    }
});
document.getElementById('slc_programa').addEventListener("blur", (e) => {
    document.getElementById('slc_programa').classList.remove('input-error');
    document.getElementById('error_programa').classList.add('hidden');
    if (document.getElementById('slc_programa').value != '') {
        document.getElementById('slc_programa').classList.remove('input-error');
        document.getElementById('error_programa').classList.add('hidden');        
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'trackerrorformGA4',
            'error_message': 'Selecciona una opción.',
            'layer': 'datos academicos',
            'form_action': 'empty',
            'form_field': 'frm_select_carrera',
            'form_name': 'Formulario Tradicional',
            'form_type':'Expuesto',
            'event_type':'user_error'           
        });
    } else {
        document.getElementById('slc_programa').classList.add('input-error');
        document.getElementById('error_programa').classList.remove('hidden');

    }
});
/*******Actualiza valor del ciclo seleccionado LRA 240124*******/
var selCiclo = document.getElementById('slc_ciclo_hs');
var cicloElement = document.getElementById('ciclo');
function actualizarCicloSeleccionado() {
    var valorSeleccionado = selCiclo.value;
    if (valorSeleccionado == 2) {
        micro_data.set('ciclo', '26-1');
        cicloElement.textContent = 'Ciclo: Septiembre';
        document.getElementById('error_ciclo').classList.add('hidden');
    } else {
        micro_data.set('ciclo', '25-3');
        cicloElement.textContent = 'Ciclo: Mayo';
        document.getElementById('error_ciclo').classList.add('hidden');
    }
}

function obtieneCookie(name) {
    let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
        return decodeURIComponent(match[2]);
    }
    return null;
}

function aplicarEstilo() {
    if (window.matchMedia("(min-width: 768px)").matches) {
        var formSelect = document.querySelector('.form-select');
        var gpo_campus = document.getElementById('gpo_campus_interes');
        
        formSelect.style.marginLeft = "-398px";
        gpo_campus.style.marginLeft = "0px";
    }
}

function quitarEstilo() {
    document.querySelector('.form-select:first-child').style.display = '';
}


function defineBL() {
    var $select = document.getElementById('slc_nivel_de_interes');
    console.log("VALOR DEL SELECT");
    console.log($select);
    // 4 = Salud, 10 = prepa pre, 8 = Mtria Pre, 9 = Mtria Onl
    var optionToSelect = Array.from($select.options).find(option => option.value === '4' || option.value === '10' || option.value === '8' || option.value === '9' || option.value === '11');
    
    if (optionToSelect && noBl <= 1) {        
        $select.value = optionToSelect.value;
        $select.dispatchEvent(new Event('change'));
        document.getElementById('gpo_nivel_de_interes').classList.add('hidden');
        aplicarEstilo();
    }
}

/*window.addEventListener('load', function() {
    defineBL();
});*/




/*****Se comenta para ocultar la seleccion de ciclo LRA 22052024*****/
//selCiclo.addEventListener('change', actualizarCicloSeleccionado);
if (document.getElementById('paso2')) {
    document.getElementById('paso2').addEventListener("click", (e) => {
        e.preventDefault();        
        var nom = document.getElementById('firstname').value;
        var ap = document.getElementById('lastname').value;
        var am = document.getElementById('lastname_m').value;
        var ma = document.getElementById('email').value;
        var pho = document.getElementById('phone_calc').value;
        var lada = pho.substring(0, 3);
        var nomb = nom.trimStart();
        var app = ap.trimStart();
        var apm = am.trimStart();
        var mai = ma.trimStart();
        var phon = pho.trimStart();
        var nombre = nomb.trimEnd();
        var apps = app.trimEnd();
        var apms = apm.trimEnd();
        var mail = mai.trimEnd();
        var phone = phon.trimEnd();
        var name_envio = false;
        var phone_envio = false;
        var apps_envio = false;
        var mail_envio = false;
        var apms_envio = false;
        window.dataLayer = window.dataLayer || [];
        if (phon.length < 10 || phon.length > 10) {
            document.getElementById('error_phone').innerHTML = '';
            document.getElementById('error_phone').classList.remove('hidden');
            document.getElementById('error_phone').innerHTML = 'Introduce un número a 10 dígitos.';
            document.getElementById('phone_calc').classList.remove('input-focus');
            document.getElementById('phone_calc').classList.add('input-error');            
            window.dataLayer = window.dataLayer || [];
            let action = phon.length < 1 ? 'empty':'invalid';
            window.dataLayer.push({
                'event': 'trackerrorformGA4',
                'error_message': 'Introduce un número a 10 dígitos.',
                'layer': 'datos personales',
                'form_action': action,
                'form_field': 'frm_celular',
                'form_name': 'Formulario Tradicional',
                'form_type':'Expuesto',
                'event_type':'user_error'               
            });            
        } else {
            if (phone == '') {
                document.getElementById('error_phone').innerHTML = '';
                document.getElementById('error_phone').classList.remove('hidden');
                document.getElementById('error_phone').innerHTML = 'Introduce un número a 10 dígitos.';
                document.getElementById('phone_calc').classList.remove('input-focus');
                document.getElementById('phone_calc').classList.add('input-error');                
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'trackerrorformGA4',
                    'error_message': 'Introduce un número a 10 dígitos.',
                    'layer': 'datos personales',
                    'form_action': 'empty',
                    'form_field': 'frm_celular',
                    'form_name': 'Formulario Tradicional',
                    'form_type':'Expuesto',
                    'event_type':'user_error'               
                });                 
            }else if( validphone(phone)==false){
                document.getElementById('error_phone').innerHTML = '';
                document.getElementById('error_phone').classList.remove('hidden');
                document.getElementById('error_phone').innerHTML = 'Introduce un número de celular válido.';
                document.getElementById('phone_calc').classList.remove('input-focus');
                document.getElementById('phone_calc').classList.add('input-error');                
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'trackerrorformGA4',
                    'error_message': 'Introduce un número de celular válido.',
                    'layer': 'datos personales',
                    'form_action': 'empty',
                    'form_field': 'frm_celular',
                    'form_name': 'Formulario Tradicional',
                    'form_type':'Expuesto',
                    'event_type':'user_error'             
                });
            } else {
                phone.replace(/\D/g, '');
                    document.getElementById('phone_calc').classList.add('input-focus');
                    document.getElementById('phone_calc').classList.remove('input-error');
                    micro_data = new FormData();
                    micro_data.set(
                        'celular', phone
                    );
                    micro_data.set('Telef', phone);
                    micro_data1 = new FormData();
                    micro_data1.set(
                        'celular', phone
                    );

                    /*Asignación de estado por Numero Telefónico By SRP 12-07-2023*/
                    var asignaEstado = obtenerEstado(phone);
                    /*End Asignación de estado por Numero Telefónico By SRP 12-07-2023*/
                    appendCookie(nombreCookie, "celular", phone, 1);
                    appendCookie(nombreCookie, "phone", phone, 1);
                    appendCookie(nombreCookie, "estado", asignaEstado, 1);                 
                    micro_data.set('estado', obtenerEstado(lada).toUpperCase());
                    phone_envio = true;
            }
        }
        if (nombre == '' || blackList(nombre)) {
            document.getElementById('error_nombre').innerHTML = '';
            document.getElementById('error_nombre').classList.remove('hidden');
            document.getElementById('error_nombre').innerHTML = 'El nombre no es válido.';
            document.getElementById('firstname').classList.remove('input-focus');
            document.getElementById('firstname').classList.add('input-error');            
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'trackerrorformGA4',
                'error_message': 'El nombre no es válido.',
				'layer': 'datos personales',
				'form_action': 'empty',
				'form_field': 'frm_nombre',
				'form_name': 'Formulario Tradicional',
                'form_type':'Expuesto',
				'event_type':'user_error'               
            });            
            micro_data = new FormData();
            micro_data1 = new FormData();
        } else {
            if (nombre.length <= 2 || nombre.length > 50) {
                document.getElementById('error_nombre').innerHTML = '';
                document.getElementById('error_nombre').classList.remove('hidden');
                document.getElementById('error_nombre').innerHTML = 'El nombre no es válido.';
                document.getElementById('firstname').classList.remove('input-focus');
                document.getElementById('firstname').classList.add('input-error');                
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'trackerrorformGA4',
                    'error_message': 'El nombre no es válido.',
                    'layer': 'datos personales',
                    'form_action': 'invalid',
                    'form_field': 'frm_nombre',
                    'form_name': 'Formulario Tradicional',
                    'form_type':'Expuesto',
                    'event_type':'user_error'                
                });
                micro_data = new FormData();
                micro_data1 = new FormData();                
                
            } else {
                document.getElementById('firstname').classList.add('input-focus');
                document.getElementById('firstname').classList.remove('input-error');
                micro_data.set(
                    'nombre', nombre
                );
                micro_data1.set(
                    'nombre', nombre
                );
                appendCookie(nombreCookie, "nombre", nombre, 1);
                name_envio = true;
            }
        }
        if (apps == '' || apps.length <= 2 || apps.length > 50 || blackList(apps)) {
            document.getElementById('error_lastname').innerHTML = '';
            document.getElementById('error_lastname').classList.remove('hidden');
            document.getElementById('error_lastname').innerHTML = 'El apellido no es válido.';
            document.getElementById('lastname').classList.remove('input-focus');
            document.getElementById('lastname').classList.add('input-error');
            let action = apps.length < 1 ? 'empty':'invalid';
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'trackerrorformGA4',
                'error_message': 'El apellido no es válido.',
				'layer': 'datos personales',
				'form_action': action,
				'form_field': 'frm_apaterno',
				'form_name': 'Formulario Tradicional',
                'form_type':'Expuesto',
				'event_type':'user_error'                
            });            
            micro_data = new FormData();
            micro_data1 = new FormData();
        } else {
            document.getElementById('lastname').classList.add('input-focus');
            document.getElementById('lastname').classList.remove('input-error');
            micro_data.set(
                'apaterno', apps
            );
            micro_data1.set(
                'apaterno', apps
            );
            micro_data.set(
                'Ap_Pat', apps
            );
            appendCookie(nombreCookie, "apaterno", apps, 1);
            apps_envio = true;
        }
        if (apms == '' || apms.length <= 2 || apms.length > 50 || blackList(apms)) {
            document.getElementById('error_lastname_m').innerHTML = '';
            document.getElementById('error_lastname_m').classList.remove('hidden');
            document.getElementById('error_lastname_m').innerHTML = 'El apellido no es válido.';
            document.getElementById('lastname_m').classList.remove('input-focus');
            document.getElementById('lastname_m').classList.add('input-error');
            let action = apms.length < 1 ? 'empty':'invalid';  
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'trackerrorformGA4',
                'error_message': 'El apellido no es válido.',
				'layer': 'datos personales',
				'form_action': action,
				'form_field': 'frm_amaterno',
				'form_name': 'Formulario Tradicional',
                'form_type':'Expuesto',
				'event_type':'user_error'                
            });
            
            micro_data = new FormData();
            micro_data1 = new FormData();
        } else {
            document.getElementById('lastname_m').classList.add('input-focus');
            document.getElementById('lastname_m').classList.remove('input-error');
            micro_data.set(
                'amaterno', apms
            );
            micro_data1.set(
                'amaterno', apms
            );
            micro_data.set(
                'Ap_Mat', apms
            );
            appendCookie(nombreCookie, "amaterno", apms, 1);
            apms_envio = true;
        }
        valEmail = document.getElementById('email').value.split("@");
        sizeEmail = valEmail[0];
        if (mail == '') {
            document.getElementById('error_email').innerHTML = '';
            document.getElementById('error_email').classList.remove('hidden');
            document.getElementById('error_email').innerHTML = 'Proporciona un correo válido.';
            document.getElementById('email').classList.remove('input-focus');
            document.getElementById('email').classList.add('input-error');
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'trackerrorformGA4',
                'error_message': 'Proporciona un correo válido.',
				'layer': 'datos personales',
				'form_action': 'empty',
				'form_field': 'frm_mail',
				'form_name': 'Formulario Tradicional',
                'form_type':'Expuesto',
				'event_type':'user_error'                
            });
            micro_data = new FormData();
            micro_data1 = new FormData();           

        } else if (sizeEmail.length < 3) {
            document.getElementById('error_email').innerHTML = '';
            document.getElementById('error_email').classList.remove('hidden');
            document.getElementById('error_email').style.display = 'block';
            document.getElementById('error_email').innerHTML = 'Longitud de correo invalida.';
            document.getElementById('email').classList.remove('input-focus');
            document.getElementById('email').classList.add('input-error');
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'trackerrorformGA4',
                'error_message': 'Longitud de correo invalida.',
				'layer': 'datos personales',
				'form_action': 'invalid',
				'form_field': 'frm_mail',
				'form_name': 'Formulario Tradicional',
                'form_type':'Expuesto',
				'event_type':'user_error'              
            });            
            micro_data = new FormData();
            micro_data1 = new FormData();
        } else if (!/^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+$/.test(mail)) {
            document.getElementById('error_email').innerHTML = '';
            document.getElementById('error_email').classList.remove('hidden');
            document.getElementById('error_email').style.display = 'block';
            document.getElementById('error_email').innerHTML = 'Caracter invalido en el correo.';
            document.getElementById('email').classList.remove('input-focus');
            document.getElementById('email').classList.add('input-error');
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'trackerrorformGA4',
                'error_message': 'Caracter invalido en el correo.',
				'layer': 'datos personales',
				'form_action': 'invalid',
				'form_field': 'frm_mail',
				'form_name': 'Formulario Tradicional',
                'form_type':'Expuesto',
				'event_type':'user_error'                
            });             
            micro_data = new FormData();
            micro_data1 = new FormData();
        }
        else {
            if (!isEmail(mail)) {
                document.getElementById('error_email').innerHTML = '';
                document.getElementById('error_email').classList.remove('hidden');
                document.getElementById('error_email').innerHTML = 'Proporciona un correo válido.';
                document.getElementById('email').classList.remove('input-focus');
                document.getElementById('email').classList.add('input-error');
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'trackerrorformGA4',
                    'error_message': 'Proporciona un correo válido.',
                    'layer': 'datos personales',
                    'form_action': 'invalid',
                    'form_field': 'frm_mail',
                    'form_name': 'Formulario Tradicional',
                    'form_type':'Expuesto',
                    'event_type':'user_error'              
                });                 
                micro_data = new FormData();
                micro_data1 = new FormData();
            } else {
                document.getElementById('email').classList.add('input-focus');
                document.getElementById('email').classList.remove('input-error');
                micro_data.set(
                    'email', mail
                )
                micro_data1.set(
                    'email', mail
                )
                //console.warn("CORREO");
                /*console.warn(micro_data1.set(
                    'email', mail
                ));*/
                appendCookie(nombreCookie, "email", mail, 1);
                appendCookie(nombreCookie, "urlreferrer", window.location.href, 1);
                mail_envio = true;
            }
        }

        window.dataLayer = window.dataLayer || [];
    if (document.getElementById('slc_nivel_de_interes').value == '') {
        if (!document.getElementById('gpo_nivel_de_interes').classList.contains('hidden')) {
            document.getElementById('slc_nivel_de_interes').classList.add('input-error');
            document.getElementById('error_nivel').classList.remove('hidden');
            if (document.getElementById('slc_nivel_de_interes').options.length <= 1) {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'trackerrorFormGA4',
                    'event_type': 'user_error',
                    'error_message': 'Select sin datos',
                    'form_name': 'Formulario Tradicional',
                    'form_type':'Expuesto',
                    'form_field': 'frm_select_nivelInteres'
                });
            } else {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'trackerrorformGA4',
                    'error_message': 'Selecciona una opción.',
                    'layer': 'datos academicos',
                    'form_action': 'empty',
                    'form_field': 'frm_select_nivelInteres',
                    'form_name': 'Formulario Tradicional',
                    'form_type':'Expuesto',
                    'event_type':'user_error'                
                }); 
            } 
        }
    } else {
        if (document.getElementById('slc_nivel_de_interes').value == 9) {
            if (document.getElementById('slc_diploma_hs_').value == '') {
                diploma = false;
                if (!document.getElementById('gpo_diploma_hs').classList.contains('hidden')) {
                    document.getElementById('slc_diploma_hs_').classList.add('input-error');
                    document.getElementById('error_Diploma').classList.remove('hidden');
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        'event': 'trackerrorformGA4',
                        'error_message': 'Selecciona una opción.',
                        'layer': 'datos academicos',
                        'form_action': 'empty',
                        'form_field': 'frm_select_diploma',
                        'form_name': 'Formulario Tradicional',
                        'form_type':'Expuesto',
                        'event_type':'user_error'               
                    });                     
                }
            } else {
                diploma = true;      
            }
        }
        interes = true;   
    }
    if (document.getElementById('slc_campus_interes').value == '') {
        if (!document.getElementById('gpo_campus_interes').classList.contains('hidden')) {
            document.getElementById('slc_campus_interes').classList.add('input-error');
            document.getElementById('error_campus').classList.remove('hidden');
            if (document.getElementById('slc_campus_interes').options.length <= 1) {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'trackerrorformGA4',
                    'error_message': 'Select sin datos',
                    'layer': 'datos academicos',
                    'form_action': 'empty',
                    'form_field': 'frm_select_campus',
                    'form_name': 'Formulario Tradicional',
                    'form_type':'Expuesto',
                    'event_type':'form_error'                
                }); 
            } else {
               window.dataLayer = window.dataLayer || [];
               window.dataLayer.push({
                    'event': 'trackerrorformGA4',
                    'error_message': 'Selecciona una opción.',
                    'layer': 'datos academicos',
                    'form_action': 'empty',
                    'form_field': 'frm_select_campus',
                    'form_name': 'Formulario Tradicional',
                    'form_type':'Expuesto',
                    'event_type':'user_error'               
                });
            }  
        }
    }else {
        campus = true;
    }
    if (document.getElementById('slc_programa').value == '') {
        if (!document.getElementById('gpo_programa_hs').classList.contains('hidden')) {
            document.getElementById('slc_programa').classList.add('input-error');
            document.getElementById('error_programa').classList.remove('hidden');
            if (document.getElementById('slc_programa').options.length <= 1) {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'trackerrorformGA4',
                    'error_message': 'Select sin datos',
                    'layer': 'datos academicos',
                    'form_action': 'empty',
                    'form_field': 'frm_select_carrera',
                    'form_name': 'Formulario Tradicional',
                    'form_type':'Expuesto',
                    'event_type':'form_error'                
                }); 
            } else {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'trackerrorformGA4',
                    'error_message': 'Selecciona una opción.',
                    'layer': 'datos academicos',
                    'form_action': 'empty',
                    'form_field': 'frm_select_carrera',
                    'form_name': 'Formulario Tradicional',
                    'form_type':'Expuesto',
                    'event_type':'user_error'                
                });
            }   
        }
    } else {
        programa = true;
    }

    //Se comenta para ocultar seleccion de ciclo
    /*if (document.getElementById('slc_ciclo_hs').value == '') {
        if (!document.getElementById('gpo_ciclo').classList.contains('hidden')) {
            document.getElementById('slc_ciclo_hs').classList.add('input-error');
            document.getElementById('error_ciclo').classList.remove('hidden');
                window.dataLayer.push({
                    'event': 'trackerrorformGA4',
                    'error_message': 'Selecciona una opción.',
                    'layer': 'datos academicos',
                    'form_action': 'empty',
                    'form_field': 'ciclo_interes',
                    'form_name': 'Formulario Tradicional',
                    'form_type':'Expuesto',
                    'event_type':'user_error'               
                });
            }
    }else {
        var selCiclo = document.getElementById('slc_ciclo_hs');
        var valorSeleccionado = selCiclo.value;
        cicloSeleccionado = true;
    }*/
        var gclid = getCookie("c_gclid");
        if (gclid != '') {
            micro_data.set('gclid', gclid);
            micro_data1.set('gclid', gclid);
        } else {
            var url = new URL(window.location.href);
            var search = url.search;
            search = search.replace('?', '');
            var par_name = search.split('&');
            for (i = 0; i < par_name.length; i++) {
                var n = par_name[i].split('=');
                var field = n[0];
                var value = n[1];
                if (field == 'gclid') {
                    micro_data.set('gclid', value);
                    micro_data1.set('gclid', value);
                }
            }
        }
        if (name_envio && mail_envio && apps_envio && phone_envio && apms_envio && programa && campus) {
            //autoselectBL
            //BLautoselect();
            /*document.getElementById('ModalCalculadoraVue').classList.remove('step1');            
            document.getElementById('paso1_form').classList.add('none');
            document.getElementById('paso2_form').classList.add('none');
            document.getElementById('form_calculadora').classList.add('none');
            document.getElementById('info-res').classList.remove('hidden');*/
            
            if (document.getElementById('slc_nivel_de_interes')) {
                if (document.getElementById('slc_nivel_de_interes').options.length < 1) {
                    llenarNivelInteres(vSlug, defineBL);
                    console.error("slc_nivel_de_interes vacío al pasar a step2");
                }                
            } else {
                console.error("slc_nivel_de_interes no existe en el DOM");
            }
            //window.scrollTo(0, 0);
            var userid = sha256(mail);
            micro_data.set('CID', cidga4);
            micro_data1.set('CID', cidga4);
            var url_string = window.location.href
            var url = new URL(url_string);
            var trackid = getCookie("banner_activo");
            if (trackid != '') {
                micro_data.set('banner', trackid);
                micro_data1.set('banner', trackid);
            } else {
                micro_data.set('banner', 'ASPIRANTES LIC');
                micro_data1.set('banner', 'ASPIRANTES LIC');
            }
            if (document.getElementById('revalidaci_n_equivalencias_').checked) {
                micro_data.set('CP', 10183);
                micro_data1.set('CP', 10183);
            } else {
                micro_data.set('CP', 10040);
                micro_data1.set('CP', 10040);
            }
            micro_data.set('tipoRegistro', 10040);
            micro_data1.set('tipoRegistro', 10040);

            var page_uri = window.location.href;            

            micro_data.set('urlreferrer', urlInicialCookie);
            micro_data1.set('urlreferrer', urlInicialCookie);
            micro_data.set('URLreferer', page_uri);

            /*Implementación track hubspot 07-11-2023*/
            var hutk = getCookie("hubspotutk");
            micro_data.set('hutk',hutk);
            micro_data1.set('hutk', hutk); 
            /*End Implementación track hubspot 07-11-2023*/
                
            var tmp_data = {};
            micro_data.forEach((value, key) => guardaUsuarioData(key, value));
            //micro_data.forEach((value, key) => tmp_data[key] = value);
            const now = new Date();
            tmp_data['dateexp'] = now.getTime() + 5000
            /*try {
                console.log("TMP_DATA");
                console.log(JSON.stringify(tmp_data));
                localStorage.setItem('datos_cal', JSON.stringify(tmp_data));
                localStorage.setItem('envio', 1);
            } catch (e) {
                console.error(e);
            }*/
            micro_data.set('regcompleto', 0);
            var url_hooks = 'https://pwl.unitec.mx/desk/procWeb/microRegistroScribe.php';
            var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile === false) {
                var formDevice = 'Desktop';
            } else {
                var formDevice = 'Mobile';
            }            
            fetch(url_hooks, {
                mode: 'cors',
                method: 'POST',
                contentType: "application/json",
                body: micro_data
            })
                .then(function (response) {
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        'event': 'trackGA4',
                        'event_type': 'generate_microLead',
                        'form_name': 'Formulario Tradicional',
                        'form_step': 'step_1',
                        'campus': '',
                        'carrera': '',
                        'modalidad': '',
                        'form_type':'Expuesto',
                        'page_location':urlInicialCookie,
                        'clientId': cidga4,
                        'userID': sha256(mail)
                    });
                    if (response.ok) {

                    } else {
                        throw "Error en la llamada Ajax";
                    }

                }).then(function (texto) {
                    //console.log(texto);
                }).catch(function (err) {
                    //console.log(err);
                });

                //Inicia Paso2
    var interes = false;
    var campus = false;
    var cicloSeleccionado = false;
    var programa = false;
    var diploma = true;    
    
    //if (interes && campus && programa && diploma && cicloSeleccionado) {
    //if (interes && campus && programa && diploma) {
        guardaUsuarioData('datosFull', true);
        document.getElementById('ModalCalculadoraVue').classList.remove('step1');            
        document.getElementById('paso1_form').classList.add('none');
        document.getElementById('paso2_form').classList.add('none');
        document.getElementById('form_calculadora').classList.add('none');
        document.getElementById('info-res').classList.remove('hidden');
        document.getElementById('paso').classList.add('hidden');
        document.getElementById('ModalCalculadoraVue').classList.remove('step2');
        document.getElementById('info_clc').classList.add('hidden');
        document.getElementById('ModalCalculadoraVue').classList.add('step3');
        document.getElementById('l-solicitar').classList.remove('hidden');       
        micro_data.set('CID', cidga4);
        var trackid = getCookie("banner_activo");
        if (trackid != '') {
            micro_data.set('banner', trackid);
        } else {
            micro_data.set('banner', 'ASPIRANTES_LIC');
        }
        if (document.getElementById('revalidaci_n_equivalencias_').checked) {
            micro_data.set('tipoRegistro', 10183);
            micro_data.set('CP', 10183);
            micro_data.set('revalida', 1);
        } else {
            micro_data.set('tipoRegistro', 10040);
            micro_data.set('CP', 10040);
            micro_data.set('revalida', 0);
        }

        micro_data.set('urlreferrer', urlInicialCookie);
        var guid = createUUID();
        micro_data.set('GUIDLpTransaccion', guid);
        micro_data.set('departamento', '');
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile === false) {
            var formDevice = 'Desktop';
        } else {
            var formDevice = 'Mobile';
        }
        micro_data.set('formDev', formDevice);
        var t = document.getElementById('slc_nivel_de_interes');
        var ns = t.options[t.selectedIndex].getAttribute('nivel');
        var gclid = getCookie("c_gclid");
        if (gclid != '') {
            micro_data.set('gclid', gclid);
        } else {
            var url = new URL(window.location.href);
            var search = url.search;
            search = search.replace('?', '');
            var par_name = search.split('&');
            for (i = 0; i < par_name.length; i++) {
                var n = par_name[i].split('=');
                var field = n[0];
                var value = n[1];
                if (field == 'gclid') {
                    micro_data.set('gclid', value);
                }
            }
        }
        /*Fix Issue Recuperar Microregistro By SRP 03-07-2023*/
        var cookieForm = decodeURIComponent(getCookie(nombreCookie));
        var cookieRecovery = JSON.parse(cookieForm);
        var bannerRecovery = getCookie("banner_activo");
        var page_uri = window.location.href;
        let datosLocal = JSON.parse(localStorage.getItem('datos_cal'));

        if (bannerRecovery !== "") {
            micro_data.set(
                'banner', getCookie("banner_activo")
            );
        } else {
            micro_data.set(
                'banner', 'ASPIRANTES LIC'
            );
        }

        micro_data.set(
            'nombre', datosLocal['nombre'] 
        );
        
        micro_data.set(
            'apaterno', datosLocal['apaterno']
        );

        micro_data.set(
            'amaterno', datosLocal['amaterno']
        );

        micro_data.set(
            'email', datosLocal['email']
        );
        
        micro_data.set(
            'celular', datosLocal['celular']
        );

        micro_data.set(
            'estado', datosLocal['estado']
        );

        micro_data.set(
            'subNivelInteres', datosLocal['linea']['subNivel']
        );

        micro_data.set('URLreferer', page_uri);
        /*Fix Issue Recuperar Microregistro By SRP 03-07-2023*/
        nint = parseInt(ns);
        var camp_res = "campus";
        micro_data.set('Calidad', 3);
        micro_data.set('C_Carrera', pares[0]);
        micro_data.set('Origen', 'ASPIRANTES LIC');
        micro_data.set('Calidad', 3);
        micro_data.set('Ciclo', "23-2");
        micro_data.set('Alumno', 0);
        micro_data.set('TipoTel', 'CEL_CALC');        
        
        let txtCampus = datosLocal['campus']['text_campus'];
        var carreraName = datosLocal['carrera']['nombreCRM'];
        //Seteo valores de programas
        micro_data.set('carrera', carreraName);
        /*micro_data.set('campus', txtCampus);*/

        var campusOb = {};
        var f = document.getElementById('slc_campus_interes');
        var text_campus = f.options[f.selectedIndex].text;
        var pnum = f.options[f.selectedIndex].getAttribute('prodnum');
        var cate = f.options[f.selectedIndex].getAttribute('cat');
        var imgCamp = f.options[f.selectedIndex].getAttribute('img');
        var linkCamp = f.options[f.selectedIndex].getAttribute('link');
        guardaUsuarioData('imgCamp', imgCamp);
        guardaUsuarioData('linkCamp', linkCamp);
        guardaUsuarioData('campus', campusOb);
        guardaUsuarioData('idDinamycs', pnum);
        micro_data.set('campus', f.options[f.selectedIndex].getAttribute('abreviacion'));
        micro_data.set('campusLargo', text_campus);
        micro_data.set('carreraInteres', pnum);
        micro_data.set('C_Carrera', pnum);        
        
        var text_campus = f.options[f.selectedIndex].text;
        campusOb["idCampus"] = f.options[f.selectedIndex].value;
        campusOb["abr_campus"] = f.options[f.selectedIndex].getAttribute('abreviacion');
        campusOb["text_campus"] = text_campus;
        campusOb["modalidad"] = cate;
        guardaUsuarioData('campus', campusOb);
        guardaUsuarioData('idDinamycs', pnum);
        micro_data.set('campus', f.options[f.selectedIndex].getAttribute('abreviacion'));
        micro_data.set('campusLargo', text_campus);
        micro_data.set('carreraInteres', pnum);
        micro_data.set('C_Carrera', pnum);      
        

        document.getElementById("nombreCampus").innerHTML = "Campus " + txtCampus;
        document.getElementById("bl").innerHTML = datosLocal['carrera']['nombreCliente'];
        document.getElementById("alumno").innerHTML = datosLocal['nombre'];
        document.getElementById("modalidad").innerHTML = datosLocal['modalidadName'];
        document.getElementById('info_clc').classList.add('hidden');
        document.getElementById('paso2_form').classList.add('hidden');        
        document.getElementById('res-card').classList.remove('hidden');
        document.getElementById('info-res').classList.remove('hidden');
        
        var e = document.getElementById('slc_nivel_de_interes');
        //var nameLvl = e.options[e.selectedIndex].text;
        var nameLvl = e.options[e.selectedIndex].getAttribute('mktname');    
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'event': 'trackGA4',
            'event_type': 'form_interaction',
            'form_name': 'Formulario Tradicional',
            'form_step': 'step_2',
            'area_interes': nameLvl,
            'campus': txtCampus,
            'carrera': carreraName,
            'modalidad': modTxt,
            'form_type':'Expuesto',
            'page_location':urlInicialCookie,
            'clientId': cidga4,
            'userID': sha256(mail)
        });
        var url_back = 'https://pwl.unitec.mx/wp-content/phpServeApp/backend1.php';
        fetch(url_back, {
            mode: 'cors',
            method: 'POST',
            contentType: "application/json",
            body: micro_data
        }).then(response => response.json()).then(dat => {
            let numReg = '1';
            let eventType = 'generate_lead';            
            if (dat.tipo == "dupli") {
                numReg = '2';
                eventType = 'generate_lead_duplicado';                
            }
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'trackGA4',
                'event_type': eventType,
                'form_name': 'Formulario Tradicional',
                'form_step': 'step_3',
                'area_interes': nameLvl,
                'campus': txtCampus,
                'carrera': carreraName,
                'modalidad': modTxt,
                'form_type':'Expuesto',
                'page_location':urlInicialCookie,
                'clientId': cidga4,
                'userID': sha256(mail)
            });
        }).catch(function (err) {
            logPeticiones(url_back, 'Error catch', err, "-");
        });
        /*micro_data1.set('regcompleto', 1);
        var url_hooks = 'https://pwl.unitec.mx/desk/procWeb/microRegistroScribe.php';
        fetch(url_hooks, {
            mode: 'cors',
            method: 'POST',
            contentType: "application/json",
            body: micro_data1
        })
            .then(function (response) {
                if (response.ok) {

                } else {
                    throw "Error en la llamada Ajax";
                }

            }).then(function (texto) {
                //console.log(texto);
            }).catch(function (err) {
                logPeticiones(url_hooks, 'Error catch', err, "-");
            });*/
        localStorage.setItem('envio', 2);
        //}

        //}
       console.log("SALIO");         
    }
        
    });
}
function validphone(phone){
    var jsonphoneBasura= ["1010101001","1010101010","0000000000","1111111111","2222222222","3333333333","4444444444","5555555555","6666666666","7777777777","8888888888","9999999999","1234567891","5512345678","1234567890","5556543727","5556581111","5552074077","5552074083","5556842142","5556849112","5557683700","5556258646","5553951111","5555575759","5552009000","5551308000","5551308646","5555540612","5556543210","5553532763","5553532823","5556832222","5552295600","5556842124","5552410245","5552305100","5557703548","5557871540","5555606988","5555650521","5555651039","5553731122","5555653638","5572721116","3511356277","4681151464","5589632147","5545454545","5500110011","5500550055","4423370137","7221551144","4431195588","7223669265","7775851164","4751080804","9221660060","5561383509","5576383026","5575173931","5586156524","5558434042","2224567030","5567890432","5571767934","5573397683","5552000011","5544727555","5540968677","5555820992","5544223366","5556575859","5518044738","5527631081","5523659874","5523698745","5512929335","5530795290","5517451777","5522334455","3316953310","7225879387","7222887138","3317692734","7445024588","3317977473","7221128329","3318704795","7224662528","3318888264","7227796900","3319410199","8333880676","3319416756","7131167206","3319445253","7221553723","3319919103","7223123644","3319936892","7225128399","3321375564","7226398801","3321722220","7228781736","3322510178","7821168062","3322555358","9211121903","3322558223","7122086589","3323423760","7151063039","3331001562","7221388470","3331285599","7222033603","3331755246","7223009634","3334038513","7224036404","3336906065","7224911279","3338746267","7225509316","3339019669","7226064592","3339451206","7227436997","3339465603","7228226758","3344556677","7229101999","3411193412","7711138531","3481002011","7971178243","3511352677","8713563765","3314808092","3841004713","7121821008","3841083657","7131126981","4121232070","7131199728","4131097779","7221016950","4131161843","7221255595","4181122974","7221511935","4191123476","7221926589","4191161717","7222454618","4191228224","7222921893","4202243900","7223038347","4321084332","7223627794","4421376677","7224373058","4421437528","7224681485","4422268026","7225069217","4422473971","7225194668","4423367359","7225611432","3315647288","7225946401","4423386926","7226166696","4423439900","7226771052","4423697602","7227536646","4423943435","7227816870","4424213234","7228577059","4424567890","7229062113","4424654860","7442089665","4424663870","7571197932","4425323150","3317423102","4425757788","7841080689","4425762630","8182551864","4425923251","8444594509","4426019411","8992830406","4426170959","3317519731","4426483143","4427044396","3316013072","7121924541","4432399571","7122271482","4441221747","7131162458","4441738132","7131182096","4445660686","7141002580","4471115423","7151506551","4471156619","7221083636","4521308067","7221189968","4561037075","7221266510","4611229921","7221442344","4616198825","3317105168","3316019254","7221920192","4691212364","7222027956","4741095104","7222158398","4741343040","7222472727","4747389693","7222903580","3316086485","7222951937","4751087991","7223020294","4765712261","7223092446","4771212261","7223345447","4771259879","3317225204","4771364742","7224070166","4771967198","7224444861","4772327859","7224667749","4772623719","7224738180","4772804106","7225037391","4772804999","7225125226","4773459488","7225131103","4773661299","7225405937","4773678671","7225570389","4773920944","7225859455","4774459907","7225889239","4774659472","7226016839","4775269849","7226133652","4775698036","7226348742","4777547910","7226732788","4881097156","7227009208","4881097647","7227445543","4931296446","7227641625","5037621166","7227805827","5129051837","7228050575","5272882728","7228549869","5353616641","7228695350","5951040550","7228944641","5951122253","7229088871","5951128462","7441482586","5951129863","7444393541","5951203027","7471365564","6121208294","7581041377","6143179493","7716993649","6143609844","7777878239","6221232134","7821661390","6241419071","7911057245","6341128668","8181818181","6462108713","8331436169","6577675786","8341750483","9221041583","8681027149","9242415238","8717912736","9511792757","9191624241","9613566516","9221000866","9711756167","9993436594","6692320091","9341040028","7121089886","9514246972","7121373588","9711271991","7121491705","9932061057","7121527141","7121546049","7121580707","7121589644","7121594952","3314740591","7121746429","3311575362","5583391672","5576871251","5559438559","5590908421","5559595950","5574847739","5559636867","5578963214","5559697693","5585726390","5560272527","2381212134","5560439559","5574330628","5560627712","5576199631","5560700997","5578134272","5560785645","5581545881","5560844532","5585478936","5560865972","5558534120","5560903481","5591987895","5560907260","2841091008","5561105539","3312686852","5561131308","5574688635","5561163137","5575425287","5561182479","5576436164","5561214405","5577687696","5561293500","5578394812","5557747474","5581030578","5561431300","5582314332","5561432685","5584564397","5561440434","5585702981","5561508794","5585789547","5561649297","5589741236","5561662337","5591862674","5561799293","2281942513","5562026615","2711284985","5562152554","3310482644","5562261775","3312221913","5562291419","5574259738","5557787759","5574501887","5562986670","5574795335","5563025109","5575122833","5563025877","5576037443","5563214563","5557095753","5563377457","5576808330","5563757442","5577325884","5563912218","5577851771","5563982235","5578347267","5564151441","5578868056","5564153581","5580984145","5564179263","5581372034","5564217010","5581817981","5564289121","5582740870","5564301112","5583955818","5564301466","5584983557","5564414556","5585603297","5564559865","5585709820","5564817253","5585742310","5564824695","5585968596","5564928105","5588996633","5564984961","5589748596","5565065661","5591066390","5565173290","5591938498","5565203612","2222222222","5565235481","2283208039","5565395647","2382079354","5565419797","2722356274","5565621053","3111410460","5565656565","3311223344","5565827767","3312156766","5566070067","3312477468","5566094000","5574221947","5566100752","5574307026","5566159533","5574353091","5566247490","5574504135","5566281737","5574741292","5566332266","5574801401","5566335647","5574859612","5566443322","5558343887","5566652843","5575473210","5566795429","5576160020","5566869859","5576340249","5566968832","5576422909","5566984818","5576739999","5567044803","5576859860","5567337724","5576879924","5567351703","5577505870","5567530385","5577834141","5567564534","5577917587","5567573550","5578202430","5567890098","5578394308","5557890987","5578674380","5567894321","5578898110","5567997855","5580702307","5568041399","5581004813","5568063198","5581247610","5568184843","5581513059","5568620844","5581572972","5568694323","5581869229","5568912706","5582328626","5568993022","5583305370","5569029183","5583681664","5569167449","5584116558","5569834895","5584845952","5569874512","5585373657","5570399167","5585570357","5570490202","5585660582","5570511835","5585707474","5570627665","5585713685","5570643171","5585727727","5570710030","5585789381","5570784624","5585793259","5570849033","5586089630","5571130029","5586728222","5571214378","5558791393","5571318868","5589745263","5571351302","5589768950","5571452252","5591033428","5571694704","5591398140","5571741351","5591925163","5558268578","5591975960","5571887895","2034148692","5572030951","5558974401","5572048530","2282434611","5572096962","2343243243","5572185852","2381364347","5572214218","2491123190","5558290810","2722043324","5572721119","2831123979","5572847854","2871456352","5572924440","3310051472","5573342309","3310914754","3313955715","3311490762","3314175985","3311697543","5556881111","3312207389","5573846958","3312312312","5574008765","3312542490","5574074403","5559045862","5574170363","3314666018","5573557179","5573570264","5555007070","5548326480","5545518161","5534071924","5551262150","5534142396","5533757639","5534144331","5547206551","5534252894","5549748806","5534290589","5553446539","5534342599","5544211212","5534349676","5545065033","5534379228","5546504215","5534438412","5547850291","5534493661","5548795623","5534500307","5550513375","5534500640","5551841880","5534529778","5554093676","5534669217","5533940559","5534757129","5544538050","5534771370","5544789798","5534928288","5545311850","5534930788","5545913276","5534964233","5546904378","5535034492","5547691381","5535055254","5547963382","5535180604","5548544345","5535188577","5549024543","5535198173","5550066411","5535317656","5551035895","5535330804","5551633659","5535351264","5533928200","5535382868","5553836036","5535511827","5554545454","5535545688","5555602525","5535553555","5556354171","5535572709","5533669868","5535621113","5544653401","5535737035","5544741454","5535870545","5544927898","5536310415","5545207066","5536477141","5533773923","5536498094","5545541993","5536532248","5546209080","5536662268","5546789045","5536677194","5547132393","5536789045","5547248000","5536799043","5547812702","5536963696","5547896605","5536985247","5548262112","5537009713","5548456387","5537018675","5548733483","5537042051","5548956110","5537105763","5549425248","5537253157","5549817643","5537347659","5550121955","5537351169","5550608507","5537364207","5551075196","5537479307","5551515151","5538229842","5551725477","5538769905","5551952763","5538809549","5552963334","5538984147","5553549915","5539023909","5554031737","5539058997","5554386115","5539150389","5554795135","5539183461","5555444466","5539204944","5555631875","5539282251","5556090218","5539404416","5544167983","5539494300","5544223365","5539495351","5544419719","5539551282","5544554455","5539555543","5544714707","5539568215","5544736993","5539601751","5544778978","5539655661","5544839754","5539686486","5545036614","5539765120","5545162143","5539795437","5545226633","5540061019","5545352488","5540080222","5545457161","5540255647","5545531562","5540273818","5545628080","5540306120","5545914859","5540326191","5546399811","5540363277","5546788990","5540530369","5546789809","5540543053","5546942510","5540558526","5547155270","5540564190","5547217068","5540673019","5547402577","5540678825","5547784654","5540702054","5547834258","5540813511","5547875221","5540813628","5547901426","5540818292","5548101916","5540868997","5548289702","5540871857","5548362598","5540884234","5548497941","5533597421","5548685072","5540978755","5548794100","5541015097","5548924928","5541119111","5548959099","5541123074","5549391033","5541357425","5549436902","5541458731","5549816247","5541758568","5550001050","5541763377","5550096118","5541808922","5550168062","5541814962","5550553320","5541879014","5550934800","5542102084","5551041884","5542272324","5551129134","5542274379","5551270549","5542301664","5551586718","5542383945","5551648800","5542691291","5551731175","5542702079","5551892357","5542825523","5551988052","5542870311","5552749177","5543026330","5552995443","5543176545","5553476467","5543187325","5553643644","5543235869","5553980634","5543249080","5554081969","5543404111","5554321090","5543407424","5554534793","5543425059","5554702072","5543437745","5555005500","5543555972","5555059079","5543567896","5555471275","5543785890","5555616661","5543890497","5555688722","5556431468","5555920724","5556581112","5556298866","5533535194","5534042549","5544162656","5543930136","5556581114","5543965833","5544112233","5532105929","5527487299","5523988444","5510219060","5529903448","5510490880","5523098728","5510635203","5525635669","5510715913","5528809546","5510726496","5531041790","5510797494","5522552255","5510931347","5523568974","5510969190","5525101016","5511112222","5527143604","5511168757","5527899438","5511216545","5529409942","5511519113","5530568284","5511521882","5531408525","5511712302","5532859958","5512120301","5522995559","5512131415","5523232323","5512220000","5523698547","5512241805","5524908294","5512300918","5525242021","5512324567","5526721173","5512348765","5527420837","5512369874","5527612500","5512415637","5528563345","5512421586","5529206440","5512450890","5529695245","5512457896","5530290283","5512459423","5530799779","5512496733","5531319944","5512586421","5531537177","5512648896","5532639089","5500112233","5533509934","5512995023","5522686801","5513131676","5523030230","5513224451","5523145282","5513326928","5523379038","5513353000","5510072587","5513600998","5510089300","5513636522","5524164674","5513921414","5525010968","5513923546","5525168481","5513947129","5525266796","5513975612","5526213333","5514122419","5526910363","5514168749","5527223391","5514300412","5527449473","5514355932","5527583804","5514513187","5527736236","5514776174","5528297717","5514966367","5528616155","5515108933","5528922079","5515303239","5529287578","5515304560","5529612388","5515357971","5529820368","5515641626","5530058151","5515771052","5530337029","5515833549","5530762615","5515849485","5531019768","5515913086","5531203273","5515968190","5531383305","5516021735","5531454018","5516241880","5531960642","5516423238","5532274584","5516826366","5532709739","5516855713","5533148517","5516952447","5522540300","5516984654","5522654248","5517060740","5522840350","5517177923","5523000283","5517286853","5523070187","5523142517","5517657599","5523182302","5517758707","5523285231","5517811024","5523442391","5517891763","5523653516","5518026447","5523692456","5518036938","5523698574","5510035367","5523784447","5518152718","5524042394","5518188014","5524363441","5518219170","5524987281","5518247881","5525015105","5518339090","5525102226","5518344034","5525177906","5518345928","5525265214","5518416872","5525418483","5518459196","5525880028","5518466648","5526270119","5518511648","5526781313","5518539825","5526980001","5518709484","5527172929","5518818431","5527300623","5518849033","5527423235","5519007508","5527469816","5519213199","5527531227","5519315507","5527599524","5519724576","5510125139","5519743214","5527751167","5519837592","5528103597","5519936163","5528488264","5519947724","5528608130","5520110535","5528783708","5520113431","5528809984","5520178913","5529192876","5520217429","5529285455","5520390350","5529396828","5520495223","5529597545","5520676775","5529626808","5520689870","5529707968","5520802791","5529896570","5520836534","5529954796","5520879157","5530258566","5520897946","5530317814","5520920417","5530354099","5521000695","5530605724","5521121799","5510127125","5521388794","5530828321","5521411916","5531036558","5521469800","5531142072","5521514117","5531261872","5521745755","5531327689","5521795907","5531404409","5521875686","5531440369","5521941301","5531454840","5521986718","5531915282","5522005278","5532101476","5522310763","5532245918","5522330884","5532309864","5510058850","5532651382","5522336699","5532817076","5522416859","5533148489","5522475050","5533445566","5522518615","5510144819","5522527967","5581101010","5582365935","5583485010","5586456490","5587416410","5521630881","5555703805","5567939383","2281554499","7222758667","5525951225","8112346543","2222123456","1234567892","9531234567","0123456789","2345678901","3456789012","4567890123","5678901234","6789012345","7890123456","8901234567","9012345678","9876543210","8765432109","7654321098","6543210987","5432109876","4321098765","3210987654","2109876543","1098765432","0987654321","0000011111","0000022222","0000033333","0000044444","0000055555","0000066666","0000077777","0000088888","0000099999","1111100000","1111122222","1111133333","1111144444","1111155555","1111166666","1111177777","1111188888","1111199999","2222200000","2222211111","2222233333","2222244444","2222255555","2222266666","2222277777","2222288888","2222299999","3333300000","3333311111","3333322222","3333344444","3333355555","3333366666","3333377777","3333388888","3333399999","4444400000","4444411111","4444422222","4444433333","4444455555","4444466666","4444477777","4444488888","4444499999","5555500000","5555511111","5555522222","5555533333","5555544444","5555566666","5555577777","5555588888","5555599999","6666600000","6666611111","6666622222","6666633333","6666644444","6666655555","6666677777","6666688888","6666699999","7777700000","7777711111","7777722222","7777733333","7777744444","7777755555","7777766666","7777788888","7777799999","8888800000","8888811111","8888822222","8888833333","8888844444","8888855555","8888866666","8888877777","8888899999","9999900000","9999911111","9999922222","9999933333","9999944444","9999955555","9999966666","9999977777","9999988888"];
    if (jsonphoneBasura.includes(phone)) {
        return false;
    }
    if(phone.startsWith('0')){
        return false;
    }
    // 5 consecutivos
    var number = phone;
    var res = number.toString().split('').map(Number);
    var valcon = detectarConsecutivos(res);
    if (valcon){
        return false;
    }
    if (detectarRepetidos(phone)) {
        return false; // El número no es válido si tiene dígitos repetidos
    }
    //
    return true;
}

function detectarConsecutivos(arr) {
    if (arr.length < 6) return false;
  
    for (let i = 0; i <= arr.length - 6; i++) {
      // Verifica si son consecutivos en orden ascendente
      let esAscendente = true;
      for (let j = 1; j < 6; j++) {
        if (arr[i + j] !== arr[i] + j) {
          esAscendente = false;
          break;
        }
      }
  
      // Verifica si son consecutivos en orden descendente
      let esDescendente = true;
      for (let j = 1; j < 6; j++) {
        if (arr[i + j] !== arr[i] - j) {
          esDescendente = false;
          break;
        }
      }
  
      // Retorna true si encuentra consecutivos en cualquier orden
      if (esAscendente || esDescendente) return true;
    }
  
    return false; // Si termina de recorrer el array y no encuentra consecutivos, retorna false
  }

  function detectarRepetidos(phone) {
    console.warn("SI LLEGA FUNCION");
    var phoneStr = phone.toString();

   for (let i = 0; i <= phoneStr.length - 8; i++) {  
    var secuencia = phoneStr.slice(i, i + 8); // Tomamos 8 digitos

    // Si todos los dígitos en la secuencia son iguales, retornamos true
    if (/^(\d)\1{7}$/.test(secuencia)) {
        return true;
    }
}

    return false; // No encontro secuencias repetidas
}

//Funcion y eventos para validar que los inputs esten llenos y habilitar selector de grado de estudios LRA 26082024
/*function checkInputs() {
    const firstname = document.getElementById('firstname').value.trim();
    const lastname = document.getElementById('lastname').value.trim();
    const lastname_m = document.getElementById('lastname_m').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone_calc = document.getElementById('phone_calc').value.trim();
    const slcNivelDeInteres = document.getElementById('slc_nivel_de_interes');
    
    if (firstname && lastname && lastname_m && email && phone_calc) {
      slcNivelDeInteres.disabled = false;
    } else {
      slcNivelDeInteres.disabled = true; 
    }
  }
  */
  /*document.getElementById('firstname').addEventListener('input', checkInputs);
  document.getElementById('lastname').addEventListener('input', checkInputs);
  document.getElementById('lastname_m').addEventListener('input', checkInputs);
  document.getElementById('email').addEventListener('input', checkInputs);
  document.getElementById('phone_calc').addEventListener('input', checkInputs);*/

  