<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Grupos de conexión juvenil</title>
	<link rel="stylesheet" href="css_e/app.css">
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
	<link rel="icon" type="image/png" href="img/icono.jpg" />
</head>
<body>
	<!--<div class="flex flex-d-r-r p-15">
		<img src="img/gdc.jpg" class="img-gdc" alt="gdc">
	</div>-->

	<div class="flex flex-d-c align-i-c">
		<img src="img/gdc.jpg" class="img-gdc m-20" alt="gdc">

		<div id="main">
			<i class="fas fa-spinner loader" id="spinner"></i>
		<input id="token" name="_token" type="hidden" value="{{ csrf_token() }}"/>
		<div id="comentarioEveto" class="hidden">
			<div class="contenedor-pregunta text-a-c">
				Dejanos un comentario
			</div>
			<div class="contenedor-respuestas">
				<textarea rows="4" cols="50" id="respuestaComentario"></textarea>
				<div class="botones flex justify-c-s-a m-t-20">
					<button type="button" class="btn-new c-blue" onClick="SaveComentarios()"><i class="fas fa-chevron-circle-right"></i></button>
				</div>
			</div>
		</div>
		<div class="hidden" id="agradecimiento">
			<h1>Gracias por participar, te esperamos en la proxima reunión Dios te bendiga.</h1>
		</div>
		</div>
	</div>

	<script src="https://code.jquery.com/jquery-3.4.1.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
	crossorigin="anonymous"></script>
	<script src="js_e/encuesta.js" type="text/javascript" charset="utf-8" ></script>
</body>
</html>
