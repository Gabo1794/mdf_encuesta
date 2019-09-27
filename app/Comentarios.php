<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comentarios extends Model
{
  protected $table = 'Comentarios';
  protected $primaryKey = 'idComentario';

protected $fillable = [
      'Comentarios'
  ];
}
