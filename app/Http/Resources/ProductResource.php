<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'revision' => $this->revision,
            'name' => $this->name,
            'description' => $this->description,
            'quantity' => $this->quantity,
            'material_items' => $this->material_items,
            'material_cost' => $this->material_cost,
            'waste_percentage' => $this->waste_percentage,
            'waste_amount' => $this->waste_amount,
            'labour_percentage' => $this->labour_percentage,
            'labour_amount' => $this->labour_amount,
            'equipment_cost' => $this->equipment_cost,
            'other_percentage' => $this->other_percentage,
            'other_amount' => $this->other_amount,
            'margin_percentage' => $this->margin_percentage,
            'margin_amount' => $this->margin_amount,
            'sub_total' => $this->sub_total,
            'amount' => $this->amount,
            'delete' => $this->delete,
            'created_by' => $this->created_by,
            'updated_by' => $this->updated_by,
            'deleted_by' => $this->deleted_by,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
