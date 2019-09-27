<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Encuesta;
use App\Respuestas;
use App\Preguntas;
use App\PreguntasAbiertas;
use App\Comentarios;
use Illuminate\Support\Facades\DB;


class EncuestaController extends Controller
{
    public function index()
    {
		return view('encuesta.index');
    }

	public function GetPreguntas()
	{
		$preguntas = Preguntas::ObtenerPreguntasActivas();

		return response()->json(
			$preguntas->toArray()
		);
	}

	public function GetRespuestasXPreguntas()
	{
		$model = new Respuestas();
		$respuestas = $model->hydrate(
			DB::select(
				'call spObtenerPreguntasRespuestas()'
			)
		);
		return response()->json(
			$respuestas->toArray()
		);
	}

	public function GetRespuestasXPregunta($id)
	{
    $respuestas = Respuestas::ObtenerRespuestasActivasXPregunta($id);
		return response()->json(
			$respuestas->toArray()
		);
	}

	public function Save(Request $request){
        if ($request->ajax()) {
            $encuesta             = new Encuesta();
            $respuestasAbiertas   = new PreguntasAbiertas();
            $respuestaAbierta = $request->RespuestaAbierta;
            if($respuestaAbierta != ""){
              $respuestasAbiertas->id_pregunta = $request->idPregunta2;
              $respuestasAbiertas->RespuestaAbierta = $request->RespuestaAbierta;

              $respuestasAbiertas->save();

            }
            $encuesta->idPregunta = $request->idPregunta2;
			      $encuesta->Respuesta = $request->idRespuesta;
            $encuesta->save();
            return response()->json([
                "mensaje" => "Creado Correctamente",
            ]);
        }
	}

  public function SaveComentarios(Request $request){
    if($request->ajax()){
      $comentarios = new Comentarios();
      $comentarios->Comentarios = $request->comentario;
      $comentarios->save();
      return response()->json([
          "mensaje" => "Creado Correctamente",
      ]);
    }
  }
}
