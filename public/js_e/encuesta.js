var token = $('#token').val();
var contadorPreguntas = 0;
var totalPreguntas = [];
var contador = 0;
var total = 0;
$(() => {
	//GetPreguntas();
	let promesa = Promise.resolve(GetPreguntas());
	promesa.then(data => {
		console.log("Carga completa ====>", data);
	});
});

var GetPreguntas = () => {
	return new Promise( resolve => {

		$.ajax({
			url: '/preguntas',
			success: res => {
				totalPreguntas = res.length;
				total = res.length;

				for(var i = 0; i < res.length; i++){

					let preguntasObj = {
						id: 0,
						id_pregunta: 0,
						Pregunta: "",
					}

					preguntasObj.id = i + 1;
					preguntasObj.id_pregunta = res[i].id_pregunta;
					preguntasObj.Pregunta = res[i].Pregunta;

					let promesa = Promise.resolve(GetRespuestasXPregunta(preguntasObj));
					promesa.then(data => {

						if(data == 'ok'){
							contador++;

							if(contador == totalPreguntas){
								alert('Preguntas cargadas correctamente.')
								$('#1').show();
								$('#spinner').hide();
								resolve('ok');
							}
						}
					});

				}
			},
			error: err => {
				console.log(err);
			}
		});

	});
};

var GetRespuestasXPregunta = pregunta => {
	return new Promise(resolve => {
		$.ajax({
			url: `/respuestasxpregunta/${pregunta.id_pregunta}`,
			success: res => {
				let promesa = Promise.resolve(RenderCards(pregunta, res));
				promesa.then(data => {
					resolve('ok');
				});
			},
			error: err => {
				console.log(err);
			}
		});
	});
};

var RenderCards = (pregunta, respuestas) => {
return	new Promise (resolve => {
		let contenedor = $('#main');

		let contenedorPregunta = "", contenedorRespuestas = "";

		for(var i = 0; i < respuestas.length; i++){

			if(respuestas[i].Respuesta1 === 'Otra'){
				contenedorRespuestas +=
				`
					<div>
						<input type="radio" data-idPregunta="${pregunta.id_pregunta}" name="pregunta${pregunta.id_pregunta}" value="${respuestas[i].idRespuestasPreguntas}"><strong class="m-l-10">${respuestas[i].Respuesta1}</strong>
					</div>
					<div>
						<textarea class="hidden" rows="4" cols="50" data-idPreguntaAbierta="${pregunta.id_pregunta}"></textarea>
					</div>
				`;
			}else{
				contenedorRespuestas +=
				`
					<div>
						<input type="radio" data-idPregunta="${pregunta.id_pregunta}" name="pregunta${pregunta.id_pregunta}" value="${respuestas[i].idRespuestasPreguntas}"><strong class="m-l-10">${respuestas[i].Respuesta1}</strong>
					</div>
				`;
			}
		}

		let classHidden = "";


		contenedorPregunta =
		`
			<div class="${classHidden}" data-idPregunta="${pregunta.id_pregunta}" id="${pregunta.id}">

				<div class="contenedor-pregunta text-a-c" id="titulo-pregunta">
					${pregunta.Pregunta}
				</div>
				<div class="contenedor-respuestas">
					<div class="flex flex-d-c espacios">
						${contenedorRespuestas}
					</div>
					<div class="botones flex justify-c-s-a m-t-20">
						<button type="button" class="hidden btn-new c-purple" data-id="${(pregunta.id - 1)}"><i class="fas fa-chevron-circle-left"></i></button>
						<button type="button" class="btn-new c-blue" data-idPregunta="${pregunta.id_pregunta}" data-actual="${pregunta.id}" data-id="${(pregunta.id + 1)}" onclick="Next(this)"><i class="fas fa-chevron-circle-right"></i></button>
					</div>
				</div>
			</div>
		`;

		contenedor.append(contenedorPregunta)

		if(pregunta.id > 0)
		{
			$(`#${pregunta.id}`).hide();
		}
		resolve('ok');
	});
};

var Next = btn => {
	contadorPreguntas++;
	console.log("total preguntas =>>",totalPreguntas);
	console.log("preguntas contestadas=>>",contadorPreguntas);

	if(contadorPreguntas == totalPreguntas){
		alert('Gracias por participar, si lo deseas puedes dejarnos un comentario adicional.')
		$('#comentarioEveto').removeClass('hidden');
		$('#respuestaComentario').removeClass('hidden');
	}

	let pregunta_respuesta = {
		idPregunta: 0,
		idRespuesta: 0,
		RespuestaAbierta: ""
	}

	//
	let idDivActual = btn.getAttribute('data-actual');

	let idPregunta = btn.getAttribute('data-idPregunta');

	let divPreguntaActual = $(`#${idDivActual}`);
	divPreguntaActual.hide();

	let nextID = btn.getAttribute('data-id');
	let divSigPregunta = $(`#${nextID}`);
	divSigPregunta.show();


	let radios = document.querySelectorAll('input[name="pregunta'+idPregunta+'"]');

	pregunta_respuesta.idPregunta = parseInt(idPregunta);


	for(var i = 0; i < radios.length; i++){
		if(radios[i].checked){
			pregunta_respuesta.idRespuesta = parseInt(radios[i].value)

			if(radios[i].nextSibling.innerText === 'Otra'){
				let textArea = $(`textarea[data-idPreguntaAbierta="${idPregunta}"]`);
				pregunta_respuesta.RespuestaAbierta = textArea[0].value;
			}
		}
	}

	$.ajax({
		url: '/saveAnswers',
        headers: {
            'X-CSRF-TOKEN': token
        },
		type: 'POST',
		dataType: 'json',
		data: {
			idPregunta2: pregunta_respuesta.idPregunta,
			idRespuesta: pregunta_respuesta.idRespuesta,
			RespuestaAbierta: pregunta_respuesta.RespuestaAbierta
		},
		success: res => {
			if(res.mensaje = "Creado Correctamente"){

			}
		},
		error: err => {
			console.log(err);
		}
	});


};

$('body').delegate('input[type=radio]', 'click', (e) => {
	let textsAreas = $('textarea');
	for(let i = 0; i < textsAreas.length; i++){
		textsAreas[i].value = "";
		textsAreas[i].classList.add('hidden');
	}

	let radio = e.target;
	let idTextAreaOculto = radio.getAttribute('data-idpregunta');
	let texto = radio.nextSibling.innerText;

	let textAreaOculta = "";

	if(texto === 'Otra'){
		textAreaOculta = $(`textarea[data-idPreguntaAbierta="${idTextAreaOculto}"]`);
		textAreaOculta[0].classList.remove('hidden');
	}

});

var SaveComentarios = () => {
	let comentario = $('#respuestaComentario').val();


	$.ajax({
		url: '/saveComentarios',
        headers: {
            'X-CSRF-TOKEN': token
        },
		type: 'POST',
		dataType: 'json',
		data: {
			comentario: comentario
		},
		success: res => {
			if(res.mensaje = "Creado Correctamente"){
				$('#comentarioEveto').hide();
				$('#agradecimiento').removeClass('hidden');
			}
		},
		error: err => {
			console.log(err);
		}
	});
};
