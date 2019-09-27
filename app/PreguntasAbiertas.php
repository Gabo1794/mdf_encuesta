<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PreguntasAbiertas extends Model
{
  protected $table = 'RespuestasPreguntasAbiertas';
  protected $primaryKey = 'id_respuesta';

protected $fillable = [
      'id_pregunta', 'RespuestaAbierta',
  ];
}
