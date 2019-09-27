<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Respuestas extends Model
{
    protected $table = 'RespuestasOpcionMultiplePregunta';
    protected $primaryKey = 'idRespuestasPreguntas';

	protected $fillable = [
        'idPregunta', 'Respuesta1'
    ];

    public static function ObtenerRespuestasActivasXPregunta($id){
      $model = new Respuestas();
  		$respuestas = $model->hydrate(
  			DB::select(
  				'call ObtenerRespuestasActivasXPregunta('.$id.')'
  			)
  		);
      return $respuestas;
    }
}
