<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductMaterialRequest;
use App\Http\Requests\UpdateProductMaterialRequest;
use App\Http\Resources\ProductMaterialResource;
use App\Models\ProductMaterial;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductMaterialController extends Controller
{
    /**
     * Display a listing of materials for a specific product.
     *
     * @param \Illuminate\Http\Request $request
     * @param int|null $productId
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request, $productId = null)
    {
        if ($productId) {
            // Fetch materials for the specified product ID without considering deleted_at
            $materials = ProductMaterial::where('product_id', $productId)
                                        ->orderBy('id', 'desc')
                                        ->get();
        } else {
            // Fetch all materials without considering deleted_at
            $materials = ProductMaterial::orderBy('id', 'desc')->get();
        }

        return ProductMaterialResource::collection($materials);
    }

    /**
     * Store a newly created material for a specific product.
     *
     * @param \App\Http\Requests\StoreProductMaterialRequest $request
     * @param int $productId
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductMaterialRequest $request, $productId)
    {
        $data = $request->validated();
        $data['product_id'] = $productId; // Ensure product_id is set

        $material = ProductMaterial::create($data);

        return response(new ProductMaterialResource($material), 201);
    }

    /**
     * Display the specified material.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $material = ProductMaterial::findOrFail($id);

        return new ProductMaterialResource($material);
    }

    /**
     * Update the specified material for a specific product.
     *
     * @param \App\Http\Requests\UpdateProductMaterialRequest $request
     * @param int $productId
     * @param int $materialId
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductMaterialRequest $request, $productId, $materialId)
    {
        $data = $request->validated();
        $material = ProductMaterial::where('product_id', $productId)
                                   ->findOrFail($materialId);
        $material->update($data);

        return new ProductMaterialResource($material);
    }

    /**
     * Remove the specified material from storage.
     *
     * @param int $productId
     * @param int $materialId
     * @return \Illuminate\Http\Response
     */
    public function destroy($productId, $materialId)
    {
        $material = ProductMaterial::where('product_id', $productId)
                                   ->findOrFail($materialId);
        $material->delete();

        return response("", 204);
    }
}
