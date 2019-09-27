<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Preguntas extends Model
{
    protected $table = 'Preguntas';
    protected $primaryKey = 'id_pregunta';

	protected $fillable = [
        'Pregunta', 'activa'
    ];

    public static function ObtenerPreguntasActivas(){
      $model = new Preguntas();
      $preguntas = $model->hydrate(
        DB::select(
          'call ObtenerPreguntasActivas()'
        )
      );
      return $preguntas;
    }


}
