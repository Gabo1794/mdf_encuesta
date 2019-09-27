<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'EncuestaController@index');

Route::get('preguntas', 'EncuestaController@GetPreguntas');

Route::get('respuestaspreguntas', 'EncuestaController@GetRespuestasXPreguntas');

Route::get('respuestasxpregunta/{id}', 'EncuestaController@GetRespuestasXPregunta');

Route::post('saveAnswers', 'EncuestaController@Save');

Route::post('saveComentarios', 'EncuestaController@SaveComentarios');
