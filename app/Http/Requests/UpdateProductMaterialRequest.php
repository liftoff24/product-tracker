<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductMaterialRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'product_id' => ['sometimes', 'exists:products,id'],
            'description' => ['nullable', 'string'],
            'quantity' => ['sometimes', 'integer'],
            'rate' => ['sometimes', 'numeric'],
            'amount' => ['nullable', 'numeric'],
            'updated_by' => ['nullable', 'exists:users,name'],
        ];
    }
}
