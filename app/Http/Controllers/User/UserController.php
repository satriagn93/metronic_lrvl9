<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function profile()
    {
        // dd(Auth::user()->name);
        return view('user.profile');

        return redirect("login");
    }

    public function editprofile($id)
    {
        $user = User::where('id', $id)->first();
        Auth::login($user);
        return response()->json([
            'error' => false,
            'detail' => $user
        ], 200);
    }

    public function updateprofile(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->name = $request->name;

        $user->update();

        return response()->json([
            'success' => 'Data Successfully Update'
        ], 200);
    }
}
