<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\ProductMaterialController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Authentication Routes
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function() {

    // User Route
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    Route::post('/logout', [AuthController::class, 'logout']);

    // Product Routes
    Route::get('/products', [ProductController::class, 'index']); // Get Products
    Route::post('/products', [ProductController::class, 'store']); // New Product
    Route::get('/products/{product}', [ProductController::class, 'show']); // Show Product
    Route::put('/products/{product}', [ProductController::class, 'update']); // Edit/Update Product
    Route::delete('/products/{product}', [ProductController::class, 'destroy']); // Delete Product

    // Product Material Routes
    Route::get('/products/{product}/materials', [ProductMaterialController::class, 'index']); // Get Product Material
    Route::post('/products/{product}/materials', [ProductMaterialController::class, 'store']); // Create Product Material
    Route::get('/products/{product}/materials/{productMaterial}', [ProductMaterialController::class, 'show']); // Show Specific Product Material
    Route::put('/products/{product}/materials/{productMaterial}', [ProductMaterialController::class, 'update']); // Update Product Material
    Route::delete('/products/{product}/materials/{productMaterial}', [ProductMaterialController::class, 'destroy']); // Delete Product Material
});
