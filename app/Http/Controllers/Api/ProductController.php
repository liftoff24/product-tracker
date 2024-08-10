<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Requests\StoreProductMaterialRequest;
use App\Http\Requests\UpdateProductMaterialRequest;
use App\Http\Resources\ProductResource;
use App\Http\Resources\ProductMaterialResource;
use App\Models\Product;
use App\Models\ProductMaterial;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the products.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return ProductResource::collection(Product::query()->orderBy('id', 'desc')->paginate(10));
    }

    /**
     * Store a newly created product in storage.
     *
     * @param \App\Http\Requests\StoreProductRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();
        $product = Product::create($data);

        return response(new ProductResource($product), 201);
    }

    /**
     * Display the specified product with its materials.
     *
     * @param \App\Models\Product $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        $product->load('materials'); // Assuming there's a relationship defined in the Product model
        return new ProductResource($product);
    }

    /**
     * Update the specified product in storage.
     *
     * @param \App\Http\Requests\UpdateProductRequest $request
     * @param \App\Models\Product $product
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $data = $request->validated();
        $product->update($data);

        return new ProductResource($product);
    }

    /**
     * Remove the specified product from storage.
     *
     * @param \App\Models\Product $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response("", 204);
    }

    /**
     * Display a listing of the product materials.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Product $product
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function getProductMaterials(Request $request, Product $product)
    {
        return ProductMaterialResource::collection($product->materials()->orderBy('id', 'desc')->paginate(10));
    }

    /**
     * Store a newly created product material for a specific product.
     *
     * @param \App\Http\Requests\StoreProductMaterialRequest $request
     * @param \App\Models\Product $product
     * @return \Illuminate\Http\Response
     */
    public function storeProductMaterial(StoreProductMaterialRequest $request, Product $product)
    {
        $data = $request->validated();
        $material = $product->materials()->create($data);

        return response(new ProductMaterialResource($material), 201);
    }

    /**
     * Update the specified product material for a specific product.
     *
     * @param \App\Http\Requests\UpdateProductMaterialRequest $request
     * @param \App\Models\Product $product
     * @param \App\Models\ProductMaterial $material
     * @return \Illuminate\Http\Response
     */
    public function updateProductMaterial(UpdateProductMaterialRequest $request, Product $product, ProductMaterial $material)
    {
        $data = $request->validated();
        $material->update($data);

        return new ProductMaterialResource($material);
    }

    /**
     * Remove the specified product material from storage.
     *
     * @param \App\Models\Product $product
     * @param \App\Models\ProductMaterial $material
     * @return \Illuminate\Http\Response
     */
    public function destroyProductMaterial(Product $product, ProductMaterial $material)
    {
        $material->delete();

        return response("", 204);
    }
}
