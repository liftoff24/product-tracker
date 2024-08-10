<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'revision',
        'name',
        'description',
        'quantity',
        'material_items',
        'material_cost',
        'waste_percentage',
        'waste_amount',
        'labour_percentage',
        'labour_amount',
        'equipment_cost',
        'other_percentage',
        'other_amount',
        'margin_percentage',
        'margin_amount',
        'sub_total',
        'amount',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'waste_percentage' => 'decimal:2',
        'waste_amount' => 'decimal:2',
        'labour_percentage' => 'decimal:2',
        'labour_amount' => 'decimal:2',
        'equipment_cost' => 'decimal:2',
        'other_percentage' => 'decimal:2',
        'other_amount' => 'decimal:2',
        'margin_percentage' => 'decimal:2',
        'margin_amount' => 'decimal:2',
        'sub_total' => 'decimal:2',
        'amount' => 'decimal:2',
    ];

    /**
     * Get the user that created the product.
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user that updated the product.
     */
    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * Get the user that deleted the product.
     */
    public function deleter()
    {
        return $this->belongsTo(User::class, 'deleted_by');
    }

    /**
     * Get the materials for the product.
     */
    public function materials()
    {
        return $this->hasMany(ProductMaterial::class);
    }
}
