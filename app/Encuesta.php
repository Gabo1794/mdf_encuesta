<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Encuesta extends Model
{
    protected $table = 'RespuestaXPregunta';
    protected $primaryKey = 'idRespuestaXPregunta';
	  
	protected $fillable = [
        'idPregunta', 'Respuesta',
    ];
	
}
