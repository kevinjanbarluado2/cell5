<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/
Route::get('guitars','App\Http\Controllers\GuitarsController@index');
Route::post('guitar','App\Http\Controllers\GuitarsController@store');
Route::put('guitar/{id}','App\Http\Controllers\GuitarsController@update');
Route::delete('guitar/{id}','App\Http\Controllers\GuitarsController@delete');

