<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'quantity' => ['required', 'integer'],
            'material_items' => ['nullable', 'integer'],
            'material_cost' => ['nullable', 'numeric'],
            'waste_percentage' => ['nullable', 'numeric'],
            'waste_amount' => ['nullable', 'numeric'],
            'labour_percentage' => ['nullable', 'numeric'],
            'labour_amount' => ['nullable', 'numeric'],
            'equipment_cost' => ['nullable', 'numeric'],
            'other_percentage' => ['nullable', 'numeric'],
            'other_amount' => ['nullable', 'numeric'],
            'margin_percentage' => ['nullable', 'numeric'],
            'margin_amount' => ['nullable', 'numeric'],
            'sub_total' => ['nullable', 'numeric'],
            'amount' => ['nullable', 'numeric'],
            'created_by' => ['nullable', 'exists:users,name'],
        ];
    }
}
