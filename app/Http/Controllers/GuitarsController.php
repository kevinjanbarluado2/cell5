<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Guitars;


class GuitarsController extends Controller
{
    public function index(){
        return Guitars::all();
    }

    public function store(Request $request){
        return Guitars::create($request->all());
    }

    public function update(Request $request, $id){
        $guitar = Guitars::findOrFail($id);
        $guitar->update($request->all());
        return $guitar;
    }
    
    public function delete(Request $request, $id){
        $guitar = Guitars::findOrFail($id);
        $guitar->delete();
        return 204;
    }


}
